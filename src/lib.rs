use datapack_common::vfs;
use debris_lang::{
    backends::{Backend, DatapackBackend},
    common::{file_provider::MemoryFileProvider, BuildMode, Code},
    CompileConfig,
};
use once_cell::sync::Lazy;
use serde_json::json;
use std::{cmp::Ordering, fmt::Write, sync::Mutex};
use wasm_bindgen::prelude::*;
// use wee_alloc::WeeAlloc;

// #[global_allocator]
// static ALLOC: WeeAlloc = WeeAlloc::INIT;

/// Holds the importable files
static FILE_PROVIDER: Lazy<Mutex<MemoryFileProvider>> =
    Lazy::new(|| Mutex::new(MemoryFileProvider::default()));

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace=console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct CompileResult(Result<String, String>);

#[wasm_bindgen]
impl CompileResult {
    #[wasm_bindgen(getter)]
    pub fn data(&self) -> JsValue {
        match self.0.as_ref() {
            Ok(result) => JsValue::from_str(result),
            Err(_) => JsValue::null(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn error(&self) -> JsValue {
        match self.0.as_ref() {
            Ok(_) => JsValue::null(),
            Err(e) => JsValue::from_str(e),
        }
    }
}

#[wasm_bindgen]
pub fn add_module(filename: String, contents: String) {
    let mut lock = FILE_PROVIDER.lock().unwrap();
    lock.add_file(filename.into(), contents.into());
}

#[wasm_bindgen]
pub fn compile_and_run(source: String) -> CompileResult {
    let provider = FILE_PROVIDER.lock().unwrap();
    let mut config = CompileConfig::new(Box::new(provider));
    config
        .compile_context
        .config
        .update_build_mode(BuildMode::Release);
    let pack = match compile_inner(source.into(), &mut config) {
        Ok(pack) => pack,
        Err(err) => return CompileResult(Err(err.format(&config.compile_context))),
    };

    let functions = datapack_common::functions::get_functions(&pack).unwrap();

    let main_function_path = format!("{}main", DatapackBackend::FUNCTION_INTERNAL_PATH);
    let idx = functions
        .iter()
        .enumerate()
        .find(|(_, f)| f.id.path == main_function_path)
        .unwrap_or_else(|| {
            panic!("Failed to find main");
        })
        .0;

    let mut i = datapack_vm::Interpreter::new(functions, idx);
    let result = i.run_to_end();
    if let Err(e) = result {
        return CompileResult(Err(e.to_string()));
    }

    let output = i.output.join("\n");
    CompileResult(Ok(output))
}

#[wasm_bindgen]
pub fn compile(source: String, build_mode: u8) -> CompileResult {
    let provider = FILE_PROVIDER.lock().unwrap();
    let mut config = CompileConfig::new(Box::new(provider));
    let build_mode = match build_mode {
        0 => BuildMode::Debug,
        1 => BuildMode::Release,
        _ => return CompileResult(Err("Invalid Build Mode".to_string())),
    };
    config.compile_context.config.update_build_mode(build_mode);
    match compile_inner(source.into(), &mut config) {
        Ok(mut result) => {
            let function_folder = match result
                .resolve_path(&["data", "debris_project", "functions"])
                .unwrap()
            {
                vfs::FsElement::Directory(dir) => dir,
                _ => panic!("Expected dir"),
            };
            CompileResult(Ok(stringify_dir(function_folder)))
        }
        Err(error) => CompileResult(Err(error.format(&config.compile_context))),
    }
}

/// Compiles the source and returns the full datapack as a json string
#[wasm_bindgen]
pub fn compile_full(source: String) -> Option<String> {
    fn dir_to_json(dir: vfs::Directory) -> serde_json::Value {
        let sub_dirs: serde_json::Value = dir
            .directories
            .into_iter()
            .map(|(name, dir)| json!({"name": name, "content": dir_to_json(dir)}))
            .collect();
        let sub_files: serde_json::Value = dir
            .files
            .into_iter()
            .map(|(name, file)| json!({"name": name, "content": file.contents}))
            .collect();
        json!({
            "dirs": sub_dirs,
            "files": sub_files,
        })
    }

    let provider = FILE_PROVIDER.lock().unwrap();
    let mut config = CompileConfig::new(Box::new(provider));
    config
        .compile_context
        .config
        .update_build_mode(BuildMode::Release);
    match compile_inner(source.into(), &mut config) {
        Ok(dir) => Some(dir_to_json(dir).to_string()),
        Err(_) => None,
    }
}

fn compile_inner(
    source: Box<str>,
    config: &mut CompileConfig,
) -> debris_lang::error::Result<vfs::Directory> {
    let id = config
        .compile_context
        .input_files
        .add_input(Code { path: None, source });

    let hir = config.compute_hir(id)?;
    let mir = config.compute_mir(&hir)?;
    let llir = config.compute_llir(&mir, debris_lang::std::load_all)?;

    let result = DatapackBackend.generate(&llir, &config.compile_context);

    Ok(result)
}

fn stringify_dir(dir: &vfs::Directory) -> String {
    let mut result = String::new();
    let mut sorted = Vec::with_capacity(dir.files.len());
    walk_dir("", dir, &mut |name, file| sorted.push((name, file)));
    sorted.sort_by(|a, b| {
        // Show "interesting" files at the top, then sort alphanumerically
        match (a.0.contains("block"), b.0.contains("block")) {
            (true, false) => Ordering::Greater,
            (false, true) => Ordering::Greater,
            _ => alphanumeric_sort::compare_str(&a.0, &b.0),
        }
    });
    for (name, file) in sorted {
        result
            .write_fmt(format_args!("## {} ##\n{}\n\n", name, &file.contents))
            .unwrap();
    }

    result
}

fn walk_dir<'a>(
    base: &str,
    dir: &'a vfs::Directory,
    handler: &mut impl FnMut(String, &'a vfs::File),
) {
    for (dirname, dir) in &dir.directories {
        let nested_base = format!("{}/{}", base, dirname);
        walk_dir(&nested_base, dir, handler);
    }

    for (filename, file) in &dir.files {
        let path = format!("{}/{}", base, filename);
        handler(path, file);
    }
}

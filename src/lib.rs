use debris_lang::{
    debris_backends::{Backend, DatapackBackend},
    debris_common::Code,
    debris_core, get_std_module,
    vfs::{Directory, FsElement},
    CompileConfig,
};
use std::fmt::Write;
use wasm_bindgen::prelude::*;
// use wee_alloc::WeeAlloc;

// #[global_allocator]
// static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct CompileResult(Result<String, String>);

#[wasm_bindgen]
impl CompileResult {
    #[wasm_bindgen(getter)]
    pub fn data(&self) -> JsValue {
        match self.0.as_ref() {
            Ok(result) => JsValue::from_str(&result),
            Err(_) => JsValue::null(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn error(&self) -> JsValue {
        match self.0.as_ref() {
            Ok(_) => JsValue::null(),
            Err(e) => JsValue::from_str(&e),
        }
    }
}

#[wasm_bindgen]
pub fn compile(source: String) -> CompileResult {
    let mut config = CompileConfig::new(get_std_module().into(), ".".into());
    match compile_inner(source, &mut config) {
        Ok(mut result) => {
            let function_folder = match result
                .resolve_path(&[
                    "data".to_string(),
                    "debris_project".to_string(),
                    "functions".to_string(),
                ])
                .unwrap()
            {
                FsElement::Directoy(dir) => dir,
                _ => panic!("Expected dir"),
            };
            CompileResult(Ok(stringify_dir(function_folder)))
        }
        Err(error) => CompileResult(Err(error.format(&config.compile_context))),
    }
}


fn compile_inner(
    source: String,
    config: &mut CompileConfig,
) -> debris_core::error::Result<Directory> {
    let id = config
        .compile_context
        .input_files
        .add_input(Code { path: None, source });

    let hir = config.get_hir(id)?;
    let mut mir = config.get_mir(&hir)?;
    let llir = config.get_llir(&mir.contexts, &mut mir.namespaces)?;

    let result = DatapackBackend.generate(&llir, &config.compile_context);

    Ok(result)
}

fn stringify_dir(dir: &Directory) -> String {
    let mut result = String::new();
    let mut sorted: Vec<_> = dir.files.iter().collect();
    sorted.sort_by_key(|(name, _)| *name);
    for (name, file) in sorted {
        result
            .write_fmt(format_args!("## {} ##\n{}\n\n", name, &file.contents))
            .unwrap();
    }

    result
}

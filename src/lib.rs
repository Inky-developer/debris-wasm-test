use debris_lang::{
    debris_backends::{Backend, DatapackBackend},
    debris_common::Code,
    debris_core, get_std_module,
    vfs::{Directory, FsElement},
    CompileConfig,
};
use std::fmt::Write;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn compile(source: String) -> String {
    let mut config = CompileConfig::new(get_std_module().into(), ".".into());
    match compile_inner(source, &mut config) {
        Ok(result) => result,
        Err(error) => error.format(&config.compile_context),
    }
}

fn compile_inner(source: String, config: &mut CompileConfig) -> debris_core::error::Result<String> {
    let id = config
        .compile_context
        .input_files
        .add_input(Code { path: None, source });

    let hir = config.get_hir(id)?;
    let mut mir = config.get_mir(&hir)?;
    let llir = config.get_llir(&mir.contexts, &mut mir.namespaces)?;

    let mut result = DatapackBackend.generate(&llir, &config.compile_context);
    let function_folder = match result
        .resolve_path(&[
            "data".to_string(),
            "debris_project".to_string(),
            "functions".to_string(),
        ])
        .expect("Could not find folder")
    {
        FsElement::Directoy(dir) => dir,
        _ => panic!("Expected dir"),
    };

    Ok(stringify_dir(function_folder))
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

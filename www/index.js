import { EditorState } from "@codemirror/state";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { indentLess, indentMore, standardKeymap } from "@codemirror/commands";
import { indentOnInput } from "@codemirror/language"
import { bracketMatching } from "@codemirror/matchbrackets"
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets"
import { history, historyKeymap } from "@codemirror/history"
import { defaultHighlightStyle } from "@codemirror/highlight"
// import { lineNumbers } from "@codemirror/gutter"
import { foldGutter } from "@codemirror/fold"
// import { rust } from "@codemirror/lang-rust";
import { StreamLanguage } from "@codemirror/stream-parser"
import { clike } from "@codemirror/legacy-modes/mode/clike"

import { saveAs } from "file-saver";
const JSZip = require("jszip");

import * as wasm from "debris_wasm_test";

function debris_lang() {
    function words(str) {
        var obj = {}, words = str.split(" ");
        for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
        return obj;
    }

    return StreamLanguage.define(clike({
        keywords: words("let import mod fn loop if else return break continue not and or"),
        types: words("Any Int Bool Null StaticInt DynamicInt StaticBool DynamicBool String Module"),
        number: /-?[0-9]+/,
        blockKeywords: words("mod fn loop if else"),
        defKeywords: words("fn"),
        atoms: words("true false"),
        builtin: words("execute set_score print dbg register_ticking_function dyn_int"),
        typeFirstDefinitions: false,
    }));
}

let build_mode = 1;

const report_err = 'Please consider reporting this error at the <a target="_blank" href=https://github.com/Inky-developer/debris/issues/new?assignees=&labels=ICE%2C+bug&body=%%%&title=ICE:>github repository</a>!'
const error_report = 'The following code causes an internal compile error:\n```\n%%%\n```\n\n**Additional context**\nAdd any other relevant context about the problem here'

const error_banner = document.getElementById("error_banner");

const opt_mode_display = document.getElementById("opt_mode")
document.getElementById("btn_debug").onclick = () => {
    build_mode = 0;
    opt_mode_display.innerText = "Optimizations: None";
    compile()
}
document.getElementById("btn_release").onclick = () => {
    build_mode = 1;
    opt_mode_display.innerText = "Optimizations: Full";
    compile();
}

const output_editor_extensions = [
    EditorView.editable.of(() => false)
];
const output_editor = new EditorView({
    state: EditorState.create({
        extensions: output_editor_extensions
    }),
    parent: document.getElementById("code_output"),
});

let initial_code = localStorage.getItem("last_code");
// Overwrite the initial code if the url specifies something specific
const url_search_params = new URLSearchParams(window.location.search);
const url_code = url_search_params.get("code");

if (url_code !== null) {
    initial_code = url_code;
}

const input_editor = new EditorView({
    state: EditorState.create({
        extensions: [
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    compile();
                }
            }),
            foldGutter(),
            history(),
            indentOnInput(),
            defaultHighlightStyle.fallback,
            bracketMatching(),
            closeBrackets(),
            highlightActiveLine(),
            keymap.of([
                ...closeBracketsKeymap,
                ...standardKeymap,
                ...historyKeymap,
                { key: "Tab", run: indentMore, shift: indentLess },
            ]),
            debris_lang(),
        ],
        doc: initial_code
    }),
    parent: document.getElementById("code_input"),
});

function set_input(code) {
    input_editor.dispatch({
        changes: { from: 0, to: input_editor.state.doc.length, insert: code }
    })
}


function compile() {
    let content = input_editor.state.doc.toString();
    try {
        const result = wasm.compile(content, build_mode);

        let content_string;
        const err = result.error;
        if (err !== null) {
            content_string = err;
        } else {
            content_string = result.data;
        }

        output_editor.setState(EditorState.create({ doc: content_string, extensions: output_editor_extensions }));
    } catch (err) {
        console.log(err);
        const report = encodeURIComponent(error_report.replace("%%%", content));
        const msg = report_err.replace("%%%", report);
        const error_message = `<div>The compiler crashed: "${err}".<br>This is a bug. ${msg}</div>`
        error_banner.innerHTML = error_message;
        error_banner.style.visibility = "visible";
    }
}

function get_permalink() {
    const URL = "https://inky-developer.github.io/debris-playground/?code=";
    const code = encodeURIComponent(input_editor.state.doc.toString());
    return URL + code;
}

function download_pack() {
    function populate_recursively(zip, obj) {
        for (let dir of obj.dirs) {
            let folder = zip.folder(dir.name);
            populate_recursively(folder, dir.content);
        }

        for (let file of obj.files) {
            zip.file(file.name, file.content);
        }
    }

    let file_obj = JSON.parse(wasm.compile_full(input_editor.state.doc.toString()));
    let zip = new JSZip();
    populate_recursively(zip, file_obj);
    zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, "debris_playground.zip"));

}

function load_examples() {
    const API_URL = "https://api.github.com/repos/Inky-developer/debris/contents/examples";

    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            let examples = [];
            let fetches = [];

            for (let value of data) {
                const name = value.name;
                const url = value.download_url;
                fetches.push(fetch(url)
                    .then((response) => response.text())
                    .then((text) => examples.push({ name: name, content: text }))
                    .catch((err) => console.log(err))
                );
            }

            Promise.all(fetches).then(() => {
                const items_obj = document.getElementById("example_dropdown_list");
                items_obj.innerHTML = "";
                examples.sort();
                for (let element of examples) {
                    let obj = document.createElement("a");
                    obj.innerText = element.name;
                    obj.onclick = () => set_input(element.content);
                    items_obj.appendChild(obj);
                }
            });
        });
}
load_examples();

// intial compile
compile();
// Save code to local storage so it is persistent
window.onunload = () => localStorage.setItem("last_code", input_editor.state.doc.toString());

document.getElementById("permalink").onclick = () => window.location.href = get_permalink();
document.getElementById("download").onclick = () => download_pack();
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { defaultTabBinding, indentLess, indentMore, indentSelection, standardKeymap } from "@codemirror/commands";
import { indentOnInput } from "@codemirror/language"
import { bracketMatching } from "@codemirror/matchbrackets"
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets"
import { history, historyKeymap } from "@codemirror/history"
import { defaultHighlightStyle } from "@codemirror/highlight"
// import { lineNumbers } from "@codemirror/gutter"
import { foldGutter } from "@codemirror/fold"
import { rust } from "@codemirror/lang-rust";

import * as wasm from "debris_wasm_test";

const report_err = 'Please consider reporting this error at the <a target="_blank" href=https://github.com/Inky-developer/debris/issues/new?assignees=&labels=ICE%2C+bug&body=%%%&title=ICE:>github repository</a>!'
const error_report = 'The following code causes an internal compile error:\n```\n%%%\n```\n\n**Additional context**\nAdd any other relevant context about the problem here'

const error_banner = document.getElementById("error_banner");

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
            rust(),
        ],
        doc: initial_code
    }),
    parent: document.getElementById("code_input"),
});


function compile() {
    let content = input_editor.state.doc.toString();
    try {
        const result = wasm.compile(content);

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
    const URL = "https://inky-developer.github.io/debris-wasm-test/?code=";
    const code = encodeURIComponent(input_editor.state.doc.toString());
    return URL + code;

}

// intial compile
compile();
// Save code to local storage so it is persistent
window.onunload = () => localStorage.setItem("last_code", input_editor.state.doc.toString());

document.getElementById("permalink").onclick = () => window.location.href = get_permalink();
document.getElementById("download").onclick = () => alert("This feature is not yet implemented");
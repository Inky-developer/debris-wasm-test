import { EditorState } from "@codemirror/state";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { defaultTabBinding, standardKeymap } from "@codemirror/commands";
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

const output_editor = new EditorView({
    state: EditorState.create({}),
    parent: document.getElementById("code_output")
})

new EditorView({
    state: EditorState.create({
        extensions: [
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    let content = update.state.doc.toString();
                    try {
                        let compiled_code = wasm.compile(content);
                        output_editor.setState(EditorState.create({ doc: compiled_code }));
                    } catch (err) {
                        console.log(err);
                        const report = encodeURIComponent(error_report.replace("%%%", content));
                        const msg = report_err.replace("%%%", report);
                        const error_message = `<div>The compiler crashed: "${err}".<br>This is a bug. ${msg}</div>`
                        error_banner.innerHTML = error_message;
                        error_banner.style.visibility = "visible";
                    }
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
                defaultTabBinding,
            ]),
            rust(),
        ],
    }),
    parent: document.getElementById("code_input"),
});

import * as wasm from "debris_wasm_test";
import { CodeJar } from 'codejar';
import Prism from 'prismjs';

const code_input = document.getElementById("code_input");
const inpt = CodeJar(code_input, Prism.highlightElement, { tab: "  " });

const code_output = document.getElementById("code_output");
CodeJar(code_output, Prism.highlightElement);

inpt.onUpdate((code) => {
    let result = wasm.compile(code);
    code_output.innerText = result;
})

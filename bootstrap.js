!function(e){function t(t){for(var n,o,i=t[0],u=t[1],a=0,s=[];a<i.length;a++)o=i[a],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&s.push(r[o][0]),r[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(f&&f(t);s.length;)s.shift()()}var n={},r={0:0};var o={};var i={28:function(){return{"./debris_wasm_test_bg.js":{__wbindgen_string_new:function(e,t){return n[12].exports.a(e,t)},__wbindgen_throw:function(e,t){return n[12].exports.b(e,t)}}}}};function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=a);var s,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=function(e){return u.p+""+e+".bootstrap.js"}(e);var f=new Error;s=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",f.name="ChunkLoadError",f.type=o,f.request=i,n[1](f)}r[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:c})}),12e4);c.onerror=c.onload=s,document.head.appendChild(c)}return({2:[28]}[e]||[]).forEach((function(e){var n=o[e];if(n)t.push(n);else{var r,a=i[e](),s=fetch(u.p+""+{28:"9f6306044a9c8595db14"}[e]+".module.wasm");if(a instanceof Promise&&"function"==typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(s),a]).then((function(e){return WebAssembly.instantiate(e[0],e[1])}));else if("function"==typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(s,a);else{r=s.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,a)}))}t.push(o[e]=r.then((function(t){return u.w[e]=(t.instance||t).exports})))}})),Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e},u.w={};var a=window.webpackJsonp=window.webpackJsonp||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var f=s;u(u.s=0)}([function(e,t,n){Promise.all([n.e(1),n.e(2)]).then(n.bind(null,1)).catch(e=>console.error("Error importing `index.js`:",e))}]);
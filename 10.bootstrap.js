"use strict";(self.webpackChunkcreate_wasm_app=self.webpackChunkcreate_wasm_app||[]).push([[10],{10:(e,t,n)=>{n.a(e,(async(e,o)=>{try{n.r(t);var r=n(120),i=n(864),l=n(383),a=n(119),c=n(32),s=n(603),d=n(945),u=n(931),p=n(648),_=n(207),f=n(917),g=n(162),m=n(81),b=e([m]);m=(b.then?(await b)():b)[0];const h=n(733);function y(e){for(var t={},n=e.split(" "),o=0;o<n.length;++o)t[n[o]]=!0;return t}function w(){return _.i.define((0,f.o7)({keywords:y("let comptime import mod fn struct interface loop while for if else return break continue not and or"),types:y("Any Int Bool Null StaticInt DynamicInt StaticBool DynamicBool String Module"),number:/-?[0-9]+/,blockKeywords:y("mod fn struct interface loop while for if else"),defKeywords:y("mod fn struct interface"),atoms:y("true false"),builtin:y("execute set_score print dbg register_ticking_function dyn_int"),typeFirstDefinitions:!1}))}function k(){return _.i.define((0,f.o7)({keywords:y("advancement attribute ban ban-ip banlist bossbar clear clone data datapack debug defaultgamemode deop difficulty effect enchant execute experience fill forceload function gamemode gamerule give help kick kill list locate locatebiome loot me msg op pardon pardon-ip particle playsound publish recipe reload replaceitem save-all save-off save-on say schedule scoreboard seed setblock setidletimeout setworldspawn spawnpoint spectate spreadplayers stop stopsound summon tag team teammsg teleport tell tellraw time title tm tp trigger w weather whitelist worldborder xp"),types:y("if unless store result score entity block storage matches run objectives players set operation add remove"),atoms:y("debris")}))}let v=0;const x='Please consider reporting this error at the <a target="_blank" href=https://github.com/Inky-developer/debris/issues/new?assignees=&labels=ICE%2C+bug&body=%%%&title=ICE:>github repository</a>!',I='Please consider reporting this error at the <a target="_blank" href=https://github.com/SuperTails/datapackvm/issues/new?assignees=&labels=bug&body=%%%&title=Panic:>datapackvm github repository</a>!',T="The following code causes an internal compile error:\n```\n%%%\n```\n\n**Additional context**\nAdd any other relevant context about the problem here",E=document.getElementById("error_banner"),B=document.getElementById("build_mode");document.getElementById("btn_debug").onclick=()=>{v=0,B.innerText="Build Mode: Debug",j()},document.getElementById("btn_release").onclick=()=>{v=1,B.innerText="Build Mode: Release",j()};const S=[i.tk.editable.of((()=>!1)),u.R_.fallback,k()],C=new i.tk({state:r.yy.create({extensions:S}),parent:document.getElementById("code_output")});let D=localStorage.getItem("last_code");const R=new URLSearchParams(window.location.search).get("code");if(null!==R){const $=`https://debris-snippets.glitch.me/get/${R}`;fetch($,{}).then((e=>e.json())).then((e=>{if(e.success){let t=e.snippet;document.querySelector("meta[name=description]").setAttribute("content",t),A(t)}else alert("Invalid permalink: Could not load this code snippet")}))}const M=new i.tk({state:r.yy.create({extensions:[i.tk.updateListener.of((e=>{e.docChanged&&j()})),(0,p.mi)(),(0,d.m8)(),(0,a.nY)(),u.R_.fallback,(0,c.n)(),(0,s.vQ)(),(0,i.ZO)(),i.$f.of([...s.GA,...l.M_,...d.f$,{key:"Tab",run:l.at,shift:l.xi}]),w()],doc:D}),parent:document.getElementById("code_input")});function A(e){M.dispatch({changes:{from:0,to:M.state.doc.length,insert:e}})}i.tk.editable.of((()=>!1)),u.R_.fallback;const O=new i.tk({state:r.yy.create({extensions:S}),parent:document.getElementById("interpreter_output")});function j(){let e=M.state.doc.toString();try{const t=m.MY(e,v);let n;const o=t.error;n=null!==o?o:t.data,C.setState(r.yy.create({doc:n,extensions:S}))}catch(t){P(e,t,x)}}function P(e,t,n){console.log(t);const o=encodeURIComponent(T.replace("%%%",e)),r=`<div>The compiler crashed: "${t}".<br>This is a bug. ${n.replace("%%%",o)}</div>`;E.innerHTML=r,E.style.visibility="visible"}async function L(){const e=M.state.doc.toString(),t=await fetch("https://debris-snippets.glitch.me/add/",{method:"POST",body:JSON.stringify({text:e}),headers:{"Content-Type":"application/json"}}).then((e=>e.json()));return t.success?"https://inky-developer.github.io/debris-playground/?code="+t.id:(console.log(t),alert("Could not create a permalink!"),null)}function V(){let e=JSON.parse(m.vR(M.state.doc.toString())),t=new h;!function e(t,n){for(let o of n.dirs)e(t.folder(o.name),o.content);for(let e of n.files)t.file(e.name,e.content)}(t,e),t.generateAsync({type:"blob"}).then((e=>(0,g.saveAs)(e,"debris_playground.zip")))}function Y(){fetch("https://api.github.com/repos/Inky-developer/debris/contents/examples").then((e=>e.json())).then((e=>{let t=[],n=[];for(let o of e){const e=o.name,r=o.download_url;n.push(fetch(r).then((e=>e.text())).then((n=>t.push({name:e,content:n}))).catch((e=>console.log(e))))}Promise.all(n).then((()=>{const e=document.getElementById("example_dropdown_list");e.innerHTML="",t.sort(((e,t)=>e>t?1:t>e?-1:0));for(let n of t){let t=document.createElement("a");t.innerText=n.name,t.onclick=()=>A(n.content),e.appendChild(t),m.nV(n.name,n.content)}j()}))}))}document.getElementById("interpret").onclick=()=>{let e=M.state.doc.toString();try{const t=m.Dp(e);let n;console.log(t);const o=t.error;n=null!=o?o:t.data,O.setState(r.yy.create({doc:n,extensions:S}))}catch(t){P(e,t,I)}},Y(),window.onunload=()=>localStorage.setItem("last_code",M.state.doc.toString()),document.getElementById("permalink").onclick=()=>{const e=document.getElementById("permalink");e.disabled=!0;const t=e.textContent;e.textContent="Please wait...",L().then((n=>{null!=n&&window.open(n,"_blank"),e.disabled=!1,e.textContent=t}))},document.getElementById("download").onclick=()=>V(),o()}catch(q){o(q)}}))},81:(e,t,n)=>{n.a(e,(async(e,o)=>{try{n.d(t,{Dp:()=>i.Dp,MY:()=>i.MY,nV:()=>i.nV,vR:()=>i.vR});var r=n(451),i=n(830),l=e([r]);r=(l.then?(await l)():l)[0],(0,i.oT)(r),o()}catch(e){o(e)}}))},830:(e,t,n)=>{let o;function r(e){o=e}n.d(t,{Dp:()=>b,MY:()=>h,Or:()=>T,h4:()=>I,nV:()=>m,oT:()=>r,vR:()=>k});let i=new("undefined"==typeof TextDecoder?(0,module.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});i.decode();let l=null;function a(){return null!==l&&0!==l.byteLength||(l=new Uint8Array(o.memory.buffer)),l}function c(e,t){return e>>>=0,i.decode(a().subarray(e,e+t))}const s=new Array(128).fill(void 0);s.push(void 0,null,!0,!1);let d=s.length;function u(e){const t=function(e){return s[e]}(e);return function(e){e<132||(s[e]=d,d=e)}(e),t}let p=0,_=new("undefined"==typeof TextEncoder?(0,module.require)("util").TextEncoder:TextEncoder)("utf-8");const f="function"==typeof _.encodeInto?function(e,t){return _.encodeInto(e,t)}:function(e,t){const n=_.encode(e);return t.set(n),{read:e.length,written:n.length}};function g(e,t,n){if(void 0===n){const n=_.encode(e),o=t(n.length,1)>>>0;return a().subarray(o,o+n.length).set(n),p=n.length,o}let o=e.length,r=t(o,1)>>>0;const i=a();let l=0;for(;l<o;l++){const t=e.charCodeAt(l);if(t>127)break;i[r+l]=t}if(l!==o){0!==l&&(e=e.slice(l)),r=n(r,o,o=l+3*e.length,1)>>>0;const t=a().subarray(r+l,r+o);l+=f(e,t).written,r=n(r,o,l,1)>>>0}return p=l,r}function m(e,t){const n=g(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=p,i=g(t,o.__wbindgen_malloc,o.__wbindgen_realloc),l=p;o.add_module(n,r,i,l)}function b(e){const t=g(e,o.__wbindgen_malloc,o.__wbindgen_realloc),n=p,r=o.compile_and_run(t,n);return x.__wrap(r)}function h(e,t){const n=g(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=p,i=o.compile(n,r,t);return x.__wrap(i)}let y=null;function w(){return(null===y||!0===y.buffer.detached||void 0===y.buffer.detached&&y.buffer!==o.memory.buffer)&&(y=new DataView(o.memory.buffer)),y}function k(e){try{const r=o.__wbindgen_add_to_stack_pointer(-16),i=g(e,o.__wbindgen_malloc,o.__wbindgen_realloc),l=p;o.compile_full(r,i,l);var t=w().getInt32(r+0,!0),n=w().getInt32(r+4,!0);let a;return 0!==t&&(a=c(t,n).slice(),o.__wbindgen_free(t,1*n,1)),a}finally{o.__wbindgen_add_to_stack_pointer(16)}}const v="undefined"==typeof FinalizationRegistry?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((e=>o.__wbg_compileresult_free(e>>>0,1)));class x{static __wrap(e){e>>>=0;const t=Object.create(x.prototype);return t.__wbg_ptr=e,v.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,v.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_compileresult_free(e,0)}get data(){return u(o.compileresult_data(this.__wbg_ptr))}get error(){return u(o.compileresult_error(this.__wbg_ptr))}}function I(e,t){return function(e){d===s.length&&s.push(s.length+1);const t=d;return d=s[t],s[t]=e,t}(c(e,t))}function T(e,t){throw new Error(c(e,t))}},451:(e,t,n)=>{var o=n(830);e.exports=n.v(t,e.id,"314738cf98080fd39a63",{"./debris_wasm_test_bg.js":{__wbindgen_string_new:o.h4,__wbindgen_throw:o.Or}})}}]);
"use strict";(self.webpackChunkcreate_wasm_app=self.webpackChunkcreate_wasm_app||[]).push([[10],{875:(e,t,n)=>{n.a(e,(async(o,r)=>{try{n.d(t,{Dp:()=>v,MY:()=>x,Or:()=>C,h4:()=>T,nV:()=>k,vR:()=>B});var a=n(451);e=n.hmd(e);var i=o([a]);a=(i.then?(await i)():i)[0];let c=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});c.decode();let l=null;function s(){return null!==l&&l.buffer===a.memory.buffer||(l=new Uint8Array(a.memory.buffer)),l}function d(e,t){return c.decode(s().subarray(e,e+t))}const u=new Array(32).fill(void 0);u.push(void 0,null,!0,!1);let p=u.length;function f(e){p===u.length&&u.push(u.length+1);const t=p;return p=u[t],u[t]=e,t}function m(e){return u[e]}function _(e){e<36||(u[e]=p,p=e)}function g(e){const t=m(e);return _(e),t}let h=0,b=new("undefined"==typeof TextEncoder?(0,e.require)("util").TextEncoder:TextEncoder)("utf-8");const y="function"==typeof b.encodeInto?function(e,t){return b.encodeInto(e,t)}:function(e,t){const n=b.encode(e);return t.set(n),{read:e.length,written:n.length}};function w(e,t,n){if(void 0===n){const n=b.encode(e),o=t(n.length);return s().subarray(o,o+n.length).set(n),h=n.length,o}let o=e.length,r=t(o);const a=s();let i=0;for(;i<o;i++){const t=e.charCodeAt(i);if(t>127)break;a[r+i]=t}if(i!==o){0!==i&&(e=e.slice(i)),r=n(r,o,o=i+3*e.length);const t=s().subarray(r+i,r+o);i+=y(e,t).written}return h=i,r}function k(e,t){const n=w(e,a.__wbindgen_malloc,a.__wbindgen_realloc),o=h,r=w(t,a.__wbindgen_malloc,a.__wbindgen_realloc),i=h;a.add_module(n,o,r,i)}function v(e){const t=w(e,a.__wbindgen_malloc,a.__wbindgen_realloc),n=h,o=a.compile_and_run(t,n);return S.__wrap(o)}function x(e,t){const n=w(e,a.__wbindgen_malloc,a.__wbindgen_realloc),o=h,r=a.compile(n,o,t);return S.__wrap(r)}let I=null;function E(){return null!==I&&I.buffer===a.memory.buffer||(I=new Int32Array(a.memory.buffer)),I}function B(e){try{const o=a.__wbindgen_add_to_stack_pointer(-16),r=w(e,a.__wbindgen_malloc,a.__wbindgen_realloc),i=h;a.compile_full(o,r,i);var t=E()[o/4+0],n=E()[o/4+1];let c;return 0!==t&&(c=d(t,n).slice(),a.__wbindgen_free(t,1*n)),c}finally{a.__wbindgen_add_to_stack_pointer(16)}}class S{static __wrap(e){const t=Object.create(S.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();a.__wbg_compileresult_free(e)}get data(){return g(a.compileresult_data(this.ptr))}get error(){return g(a.compileresult_error(this.ptr))}}function T(e,t){return f(d(e,t))}function C(e,t){throw new Error(d(e,t))}r()}catch(A){r(A)}}))},10:(e,t,n)=>{n.a(e,(async(e,o)=>{try{n.r(t);var r=n(120),a=n(864),i=n(383),c=n(119),l=n(32),s=n(603),d=n(945),u=n(81),p=n(648),f=n(207),m=n(917),_=n(162),g=n(875),h=e([g]);g=(h.then?(await h)():h)[0];const b=n(733);function y(e){for(var t={},n=e.split(" "),o=0;o<n.length;++o)t[n[o]]=!0;return t}function w(){return f.i.define((0,m.o7)({keywords:y("let comptime import mod fn struct interface loop while for if else return break continue not and or"),types:y("Any Int Bool Null StaticInt DynamicInt StaticBool DynamicBool String Module"),number:/-?[0-9]+/,blockKeywords:y("mod fn struct interface loop while for if else"),defKeywords:y("mod fn struct interface"),atoms:y("true false"),builtin:y("execute set_score print dbg register_ticking_function dyn_int"),typeFirstDefinitions:!1}))}function k(){return f.i.define((0,m.o7)({keywords:y("advancement attribute ban ban-ip banlist bossbar clear clone data datapack debug defaultgamemode deop difficulty effect enchant execute experience fill forceload function gamemode gamerule give help kick kill list locate locatebiome loot me msg op pardon pardon-ip particle playsound publish recipe reload replaceitem save-all save-off save-on say schedule scoreboard seed setblock setidletimeout setworldspawn spawnpoint spectate spreadplayers stop stopsound summon tag team teammsg teleport tell tellraw time title tm tp trigger w weather whitelist worldborder xp"),types:y("if unless store result score entity block storage matches run objectives players set operation add remove"),atoms:y("debris")}))}let v=0;const x='Please consider reporting this error at the <a target="_blank" href=https://github.com/Inky-developer/debris/issues/new?assignees=&labels=ICE%2C+bug&body=%%%&title=ICE:>github repository</a>!',I='Please consider reporting this error at the <a target="_blank" href=https://github.com/SuperTails/datapackvm/issues/new?assignees=&labels=bug&body=%%%&title=Panic:>datapackvm github repository</a>!',E="The following code causes an internal compile error:\n```\n%%%\n```\n\n**Additional context**\nAdd any other relevant context about the problem here",B=document.getElementById("error_banner"),S=document.getElementById("build_mode");document.getElementById("btn_debug").onclick=()=>{v=0,S.innerText="Build Mode: Debug",j()},document.getElementById("btn_release").onclick=()=>{v=1,S.innerText="Build Mode: Release",j()};const T=[a.tk.editable.of((()=>!1)),u.R_.fallback,k()],C=new a.tk({state:r.yy.create({extensions:T}),parent:document.getElementById("code_output")});let A=localStorage.getItem("last_code");const D=new URLSearchParams(window.location.search).get("code");if(null!==D){const N=`https://debris-snippets.glitch.me/get/${D}`;fetch(N,{}).then((e=>e.json())).then((e=>{if(e.success){let t=e.snippet;document.querySelector("meta[name=description]").setAttribute("content",t),O(t)}else alert("Invalid permalink: Could not load this code snippet")}))}const M=new a.tk({state:r.yy.create({extensions:[a.tk.updateListener.of((e=>{e.docChanged&&j()})),(0,p.mi)(),(0,d.m8)(),(0,c.nY)(),u.R_.fallback,(0,l.n)(),(0,s.vQ)(),(0,a.ZO)(),a.$f.of([...s.GA,...i.M_,...d.f$,{key:"Tab",run:i.at,shift:i.xi}]),w()],doc:A}),parent:document.getElementById("code_input")});function O(e){M.dispatch({changes:{from:0,to:M.state.doc.length,insert:e}})}a.tk.editable.of((()=>!1)),u.R_.fallback;const R=new a.tk({state:r.yy.create({extensions:T}),parent:document.getElementById("interpreter_output")});function j(){let e=M.state.doc.toString();try{const t=g.MY(e,v);let n;const o=t.error;n=null!==o?o:t.data,C.setState(r.yy.create({doc:n,extensions:T}))}catch(t){P(e,t,x)}}function P(e,t,n){console.log(t);const o=encodeURIComponent(E.replace("%%%",e)),r=`<div>The compiler crashed: "${t}".<br>This is a bug. ${n.replace("%%%",o)}</div>`;B.innerHTML=r,B.style.visibility="visible"}async function $(){const e=M.state.doc.toString(),t=await fetch("https://debris-snippets.glitch.me/add/",{method:"POST",body:JSON.stringify({text:e}),headers:{"Content-Type":"application/json"}}).then((e=>e.json()));return t.success?"https://inky-developer.github.io/debris-playground/?code="+t.id:(console.log(t),alert("Could not create a permalink!"),null)}function L(){let e=JSON.parse(g.vR(M.state.doc.toString())),t=new b;!function e(t,n){for(let o of n.dirs)e(t.folder(o.name),o.content);for(let e of n.files)t.file(e.name,e.content)}(t,e),t.generateAsync({type:"blob"}).then((e=>(0,_.saveAs)(e,"debris_playground.zip")))}function q(){fetch("https://api.github.com/repos/Inky-developer/debris/contents/examples").then((e=>e.json())).then((e=>{let t=[],n=[];for(let o of e){const e=o.name,r=o.download_url;n.push(fetch(r).then((e=>e.text())).then((n=>t.push({name:e,content:n}))).catch((e=>console.log(e))))}Promise.all(n).then((()=>{const e=document.getElementById("example_dropdown_list");e.innerHTML="",t.sort(((e,t)=>e>t?1:t>e?-1:0));for(let n of t){let t=document.createElement("a");t.innerText=n.name,t.onclick=()=>O(n.content),e.appendChild(t),g.nV(n.name,n.content)}j()}))}))}document.getElementById("interpret").onclick=()=>{let e=M.state.doc.toString();try{const t=g.Dp(e);let n;console.log(t);const o=t.error;n=null!=o?o:t.data,R.setState(r.yy.create({doc:n,extensions:T}))}catch(t){P(e,t,I)}},q(),window.onunload=()=>localStorage.setItem("last_code",M.state.doc.toString()),document.getElementById("permalink").onclick=()=>{const e=document.getElementById("permalink");e.disabled=!0;const t=e.textContent;e.textContent="Please wait...",$().then((n=>{null!=n&&window.open(n,"_blank"),e.disabled=!1,e.textContent=t}))},document.getElementById("download").onclick=()=>L(),o()}catch(U){o(U)}}))},451:(e,t,n)=>{n.a(e,(async(o,r)=>{try{var a,i=o([a=n(875)]),[a]=i.then?(await i)():i;await n.v(t,e.id,"2dc60796bfe017e4452c",{"./debris_wasm_test_bg.js":{__wbindgen_string_new:a.h4,__wbindgen_throw:a.Or}}),r()}catch(e){r(e)}}),1)}}]);
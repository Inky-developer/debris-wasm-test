(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1:function(e,t,n){"use strict";n.r(t);var o=n(2),r=n(3),c=n(26),i=n(5),s=n(11),a=n(25),l=n(24),d=n(10),u=n(29),f=n(22),p=n(23),h=n(13),m=n(12);const b=n(14);function g(e){for(var t={},n=e.split(" "),o=0;o<n.length;++o)t[n[o]]=!0;return t}let y=1;const w=document.getElementById("error_banner"),k=document.getElementById("opt_mode");document.getElementById("btn_debug").onclick=()=>{y=0,k.innerText="Optimizations: None",T()},document.getElementById("btn_release").onclick=()=>{y=1,k.innerText="Optimizations: Full",T()};const _=[r.d.editable.of(()=>!1),d.a.fallback,f.a.define(Object(p.a)({keywords:g("advancement attribute ban ban-ip banlist bossbar clear clone data datapack debug defaultgamemode deop difficulty effect enchant execute experience fill forceload function gamemode gamerule give help kick kill list locate locatebiome loot me msg op pardon pardon-ip particle playsound publish recipe reload replaceitem save-all save-off save-on say schedule scoreboard seed setblock setidletimeout setworldspawn spawnpoint spectate spreadplayers stop stopsound summon tag team teammsg teleport tell tellraw time title tm tp trigger w weather whitelist worldborder xp"),types:g("if unless score entity block storage matches run objectives players set operation add remove"),atoms:g("debris")}))],v=new r.d({state:o.f.create({extensions:_}),parent:document.getElementById("code_output")});let I=localStorage.getItem("last_code");const x=new URLSearchParams(window.location.search).get("code");if(null!==x){fetch("https://debris-snippets.glitch.me/get/"+x,{}).then(e=>e.json()).then(e=>{if(e.success){let t=e.snippet;document.querySelector("meta[name=description]").setAttribute("content",t),E(t)}else alert("Invalid permalink: Could not load this code snippet")})}const j=new r.d({state:o.f.create({extensions:[r.d.updateListener.of(e=>{e.docChanged&&T()}),Object(u.a)(),Object(l.a)(),Object(i.g)(),d.a.fallback,Object(s.a)(),Object(a.a)(),Object(r.h)(),r.i.of([...a.b,...c.c,...l.b,{key:"Tab",run:c.b,shift:c.a}]),f.a.define(Object(p.a)({keywords:g("let comptime import mod fn loop if else return break continue not and or"),types:g("Any Int Bool Null StaticInt DynamicInt StaticBool DynamicBool String Module"),number:/-?[0-9]+/,blockKeywords:g("mod fn loop if else"),defKeywords:g("fn"),atoms:g("true false"),builtin:g("execute set_score print dbg register_ticking_function dyn_int"),typeFirstDefinitions:!1}))],doc:I}),parent:document.getElementById("code_input")});function E(e){j.dispatch({changes:{from:0,to:j.state.doc.length,insert:e}})}function T(){let e=j.state.doc.toString();try{const t=m.c(e,y);let n;const r=t.error;n=null!==r?r:t.data,v.setState(o.f.create({doc:n,extensions:_}))}catch(t){console.log(t);const n=encodeURIComponent("The following code causes an internal compile error:\n```\n%%%\n```\n\n**Additional context**\nAdd any other relevant context about the problem here".replace("%%%",e)),o=`<div>The compiler crashed: "${t}".<br>This is a bug. ${'Please consider reporting this error at the <a target="_blank" href=https://github.com/Inky-developer/debris/issues/new?assignees=&labels=ICE%2C+bug&body=%%%&title=ICE:>github repository</a>!'.replace("%%%",n)}</div>`;w.innerHTML=o,w.style.visibility="visible"}}fetch("https://api.github.com/repos/Inky-developer/debris/contents/examples").then(e=>e.json()).then(e=>{let t=[],n=[];for(let o of e){const e=o.name,r=o.download_url;n.push(fetch(r).then(e=>e.text()).then(n=>t.push({name:e,content:n})).catch(e=>console.log(e)))}Promise.all(n).then(()=>{const e=document.getElementById("example_dropdown_list");e.innerHTML="",t.sort();for(let n of t){let t=document.createElement("a");t.innerText=n.name,t.onclick=()=>E(n.content),e.appendChild(t)}})}),T(),window.onunload=()=>localStorage.setItem("last_code",j.state.doc.toString()),document.getElementById("permalink").onclick=()=>async function(){const e="https://debris-snippets.glitch.me/add/"+encodeURIComponent(j.state.doc.toString()),t=await fetch(e).then(e=>e.json());return t.success?"https://inky-developer.github.io/debris-playground/?code="+t.id:(alert("Could not create a permalink!"),null)}().then(e=>window.location.href=e),document.getElementById("download").onclick=()=>function(){let e=JSON.parse(m.d(j.state.doc.toString())),t=new b;!function e(t,n){for(let o of n.dirs){e(t.folder(o.name),o.content)}for(let e of n.files)t.file(e.name,e.content)}(t,e),t.generateAsync({type:"blob"}).then(e=>Object(h.saveAs)(e,"debris_playground.zip"))}()},12:function(e,t,n){"use strict";(function(e){n.d(t,"c",(function(){return m})),n.d(t,"d",(function(){return y})),n.d(t,"a",(function(){return k})),n.d(t,"b",(function(){return _}));var o=n(28);let r=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});r.decode();let c=null;function i(){return null!==c&&c.buffer===o.j.buffer||(c=new Uint8Array(o.j.buffer)),c}function s(e,t){return r.decode(i().subarray(e,e+t))}const a=new Array(32).fill(void 0);a.push(void 0,null,!0,!1);let l=a.length;function d(e){const t=function(e){return a[e]}(e);return function(e){e<36||(a[e]=l,l=e)}(e),t}let u=0;let f=new("undefined"==typeof TextEncoder?(0,e.require)("util").TextEncoder:TextEncoder)("utf-8");const p="function"==typeof f.encodeInto?function(e,t){return f.encodeInto(e,t)}:function(e,t){const n=f.encode(e);return t.set(n),{read:e.length,written:n.length}};function h(e,t,n){if(void 0===n){const n=f.encode(e),o=t(n.length);return i().subarray(o,o+n.length).set(n),u=n.length,o}let o=e.length,r=t(o);const c=i();let s=0;for(;s<o;s++){const t=e.charCodeAt(s);if(t>127)break;c[r+s]=t}if(s!==o){0!==s&&(e=e.slice(s)),r=n(r,o,o=s+3*e.length);const t=i().subarray(r+s,r+o);s+=p(e,t).written}return u=s,r}function m(e,t){var n=h(e,o.d,o.e),r=u,c=o.f(n,r,t);return w.__wrap(c)}let b=null;function g(){return null!==b&&b.buffer===o.j.buffer||(b=new Int32Array(o.j.buffer)),b}function y(e){try{const i=o.b(-16);var t=h(e,o.d,o.e),n=u;o.g(i,t,n);var r=g()[i/4+0],c=g()[i/4+1];let a;return 0!==r&&(a=s(r,c).slice(),o.c(r,1*c)),a}finally{o.b(16)}}class w{static __wrap(e){const t=Object.create(w.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();o.a(e)}get data(){return d(o.h(this.ptr))}get error(){return d(o.i(this.ptr))}}const k=function(e,t){return function(e){l===a.length&&a.push(a.length+1);const t=l;return l=a[t],a[t]=e,t}(s(e,t))},_=function(e,t){throw new Error(s(e,t))}}).call(this,n(27)(e))},28:function(e,t,n){"use strict";var o=n.w[e.i];e.exports=o;n(12);o.k()}}]);
import"./modulepreload-polyfill.b7f2da20.js";import{h as r}from"./vendor.9b089b60.js";const o=document.querySelector(".game-saves"),d=document.querySelector(".add-save"),i=document.getElementById("new-save-name");l();async function l(){const a=await r("taptown",1,{upgrade(e,t,s,m){t===0&&e.createObjectStore("saves")}}),n=a.transaction("saves","readonly").objectStore("saves");c(await n.getAllKeys()),d.addEventListener("click",async()=>{const e=i.value,t={lastSaved:Date.now(),map:new Uint8Array},s=a.transaction("saves","readwrite").objectStore("saves");await s.put(t,e),console.log(e,"save added"),c(await s.getAllKeys())})}function c(a){o.innerHTML="",a.forEach(n=>{const e=document.createElement("span");e.textContent=n;const t=document.createElement("li");t.innerHTML=`${e.outerHTML} - <a href="./app/?save=${encodeURIComponent(n)}">Play</a>`,o.appendChild(t)})}
import"./modulepreload-polyfill.b7f2da20.js";import{v as i}from"./vendor.fcf43544.js";async function l(){return await i("taptown",1,{upgrade(n,e,a,c){e===0&&n.createObjectStore("saves")}})}async function d(n){return await n.transaction("saves","readonly").objectStore("saves").getAllKeys()}const s=document.querySelector(".home-cards"),v=new URLSearchParams(location.search).get("pwa");v==="true"&&(document.querySelector(".card-install").hidden=!0);let t;p();async function p(){t=await l(),o(),r(await d(t))}function o(){document.querySelector(".add-save").addEventListener("click",async()=>{const e=document.getElementById("new-save-name").value,a={lastSaved:Date.now(),timePlayed:0,map:new Uint8Array(Array(4096).fill(0)),people:[],nextPersonId:0,money:100};await t.transaction("saves","readwrite").objectStore("saves").put(a,e),console.log(e,"save added"),r(await d(t))})}function r(n){s.innerHTML=`<div class="card card-install" onclick="document.querySelector('pwa-install').openPrompt()">
  <div class="card-inner">
    <h2>Install TapTown</h2>
    <p>Add TapTown to your homescreen for easy access and a full app experience.</p>
  </div>
</div>`,n.forEach(e=>{const a=document.createElement("a");a.className="card card-saves",a.href=`./app/?save=${encodeURIComponent(e)}`,a.innerHTML=`<div class="card-inner"><h2>${e}</h2><p>Tap to Play!</p></div>`,s.appendChild(a)}),s.innerHTML+=`<div class="card card-newsave">
    <div class="card-inner">
      <h2>Add New Save</h2>
      <label for="new-save-name">New Save:</label><input id="new-save-name" name="new-save-name" type="string"><button class="add-save">Add</button>
    </div>
  </div>
</div>`,o()}

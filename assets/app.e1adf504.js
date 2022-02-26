import"./modulepreload-polyfill.b7f2da20.js";import{c as R,s as ae,f as Le,m as Ce,t as M,a as Ae,i as Pe,b as Se,r as q,d as K,e as ne,w as ee,g as U,h as Xe,j as W,n as Ve,k as De,$ as se,o as ce,l as We,p as Ne,q as je,u as de}from"./vendor.fcf43544.js";var Qe=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vTextureCoord = aTextureCoord;
  vNormal = aNormal;
}

`,Ze=`varying highp vec2 vTextureCoord;
uniform sampler2D uTexture;

varying highp vec3 vNormal;

uniform bool uHighlight;
uniform highp mat4 uNormalMatrix;

void main(void) {

  // calculate lighting
  highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
  highp vec3 directionalLightColour = vec3(1, 1, 1);
  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

  highp vec4 transformedNormal = uNormalMatrix * vec4(vNormal, 1.0);

  highp float directional = max(dot(vNormal.xyz, directionalVector), 0.0);
  highp vec3 lighting = ambientLight + (directionalLightColour * directional);

  // initial colour
  highp vec4 colour;
  // brighten if highlighted
  if (uHighlight) {
    colour = texture2D(uTexture, vTextureCoord) + vec4(0.1, 0.1, 0.1, 0.0);
  } else {
    colour = texture2D(uTexture, vTextureCoord);
  }

  colour = vec4(colour.rgb * lighting, colour.a);

  // now adjust colour by lighting and return
  gl_FragColor = colour;
  
}`;function Oe(e,t){return new Promise((i,o)=>{const a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a);const r=new Image;r.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r),le(r.width)&&le(r.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),i(a)},r.src=t})}function le(e){return(e&e-1)==0}function m(e,t){return new Promise(async(i,o)=>{const r=await(await fetch(t)).json(),c=r.scenes[r.scene],d=await(await fetch(r.buffers[0].uri)).blob();let u=[...c.nodes],f=0,T=[],x=[],p=[],h=[];for(;f<u.length;){let fe=x.length/3;const w=r.nodes[u[f]];if(w.children&&u.push(...w.children),w.mesh!==void 0){let I=R();if(w.scale&&ae(I,I,w.scale),w.rotation){const E=R();Le(E,w.rotation),Ce(I,I,E)}w.translation&&M(I,I,w.translation);const V=r.meshes[w.mesh].primitives[0],Te=V.indices,xe=r.accessors[Te],z=r.bufferViews[xe.bufferView],pe=d.slice(z.byteOffset,z.byteOffset+z.byteLength),be=new Int16Array(await pe.arrayBuffer());T.push(...be.map(E=>E+fe));const we=V.attributes.POSITION,Ee=r.accessors[we],k=r.bufferViews[Ee.bufferView],Re=d.slice(k.byteOffset,k.byteOffset+k.byteLength),D=new Float32Array(await Re.arrayBuffer());for(let E=0;E<D.length;E+=3){let $=[D[E],D[E+1],D[E+2]];Ae($,$,I),x.push(...$)}const ve=V.attributes.NORMAL,Fe=r.accessors[ve],H=r.bufferViews[Fe.bufferView],Me=d.slice(H.byteOffset,H.byteOffset+H.byteLength),Ue=new Float32Array(await Me.arrayBuffer());p.push(...Ue);const Ie=V.attributes.TEXCOORD_0,_e=r.accessors[Ie],g=r.bufferViews[_e.bufferView],Be=d.slice(g.byteOffset,g.byteOffset+g.byteLength),ye=new Float32Array(await Be.arrayBuffer());h.push(...ye)}f++}const G=await Oe(e,r.images[0].uri),b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array(x),e.STATIC_DRAW);const X=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,X),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(T),e.STATIC_DRAW);const re=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,re),e.bufferData(e.ARRAY_BUFFER,new Float32Array(h),e.STATIC_DRAW);const oe=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,oe),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW),i({buffers:{index:X,vertex:b,texCoords:re,normal:oe},indexCount:T.length,texture:G})})}var Je="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Ye="/taptown/assets/Road-x.25087994.gltf",Ge="/taptown/assets/Road-right.05535041.gltf",ze="/taptown/assets/Road-left.e4d57c46.gltf",ke="/taptown/assets/Road-y.43b84893.gltf",He="/taptown/assets/Road-up.f33fbfbe.gltf",ge="/taptown/assets/Road-down.3aa34828.gltf",$e="/taptown/assets/Road-cross.c0149426.gltf",qe="/taptown/assets/Road-upleft.8e8e8992.gltf",Ke="/taptown/assets/Road-leftdown.43e4587d.gltf",et="/taptown/assets/Road-downright.2ee19715.gltf",tt="/taptown/assets/Road-rightup.f9b3a2d6.gltf",it="/taptown/assets/Road-T.dd27be2f.gltf",rt="/taptown/assets/Road-l-.8fa437e2.gltf",ot="/taptown/assets/Road--l.cec3388c.gltf",at="/taptown/assets/Road-_l_.04dac8e2.gltf",nt="/taptown/assets/Road-single.f2299542.gltf",st="/taptown/assets/outofbounds.8b7ad541.gltf",ct="/taptown/assets/Cafe.5a05628e.gltf";const l=[null];let ue=!1;async function dt(e){l[0]=await m(e,Je),l[1]=await m(e,Ye),l[2]=await m(e,Ge),l[3]=await m(e,ze),l[4]=await m(e,ke),l[5]=await m(e,He),l[6]=await m(e,ge),l[7]=await m(e,$e),l[8]=await m(e,qe),l[9]=await m(e,Ke),l[10]=await m(e,et),l[11]=await m(e,tt),l[12]=await m(e,it),l[13]=await m(e,rt),l[14]=await m(e,ot),l[15]=await m(e,at),l[16]=await m(e,nt),l[254]=await m(e,st),l[255]=await m(e,ct),ue=!0}function N(e,t,[i,o],a,r,c){if(!ue)throw"Models aren't loaded!";const s=l[t];if(!s)return;const d=R();M(d,c,[i*2,0,o*2]);{const f=3,T=e.FLOAT,x=!1,p=0,h=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(a.attribLocations.vertexPosition,f,T,x,p,h),e.enableVertexAttribArray(a.attribLocations.vertexPosition)}{const f=3,T=e.FLOAT,x=!1,p=0,h=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(a.attribLocations.normalPosition,f,T,x,p,h),e.enableVertexAttribArray(a.attribLocations.normalPosition)}{const f=2,T=e.FLOAT,x=!1,p=0,h=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(a.attribLocations.textureCoordPosition,f,T,x,p,h),e.enableVertexAttribArray(a.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(a.program),e.uniformMatrix4fv(a.uniformLocations.projectionMatrix,!1,r),e.uniformMatrix4fv(a.uniformLocations.modelViewMatrix,!1,d);const u=R();Pe(u,d),Se(u,u),e.uniformMatrix4fv(a.uniformLocations.normalMatrix,!1,u),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(a.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}class lt{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=R(),M(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),q(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),K(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",t=>{this._pointerDown=!0,this._prevPointerX=t.clientX,this._prevPointerY=t.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",t=>{this._pointerDown&&(this._moveCamera(t.clientX-this._prevPointerX,t.clientY-this._prevPointerY),this._velocityX=t.clientX-this._prevPointerX,this._velocityY=t.clientY-this._prevPointerY),this._prevPointerX=t.clientX,this._prevPointerY=t.clientY})}_moveCamera(t,i){if(this._inFocusMode)return;const o=t/this._pixelToTileX,a=i/this._pixelToTileZ*1.425,r=[o,a];ne(r,r,[0,0],45*Math.PI/180),this.x-=r[0],this.z-=r[1],M(this.cameraMatrix,this.cameraMatrix,[r[0],0,r[1]])}setPixelToTileRatio(t,i){this._pixelToTileX=t,this._pixelToTileZ=i}update(t){let i=t/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*i)*Math.sign(this._velocityX)*10*i,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*i)*Math.sign(this._velocityY)*10*i,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([t,i]){this._inFocusMode=!0;const o=Date.now(),a=()=>{let r=(Date.now()-o)/1e3;r>1&&(r=1);const c=-this.x*(1-r)+(-t*2+innerWidth/200)*r,s=-this.z*(1-r)+(-i*2+innerHeight/200)*r,d=1;this.cameraMatrix=R(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),q(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),K(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),ae(this.cameraMatrix,this.cameraMatrix,[d,d,d]),M(this.cameraMatrix,this.cameraMatrix,[c,0,s]),r<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}exitFocus(){this.cameraMatrix=R(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),q(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),K(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),M(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function ut(){return new Worker("/taptown/assets/ambient.84990750.js",{type:"module"})}function mt(){return new Worker("/taptown/assets/buildings.8fb26608.js",{type:"module"})}function ht(){return new Worker("/taptown/assets/people.2a8a57fd.js",{type:"module"})}let me,_,j;const Q=new MessageChannel,Z=new MessageChannel,O=new MessageChannel,J=new MessageChannel;async function ft(){const e=ee(new ut);e.log();const t=ee(new mt);t.log();const i=ee(new ht);return i.log(),me=await new e(U(O.port1,[O.port1]),U(J.port2,[J.port2])),_=await new t(U(Q.port1,[Q.port1]),U(Z.port2,[Z.port2])),j=await new i(U(Z.port1,[Z.port1]),U(Q.port2,[Q.port2]),U(J.port1,[J.port1]),U(O.port2,[O.port2])),{ambient:me,buildings:_,people:j}}var Tt=`.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}

.cover-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

@keyframes openTilePortrait {
  from {
    transform: translateY(100%);
  }
}
@keyframes closeTilePortrait {
  to {
    transform: translateY(100%);
  }
}
@keyframes openTileLandscape {
  from {
    transform: translate(-100%);
  }
}
@keyframes closeTileLandscape {
  to {
    transform: translate(-100%);
  }
}
@keyframes openTileMouse {
  from {
    transform: scale(0);
  }
}
@keyframes closeTileMouse {
  to {
    transform: scale(0);
  }
}
.tile-menu {
  position: absolute;
  background: url("../img/ui/popup.png");
  background-size: cover;
  z-index: 2;
  transform-origin: top left;
  transform-origin: var(--transform-origin);
  filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5));
  color: white;
  box-sizing: border-box;
  padding: 1rem;
}
@media (orientation: portrait) {
  .tile-menu {
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 150.78125vw;
    animation: openTilePortrait 0.2s ease;
  }
  .tile-menu.reverse {
    animation: closeTilePortrait 0.2s ease;
  }
}
@media (orientation: landscape) {
  .tile-menu {
    left: 0;
    top: 0;
    width: 66.3212435233vh;
    height: 100vh;
    animation: openTileLandscape 0.2s ease;
  }
  .tile-menu.reverse {
    animation: closeTileLandscape 0.2s ease;
  }
}
@media (pointer: fine) {
  .tile-menu {
    left: var(--mouse-x);
    top: var(--mouse-y);
    width: 256px;
    height: 386px;
    animation: openTileMouse 0.2s ease;
  }
  .tile-menu.reverse {
    animation: closeTileMouse 0.2s ease;
  }
}`,L=globalThis&&globalThis.__decorate||function(e,t,i,o){var a=arguments.length,r=a<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(c=e[s])&&(r=(a<3?c(r):a>3?c(t,i,r):c(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let B=class extends De{close(){this.shadowRoot.querySelector(".tile-menu").classList.add("reverse"),setTimeout(()=>this.remove(),200)}async connectedCallback(){super.connectedCallback();let t="";this.mouse[0]<innerWidth/2?(this.style.setProperty("--mouse-x",`${this.mouse[0]}px`),t="left "):(this.style.setProperty("--mouse-x",`${this.mouse[0]-256}px`),t="right "),this.mouse[1]<innerHeight/2?(this.style.setProperty("--mouse-y",`${this.mouse[1]}px`),t+="top"):(this.style.setProperty("--mouse-y",`${this.mouse[1]-386}px`),t+="bottom"),this.style.setProperty("--transform-origin",t),this.residents=await j.getResidents(this.x,this.z)}render(){var t;return se`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{_.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button @click=${()=>{_.setTile(this.x,this.z,255),this.close()}}>Build Cafe</button>
        </div>
        <div class="residents">
          <h2>Residents</h2>
          <ul>
            ${(t=this.residents)==null?void 0:t.map(i=>se`<li>${i.name[0]} ${i.name[1]}</li>`)}
          </ul>
        </div>
      </div>
    `}};B.styles=Xe([Tt]);L([W()],B.prototype,"x",void 0);L([W()],B.prototype,"z",void 0);L([W()],B.prototype,"mouse",void 0);L([W()],B.prototype,"residents",void 0);B=L([Ve("tt-tile")],B);const xt=document.querySelector(".money"),pt=document.querySelector(".population");function bt(e){xt.textContent=`$${e.money}`,pt.textContent=`${e.population}`}function wt(e,t,i){const o=document.createElement("tt-tile");o.x=e,o.z=t,o.mouse=[i.clientX,i.clientY],document.body.appendChild(o)}var Et=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`,Rt=`void main(void) {
  gl_FragColor = vec4(1, 1, 1, 1);
}`;let he,te;function vt(e){he=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",he);const t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,Et),e.compileShader(t);const i=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(i,Rt),e.compileShader(i),!e.getShaderParameter(t,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(t)),e.deleteShader(t),null;if(!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;const o=e.createProgram();if(e.attachShader(o,t),e.attachShader(o,i),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(o)),null;te={program:o,attribLocations:{vertexPosition:e.getAttribLocation(o,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(o,"aTextureCoord"),normalPosition:e.getAttribLocation(o,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(o,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(o,"uNormalMatrix"),texture:e.getUniformLocation(o,"uTexture"),highlight:e.getUniformLocation(o,"uHighlight")}}}function Ft(e,t,i){vt(e);const o=e.createFramebuffer(),a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,i,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,t,i,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,r,0);const c=e.checkFramebufferStatus(e.FRAMEBUFFER);return c!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+c.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),o}function Mt(e,t,{camera:i,buildingsPerRow:o,buildingsPerColumn:a,map:r,mapSize:c}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,d=.1,u=100,f=R();ce(f,0,o,0,o*s,d,u);const T=Math.floor(i.x/2)-1,x=Math.floor(i.z/2)-5,p=R();We(p,[i.x-10,2,i.z-13],[i.x,0,i.z],[0,1,0]);for(let h=x;h<x+a*2;h++){let G=h*c;for(let b=T;b<T+o*2;b++){let X=G+b;!(b>=c)&&!(b<0)&&!(h<0)&&!(h>=c)?N(e,r[X],[b,h],te,f,p):N(e,254,[b,h],te,f,p)}}}const F=document.getElementsByTagName("canvas")[0];let y=2*(innerWidth/200),C=2*(innerHeight/200),Y,A,v=new lt,P=[-100,-100],S;window.camera=v;F.width=innerWidth*devicePixelRatio;F.height=innerHeight*devicePixelRatio;let ie=innerWidth/y,Ut=innerHeight/C;v.setPixelToTileRatio(ie,Ut);let n=F.getContext("webgl");window.addEventListener("resize",()=>{F.width=innerWidth*devicePixelRatio,F.height=innerHeight*devicePixelRatio,n.viewport(0,0,F.width,F.height),y=2*(innerWidth/200),C=2*(innerHeight/200);let e=innerWidth/y,t=innerHeight/C;v.setPixelToTileRatio(e,t)});F.addEventListener("mousemove",e=>{const t=e.clientX/ie/2,i=(e.clientY-window.innerHeight)/ie/2*1.425,o=[t,i];ne(o,o,[0,0],45*Math.PI/180);const a=[v.x/2,v.z/2+1];Ne(o,o,a),je(o,o),P=o});F.addEventListener("click",e=>{wt(P[0],P[1],e)});document.querySelector(".writeSaveButton").addEventListener("click",async()=>{await _.writeSave(S)});It();async function It(){await ft(),await _.setCallback(de(d=>{Y=d,A=Math.sqrt(Y.length)})),await j.setCallback(de(d=>{bt(d)})),S=new URLSearchParams(location.search).get("save"),S||(alert("Save not provided."),location.replace("../"));const t=await _.loadSave(S);t||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${S} \u2022 TapTown!`,console.log(t);const i=n.createShader(n.VERTEX_SHADER);n.shaderSource(i,Qe),n.compileShader(i);const o=n.createShader(n.FRAGMENT_SHADER);if(n.shaderSource(o,Ze),n.compileShader(o),!n.getShaderParameter(i,n.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+n.getShaderInfoLog(i)),n.deleteShader(i),null;if(!n.getShaderParameter(o,n.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+n.getShaderInfoLog(o)),n.deleteShader(o),null;const a=n.createProgram();if(n.attachShader(a,i),n.attachShader(a,o),n.linkProgram(a),!n.getProgramParameter(a,n.LINK_STATUS))return alert("Unable to initialize the shader program: "+n.getProgramInfoLog(a)),null;const r=Ft(n,innerWidth,innerHeight),c={program:a,frameBuffer:r,attribLocations:{vertexPosition:n.getAttribLocation(a,"aVertexPosition"),textureCoordPosition:n.getAttribLocation(a,"aTextureCoord"),normalPosition:n.getAttribLocation(a,"aNormal")},uniformLocations:{projectionMatrix:n.getUniformLocation(a,"uProjectionMatrix"),modelViewMatrix:n.getUniformLocation(a,"uModelViewMatrix"),normalMatrix:n.getUniformLocation(a,"uNormalMatrix"),texture:n.getUniformLocation(a,"uTexture"),highlight:n.getUniformLocation(a,"uHighlight")}};await dt(n);const s=d=>{Mt(n,r,{camera:v,buildingsPerRow:y,buildingsPerColumn:C,map:Y,mapSize:A}),_t(c),requestAnimationFrame(s)};requestAnimationFrame(s)}function _t(e){n.clearColor(0,0,0,1),n.clearDepth(1),n.enable(n.DEPTH_TEST),n.depthFunc(n.LEQUAL),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT);const t=n.canvas.clientHeight/n.canvas.clientWidth,i=.1,o=100,a=R();ce(a,0,y,0,y*t,i,o);const r=Math.floor(v.x/2)-1,c=Math.floor(v.z/2)-5;for(let s=c;s<c+C*2;s++){let d=s*A;for(let u=r;u<r+y*2;u++){let f=d+u;u===P[0]&&s===P[1]?n.uniform1i(e.uniformLocations.highlight,1):n.uniform1i(e.uniformLocations.highlight,0),!(u>=A)&&!(u<0)&&!(s<0)&&!(s>=A)?N(n,Y[f],[u,s],e,a,v.cameraMatrix):N(n,254,[u,s],e,a,v.cameraMatrix)}}}

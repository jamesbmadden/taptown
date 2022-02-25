import"./modulepreload-polyfill.b7f2da20.js";import{c as R,s as oe,f as ye,m as Le,t as v,a as Ce,i as Ae,b as Pe,r as g,d as q,e as ae,w as K,g as U,h as Xe,j as D,n as Se,k as Ve,$ as ne,o as se,l as De,p as We,q as Ne,u as ce}from"./vendor.fcf43544.js";var je=`attribute vec4 aVertexPosition;
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

`,Qe=`varying highp vec2 vTextureCoord;
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
  
}`;function Ze(e,i){return new Promise((o,r)=>{const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const t=new Image;t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),de(t.width)&&de(t.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),o(n)},t.src=i})}function de(e){return(e&e-1)==0}function l(e,i){return new Promise(async(o,r)=>{const t=await(await fetch(i)).json(),d=t.scenes[t.scene],h=await(await fetch(t.buffers[0].uri)).blob();let c=[...d.nodes],f=0,x=[],T=[],p=[],m=[];for(;f<c.length;){let me=T.length/3;const b=t.nodes[c[f]];if(b.children&&c.push(...b.children),b.mesh!==void 0){let I=R();if(b.scale&&oe(I,I,b.scale),b.rotation){const w=R();ye(w,b.rotation),Le(I,I,w)}b.translation&&v(I,I,b.translation);const S=t.meshes[b.mesh].primitives[0],fe=S.indices,xe=t.accessors[fe],G=t.bufferViews[xe.bufferView],Te=h.slice(G.byteOffset,G.byteOffset+G.byteLength),pe=new Int16Array(await Te.arrayBuffer());x.push(...pe.map(w=>w+me));const Ee=S.attributes.POSITION,be=t.accessors[Ee],z=t.bufferViews[be.bufferView],we=h.slice(z.byteOffset,z.byteOffset+z.byteLength),V=new Float32Array(await we.arrayBuffer());for(let w=0;w<V.length;w+=3){let $=[V[w],V[w+1],V[w+2]];Ce($,$,I),T.push(...$)}const Re=S.attributes.NORMAL,Fe=t.accessors[Re],H=t.bufferViews[Fe.bufferView],Me=h.slice(H.byteOffset,H.byteOffset+H.byteLength),ve=new Float32Array(await Me.arrayBuffer());p.push(...ve);const Ue=S.attributes.TEXCOORD_0,Ie=t.accessors[Ue],k=t.bufferViews[Ie.bufferView],_e=h.slice(k.byteOffset,k.byteOffset+k.byteLength),Be=new Float32Array(await _e.arrayBuffer());m.push(...Be)}f++}const Y=await Ze(e,t.images[0].uri),E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);const X=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,X),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(x),e.STATIC_DRAW);const ie=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ie),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW);const re=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,re),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW),o({buffers:{index:X,vertex:E,texCoords:ie,normal:re},indexCount:x.length,texture:Y})})}var Oe="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Je="/taptown/assets/Road-x.25087994.gltf",Ye="/taptown/assets/Road-right.05535041.gltf",Ge="/taptown/assets/Road-left.e4d57c46.gltf",ze="/taptown/assets/Road-y.43b84893.gltf",He="/taptown/assets/Road-up.f33fbfbe.gltf",ke="/taptown/assets/Road-down.3aa34828.gltf",$e="/taptown/assets/Road-cross.c0149426.gltf",ge="/taptown/assets/Road-upleft.8e8e8992.gltf",qe="/taptown/assets/Road-leftdown.43e4587d.gltf",Ke="/taptown/assets/Road-downright.2ee19715.gltf",et="/taptown/assets/Road-rightup.f9b3a2d6.gltf",tt="/taptown/assets/Road-T.dd27be2f.gltf",it="/taptown/assets/Road-l-.8fa437e2.gltf",rt="/taptown/assets/Road--l.cec3388c.gltf",ot="/taptown/assets/Road-_l_.04dac8e2.gltf",at="/taptown/assets/Road-single.f2299542.gltf",nt="/taptown/assets/outofbounds.8b7ad541.gltf",st="/taptown/assets/Cafe.5a05628e.gltf";const u=[null];let ue=!1;async function ct(e){u[0]=await l(e,Oe),u[1]=await l(e,Je),u[2]=await l(e,Ye),u[3]=await l(e,Ge),u[4]=await l(e,ze),u[5]=await l(e,He),u[6]=await l(e,ke),u[7]=await l(e,$e),u[8]=await l(e,ge),u[9]=await l(e,qe),u[10]=await l(e,Ke),u[11]=await l(e,et),u[12]=await l(e,tt),u[13]=await l(e,it),u[14]=await l(e,rt),u[15]=await l(e,ot),u[16]=await l(e,at),u[254]=await l(e,nt),u[255]=await l(e,st),ue=!0}function W(e,i,[o,r],n,t,d){if(!ue)throw"Models aren't loaded!";const s=u[i];if(!s)return;const h=R();v(h,d,[o*2,0,r*2]);{const f=3,x=e.FLOAT,T=!1,p=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(n.attribLocations.vertexPosition,f,x,T,p,m),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const f=3,x=e.FLOAT,T=!1,p=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(n.attribLocations.normalPosition,f,x,T,p,m),e.enableVertexAttribArray(n.attribLocations.normalPosition)}{const f=2,x=e.FLOAT,T=!1,p=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(n.attribLocations.textureCoordPosition,f,x,T,p,m),e.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,t),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,h);const c=R();Ae(c,h),Pe(c,c),e.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,c),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(n.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}class dt{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=R(),v(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),g(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),q(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,o){if(this._inFocusMode)return;const r=i/this._pixelToTileX,n=o/this._pixelToTileZ*1.425,t=[r,n];ae(t,t,[0,0],45*Math.PI/180),this.x-=t[0],this.z-=t[1],v(this.cameraMatrix,this.cameraMatrix,[t[0],0,t[1]])}setPixelToTileRatio(i,o){this._pixelToTileX=i,this._pixelToTileZ=o}update(i){let o=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*o)*Math.sign(this._velocityX)*10*o,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*o)*Math.sign(this._velocityY)*10*o,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,o]){this._inFocusMode=!0;const r=Date.now(),n=()=>{let t=(Date.now()-r)/1e3;t>1&&(t=1);const d=-this.x*(1-t)+(-i*2+innerWidth/200)*t,s=-this.z*(1-t)+(-o*2+innerHeight/200)*t,h=1;this.cameraMatrix=R(),v(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),g(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),q(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),oe(this.cameraMatrix,this.cameraMatrix,[h,h,h]),v(this.cameraMatrix,this.cameraMatrix,[d,0,s]),t<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=R(),v(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),g(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),q(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),v(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function ut(){return new Worker("/taptown/assets/ambient.84990750.js",{type:"module"})}function ht(){return new Worker("/taptown/assets/buildings.4da7c4f3.js",{type:"module"})}function lt(){return new Worker("/taptown/assets/people.8597cbc5.js",{type:"module"})}let he,y,N;const j=new MessageChannel,Q=new MessageChannel,Z=new MessageChannel,O=new MessageChannel;async function mt(){const e=K(new ut);e.log();const i=K(new ht);i.log();const o=K(new lt);return o.log(),he=await new e(U(Z.port1,[Z.port1]),U(O.port2,[O.port2])),y=await new i(U(j.port1,[j.port1]),U(Q.port2,[Q.port2])),N=await new o(U(Q.port1,[Q.port1]),U(j.port2,[j.port2]),U(O.port1,[O.port1]),U(Z.port2,[Z.port2])),{ambient:he,buildings:y,people:N}}var ft=`.close-button {
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

@keyframes openTileMouse {
  from {
    transform: scale(0);
  }
}
.tile-menu {
  position: absolute;
  background: #555;
  z-index: 2;
  transform-origin: top left;
  transform-origin: var(--transform-origin);
}
@media (orientation: portrait) {
  .tile-menu {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
  }
}
@media (orientation: landscape) {
  .tile-menu {
    left: 0;
    top: 0;
    width: 256px;
    height: 100%;
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
}`,L=globalThis&&globalThis.__decorate||function(e,i,o,r){var n=arguments.length,t=n<3?i:r===null?r=Object.getOwnPropertyDescriptor(i,o):r,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,i,o,r);else for(var s=e.length-1;s>=0;s--)(d=e[s])&&(t=(n<3?d(t):n>3?d(i,o,t):d(i,o))||t);return n>3&&t&&Object.defineProperty(i,o,t),t};let _=class extends Ve{close(){this.remove()}async connectedCallback(){super.connectedCallback();let i="";this.mouse[0]<innerWidth/2?(this.style.setProperty("--mouse-x",`${this.mouse[0]}px`),i="left "):(this.style.setProperty("--mouse-x",`${this.mouse[0]-256}px`),i="right "),this.mouse[1]<innerHeight/2?(this.style.setProperty("--mouse-y",`${this.mouse[1]}px`),i+="top"):(this.style.setProperty("--mouse-y",`${this.mouse[1]-386}px`),i+="bottom"),this.style.setProperty("--transform-origin",i),this.residents=await N.getResidents(this.x,this.z)}render(){var i;return ne`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{y.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button @click=${()=>{y.setTile(this.x,this.z,255),this.close()}}>Build Cafe</button>
        </div>
        <div class="residents">
          <h2>Residents</h2>
          <ul>
            ${(i=this.residents)==null?void 0:i.map(o=>ne`<li>${o.name[0]} ${o.name[1]}</li>`)}
          </ul>
        </div>
      </div>
    `}};_.styles=Xe([ft]);L([D()],_.prototype,"x",void 0);L([D()],_.prototype,"z",void 0);L([D()],_.prototype,"mouse",void 0);L([D()],_.prototype,"residents",void 0);_=L([Se("tt-tile")],_);const xt=document.querySelector(".money"),Tt=document.querySelector(".population");function pt(e){xt.textContent=`$${e.money}`,Tt.textContent=`${e.population}`}function Et(e,i,o){const r=document.createElement("tt-tile");r.x=e,r.z=i,r.mouse=[o.clientX,o.clientY],document.body.appendChild(r)}var bt=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`,wt=`void main(void) {
  gl_FragColor = vec4(1, 1, 1, 1);
}`;let le,ee;function Rt(e){le=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",le);const i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,bt),e.compileShader(i);const o=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(o,wt),e.compileShader(o),!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;if(!e.getShaderParameter(o,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(o)),e.deleteShader(o),null;const r=e.createProgram();if(e.attachShader(r,i),e.attachShader(r,o),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null;ee={program:r,attribLocations:{vertexPosition:e.getAttribLocation(r,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(r,"aTextureCoord"),normalPosition:e.getAttribLocation(r,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(r,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(r,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(r,"uNormalMatrix"),texture:e.getUniformLocation(r,"uTexture"),highlight:e.getUniformLocation(r,"uHighlight")}}}function Ft(e,i,o){Rt(e);const r=e.createFramebuffer(),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,i,o,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,i,o,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,t,0);const d=e.checkFramebufferStatus(e.FRAMEBUFFER);return d!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+d.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),r}function Mt(e,i,{camera:o,buildingsPerRow:r,buildingsPerColumn:n,map:t,mapSize:d}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,h=.1,c=100,f=R();se(f,0,r,0,r*s,h,c);const x=Math.floor(o.x/2)-1,T=Math.floor(o.z/2)-5,p=R();De(p,[o.x-10,2,o.z-13],[o.x,0,o.z],[0,1,0]);for(let m=T;m<T+n*2;m++){let Y=m*d;for(let E=x;E<x+r*2;E++){let X=Y+E;!(E>=d)&&!(E<0)&&!(m<0)&&!(m>=d)?W(e,t[X],[E,m],ee,f,p):W(e,254,[E,m],ee,f,p)}}}const M=document.getElementsByTagName("canvas")[0];let B=2*(innerWidth/200),C=2*(innerHeight/200),J,A,F=new dt,P=[-100,-100];window.camera=F;M.width=innerWidth*devicePixelRatio;M.height=innerHeight*devicePixelRatio;let te=innerWidth/B,vt=innerHeight/C;F.setPixelToTileRatio(te,vt);let a=M.getContext("webgl");window.addEventListener("resize",()=>{M.width=innerWidth*devicePixelRatio,M.height=innerHeight*devicePixelRatio,a.viewport(0,0,M.width,M.height),B=2*(innerWidth/200),C=2*(innerHeight/200);let e=innerWidth/B,i=innerHeight/C;F.setPixelToTileRatio(e,i)});M.addEventListener("mousemove",e=>{const i=e.clientX/te/2,o=(e.clientY-window.innerHeight)/te/2*1.425,r=[i,o];ae(r,r,[0,0],45*Math.PI/180);const n=[F.x/2,F.z/2+1];We(r,r,n),Ne(r,r),P=r});M.addEventListener("click",e=>{Et(P[0],P[1],e)});Ut();async function Ut(){await mt(),await y.setCallback(ce(c=>{J=c,A=Math.sqrt(J.length)})),await N.setCallback(ce(c=>{pt(c)}));const i=new URLSearchParams(location.search).get("save");i||(alert("Save not provided."),location.replace("../"));const o=await y.loadSave(i);o||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${i} \u2022 TapTown!`,console.log(o);const r=a.createShader(a.VERTEX_SHADER);a.shaderSource(r,je),a.compileShader(r);const n=a.createShader(a.FRAGMENT_SHADER);if(a.shaderSource(n,Qe),a.compileShader(n),!a.getShaderParameter(r,a.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+a.getShaderInfoLog(r)),a.deleteShader(r),null;if(!a.getShaderParameter(n,a.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+a.getShaderInfoLog(n)),a.deleteShader(n),null;const t=a.createProgram();if(a.attachShader(t,r),a.attachShader(t,n),a.linkProgram(t),!a.getProgramParameter(t,a.LINK_STATUS))return alert("Unable to initialize the shader program: "+a.getProgramInfoLog(t)),null;const d=Ft(a,innerWidth,innerHeight),s={program:t,frameBuffer:d,attribLocations:{vertexPosition:a.getAttribLocation(t,"aVertexPosition"),textureCoordPosition:a.getAttribLocation(t,"aTextureCoord"),normalPosition:a.getAttribLocation(t,"aNormal")},uniformLocations:{projectionMatrix:a.getUniformLocation(t,"uProjectionMatrix"),modelViewMatrix:a.getUniformLocation(t,"uModelViewMatrix"),normalMatrix:a.getUniformLocation(t,"uNormalMatrix"),texture:a.getUniformLocation(t,"uTexture"),highlight:a.getUniformLocation(t,"uHighlight")}};await ct(a);const h=c=>{Mt(a,d,{camera:F,buildingsPerRow:B,buildingsPerColumn:C,map:J,mapSize:A}),It(s),requestAnimationFrame(h)};requestAnimationFrame(h)}function It(e){a.clearColor(0,0,0,1),a.clearDepth(1),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);const i=a.canvas.clientHeight/a.canvas.clientWidth,o=.1,r=100,n=R();se(n,0,B,0,B*i,o,r);const t=Math.floor(F.x/2)-1,d=Math.floor(F.z/2)-5;for(let s=d;s<d+C*2;s++){let h=s*A;for(let c=t;c<t+B*2;c++){let f=h+c;c===P[0]&&s===P[1]?a.uniform1i(e.uniformLocations.highlight,1):a.uniform1i(e.uniformLocations.highlight,0),!(c>=A)&&!(c<0)&&!(s<0)&&!(s>=A)?W(a,J[f],[c,s],e,n,F.cameraMatrix):W(a,254,[c,s],e,n,F.cameraMatrix)}}}

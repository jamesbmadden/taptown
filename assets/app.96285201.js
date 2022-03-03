import"./modulepreload-polyfill.b7f2da20.js";import{c as F,s as Ae,f as Pe,m as Se,t as y,a as Xe,i as Ve,b as We,r as ne,d as ae,e as se,g as De,w as ee,h as b,j as Ne,k as D,n as je,l as Qe,$ as ce,o as de,p as Ze,q as Oe,u as Je,v as le}from"./vendor.e3e5f204.js";var Ye=`attribute vec4 aVertexPosition;
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

`,Ge=`varying highp vec2 vTextureCoord;
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
  
}`;function ze(e,t){return new Promise((i,r)=>{const o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o);const a=new Image;a.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,a),ue(a.width)&&ue(a.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),i(o)},a.src=t})}function ue(e){return(e&e-1)==0}function u(e,t){return new Promise(async(i,r)=>{const a=await(await fetch(t)).json(),c=a.scenes[a.scene],h=await(await fetch(a.buffers[0].uri)).blob();let l=[...c.nodes],f=0,T=[],p=[],x=[],m=[];for(;f<l.length;){let pe=p.length/3;const w=a.nodes[l[f]];if(w.children&&l.push(...w.children),w.mesh!==void 0){let M=F();if(w.scale&&Ae(M,M,w.scale),w.rotation){const R=F();Pe(R,w.rotation),Se(M,M,R)}w.translation&&y(M,M,w.translation);const V=a.meshes[w.mesh].primitives[0],xe=V.indices,be=a.accessors[xe],k=a.bufferViews[be.bufferView],Ee=h.slice(k.byteOffset,k.byteOffset+k.byteLength),we=new Int16Array(await Ee.arrayBuffer());T.push(...we.map(R=>R+pe));const Re=V.attributes.POSITION,ve=a.accessors[Re],g=a.bufferViews[ve.bufferView],Fe=h.slice(g.byteOffset,g.byteOffset+g.byteLength),W=new Float32Array(await Fe.arrayBuffer());for(let R=0;R<W.length;R+=3){let K=[W[R],W[R+1],W[R+2]];Xe(K,K,M),p.push(...K)}const Ue=V.attributes.NORMAL,Me=a.accessors[Ue],$=a.bufferViews[Me.bufferView],Ie=h.slice($.byteOffset,$.byteOffset+$.byteLength),_e=new Float32Array(await Ie.arrayBuffer());x.push(..._e);const Be=V.attributes.TEXCOORD_0,ye=a.accessors[Be],q=a.bufferViews[ye.bufferView],Le=h.slice(q.byteOffset,q.byteOffset+q.byteLength),Ce=new Float32Array(await Le.arrayBuffer());m.push(...Ce)}f++}const H=await ze(e,a.images[0].uri),E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW);const X=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,X),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(T),e.STATIC_DRAW);const re=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,re),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW);const oe=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,oe),e.bufferData(e.ARRAY_BUFFER,new Float32Array(x),e.STATIC_DRAW),i({buffers:{index:X,vertex:E,texCoords:re,normal:oe},indexCount:T.length,texture:H})})}var He="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",ke="/taptown/assets/Road-x.25087994.gltf",ge="/taptown/assets/Road-right.05535041.gltf",$e="/taptown/assets/Road-left.e4d57c46.gltf",qe="/taptown/assets/Road-y.43b84893.gltf",Ke="/taptown/assets/Road-up.f33fbfbe.gltf",et="/taptown/assets/Road-down.3aa34828.gltf",tt="/taptown/assets/Road-cross.c0149426.gltf",it="/taptown/assets/Road-upleft.8e8e8992.gltf",rt="/taptown/assets/Road-leftdown.43e4587d.gltf",ot="/taptown/assets/Road-downright.2ee19715.gltf",nt="/taptown/assets/Road-rightup.f9b3a2d6.gltf",at="/taptown/assets/Road-T.dd27be2f.gltf",st="/taptown/assets/Road-l-.8fa437e2.gltf",ct="/taptown/assets/Road--l.cec3388c.gltf",dt="/taptown/assets/Road-_l_.04dac8e2.gltf",lt="/taptown/assets/Road-single.f2299542.gltf",ut="/taptown/assets/outofbounds.8b7ad541.gltf",ht="/taptown/assets/Cafe.5a05628e.gltf";const d=[null];let he=!1;async function mt(e){d[0]=await u(e,He),d[1]=await u(e,ke),d[2]=await u(e,ge),d[3]=await u(e,$e),d[4]=await u(e,qe),d[5]=await u(e,Ke),d[6]=await u(e,et),d[7]=await u(e,tt),d[8]=await u(e,it),d[9]=await u(e,rt),d[10]=await u(e,ot),d[11]=await u(e,nt),d[12]=await u(e,at),d[13]=await u(e,st),d[14]=await u(e,ct),d[15]=await u(e,dt),d[16]=await u(e,lt),d[254]=await u(e,ut),d[255]=await u(e,ht),he=!0}function N(e,t,[i,r],o,a,c){if(!he)throw"Models aren't loaded!";const s=d[t];if(!s)return;const h=F();y(h,c,[i*2,0,r*2]);{const f=3,T=e.FLOAT,p=!1,x=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(o.attribLocations.vertexPosition,f,T,p,x,m),e.enableVertexAttribArray(o.attribLocations.vertexPosition)}{const f=3,T=e.FLOAT,p=!1,x=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(o.attribLocations.normalPosition,f,T,p,x,m),e.enableVertexAttribArray(o.attribLocations.normalPosition)}{const f=2,T=e.FLOAT,p=!1,x=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(o.attribLocations.textureCoordPosition,f,T,p,x,m),e.enableVertexAttribArray(o.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(o.program),e.uniformMatrix4fv(o.uniformLocations.projectionMatrix,!1,a),e.uniformMatrix4fv(o.uniformLocations.modelViewMatrix,!1,h);const l=F();Ve(l,h),We(l,l),e.uniformMatrix4fv(o.uniformLocations.normalMatrix,!1,l),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(o.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}const me=200;function te(e,t){const i=e/me,r=(t-window.innerHeight)/me*1.425,o=[i,r];return ne(o,o,[0,0],45*Math.PI/180),o}class ft{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=F(),y(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),ae(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),se(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",t=>{this._pointerDown=!0,this._prevPointerX=t.clientX,this._prevPointerY=t.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",t=>{this._pointerDown&&(this._moveCamera(t.clientX-this._prevPointerX,t.clientY-this._prevPointerY),this._velocityX=t.clientX-this._prevPointerX,this._velocityY=t.clientY-this._prevPointerY),this._prevPointerX=t.clientX,this._prevPointerY=t.clientY})}_moveCamera(t,i){if(this._inFocusMode)return;const r=t/this._pixelToTileX,o=i/this._pixelToTileZ*1.425,a=[r,o];ne(a,a,[0,0],45*Math.PI/180),this.x-=a[0],this.z-=a[1],y(this.cameraMatrix,this.cameraMatrix,[a[0],0,a[1]])}setPixelToTileRatio(t,i){this._pixelToTileX=t,this._pixelToTileZ=i}update(t){let i=t/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*i)*Math.sign(this._velocityX)*10*i,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*i)*Math.sign(this._velocityY)*10*i,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([t,i]){this._inFocusMode=!0;let r;matchMedia("(pointer: fine)").matches||(matchMedia("(orientation: portrait)").matches?r=te(innerWidth/2,(innerHeight-386/256*innerWidth)/2+100):matchMedia("(orientation: landscape)").matches&&(r=te(256/386*innerHeight+(innerWidth-256/386*innerHeight)/2,innerHeight/2+100)),De(r,r,[2,2]),this.x=t*2-r[0],this.z=i*2-r[1],this.cameraMatrix=F(),y(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),ae(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),se(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),y(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]))}exitFocus(){this._inFocusMode=!1}}function Tt(){return new Worker("/taptown/assets/ambient.d64f5702.js",{type:"module"})}function pt(){return new Worker("/taptown/assets/buildings.e86d0a07.js",{type:"module"})}function xt(){return new Worker("/taptown/assets/people.2a8a57fd.js",{type:"module"})}let fe,I,j;const Q=new MessageChannel,Z=new MessageChannel,O=new MessageChannel,J=new MessageChannel,Y=new MessageChannel,G=new MessageChannel;async function bt(){const e=ee(new Tt);e.log();const t=ee(new pt);t.log();const i=ee(new xt);return i.log(),fe=await new e(b(O.port1,[O.port1]),b(J.port2,[J.port2]),b(Y.port1,[Y.port1]),b(G.port2,[G.port2])),I=await new t(b(Q.port1,[Q.port1]),b(Z.port2,[Z.port2]),b(G.port1,[G.port1]),b(Y.port2,[Y.port2])),j=await new i(b(Z.port1,[Z.port1]),b(Q.port2,[Q.port2]),b(J.port1,[J.port1]),b(O.port2,[O.port2])),{ambient:fe,buildings:I,people:j}}var Et=`.close-button {
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
}`,L=globalThis&&globalThis.__decorate||function(e,t,i,r){var o=arguments.length,a=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(c=e[s])&&(a=(o<3?c(a):o>3?c(t,i,a):c(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let _=class extends Qe{close(){this.shadowRoot.querySelector(".tile-menu").classList.add("reverse"),setTimeout(()=>this.remove(),200),camera.exitFocus()}async connectedCallback(){super.connectedCallback(),camera.enterFocus([this.x,this.z]);let t="";this.mouse[0]<innerWidth/2?(this.style.setProperty("--mouse-x",`${this.mouse[0]}px`),t="left "):(this.style.setProperty("--mouse-x",`${this.mouse[0]-256}px`),t="right "),this.mouse[1]<innerHeight/2?(this.style.setProperty("--mouse-y",`${this.mouse[1]}px`),t+="top"):(this.style.setProperty("--mouse-y",`${this.mouse[1]-386}px`),t+="bottom"),this.style.setProperty("--transform-origin",t),this.residents=await j.getResidents(this.x,this.z)}render(){var t;return ce`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas" @click=${this.close.bind(this)}></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{I.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button @click=${()=>{I.setTile(this.x,this.z,255),this.close()}}>Build Cafe</button>
        </div>
        <div class="residents">
          <h2>Residents</h2>
          <ul>
            ${(t=this.residents)==null?void 0:t.map(i=>ce`<li>${i.name[0]} ${i.name[1]}</li>`)}
          </ul>
        </div>
      </div>
    `}};_.styles=Ne([Et]);L([D()],_.prototype,"x",void 0);L([D()],_.prototype,"z",void 0);L([D()],_.prototype,"mouse",void 0);L([D()],_.prototype,"residents",void 0);_=L([je("tt-tile")],_);const wt=document.querySelector(".money"),Rt=document.querySelector(".population");function vt(e){wt.textContent=`$${e.money}`,Rt.textContent=`${e.population}`}function Ft(e,t,i){const r=document.createElement("tt-tile");r.x=e,r.z=t,r.mouse=[i.clientX,i.clientY],document.body.appendChild(r)}var Ut=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`,Mt=`void main(void) {
  gl_FragColor = vec4(1, 1, 1, 1);
}`;let Te,ie;function It(e){Te=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",Te);const t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,Ut),e.compileShader(t);const i=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(i,Mt),e.compileShader(i),!e.getShaderParameter(t,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(t)),e.deleteShader(t),null;if(!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;const r=e.createProgram();if(e.attachShader(r,t),e.attachShader(r,i),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null;ie={program:r,attribLocations:{vertexPosition:e.getAttribLocation(r,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(r,"aTextureCoord"),normalPosition:e.getAttribLocation(r,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(r,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(r,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(r,"uNormalMatrix"),texture:e.getUniformLocation(r,"uTexture"),highlight:e.getUniformLocation(r,"uHighlight")}}}function _t(e,t,i){It(e);const r=e.createFramebuffer(),o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,i,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,t,i,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0);const c=e.checkFramebufferStatus(e.FRAMEBUFFER);return c!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+c.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),r}function Bt(e,t,{camera:i,buildingsPerRow:r,buildingsPerColumn:o,map:a,mapSize:c}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,h=.1,l=100,f=F();de(f,0,r,0,r*s,h,l);const T=Math.floor(i.x/2)-1,p=Math.floor(i.z/2)-5,x=F();Ze(x,[i.x-10,2,i.z-13],[i.x,0,i.z],[0,1,0]);for(let m=p;m<p+o*2;m++){let H=m*c;for(let E=T;E<T+r*2;E++){let X=H+E;!(E>=c)&&!(E<0)&&!(m<0)&&!(m>=c)?N(e,a[X],[E,m],ie,f,x):N(e,254,[E,m],ie,f,x)}}}const U=document.getElementsByTagName("canvas")[0];let B=2*(innerWidth/200),C=2*(innerHeight/200),z,A,v=new ft,P=[-100,-100],S;window.camera=v;U.width=innerWidth*devicePixelRatio;U.height=innerHeight*devicePixelRatio;let yt=innerWidth/B,Lt=innerHeight/C;v.setPixelToTileRatio(yt,Lt);let n=U.getContext("webgl");window.addEventListener("resize",()=>{U.width=innerWidth*devicePixelRatio,U.height=innerHeight*devicePixelRatio,n.viewport(0,0,U.width,U.height),B=2*(innerWidth/200),C=2*(innerHeight/200);let e=innerWidth/B,t=innerHeight/C;v.setPixelToTileRatio(e,t)});U.addEventListener("mousemove",e=>{const t=te(e.clientX,e.clientY),i=[v.x/2,v.z/2+1];Oe(t,t,i),Je(t,t),P=t});U.addEventListener("click",e=>{Ft(P[0],P[1],e)});document.querySelector(".writeSaveButton").addEventListener("click",async()=>{await I.writeSave(S)});Ct();async function Ct(){await bt(),await I.setCallback(le(h=>{z=h,A=Math.sqrt(z.length)})),await j.setCallback(le(h=>{vt(h)})),S=new URLSearchParams(location.search).get("save"),S||(alert("Save not provided."),location.replace("../"));const t=await I.loadSave(S);t||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${S} \u2022 TapTown!`,console.log(t);const i=n.createShader(n.VERTEX_SHADER);n.shaderSource(i,Ye),n.compileShader(i);const r=n.createShader(n.FRAGMENT_SHADER);if(n.shaderSource(r,Ge),n.compileShader(r),!n.getShaderParameter(i,n.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+n.getShaderInfoLog(i)),n.deleteShader(i),null;if(!n.getShaderParameter(r,n.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+n.getShaderInfoLog(r)),n.deleteShader(r),null;const o=n.createProgram();if(n.attachShader(o,i),n.attachShader(o,r),n.linkProgram(o),!n.getProgramParameter(o,n.LINK_STATUS))return alert("Unable to initialize the shader program: "+n.getProgramInfoLog(o)),null;const a=_t(n,innerWidth,innerHeight),c={program:o,frameBuffer:a,attribLocations:{vertexPosition:n.getAttribLocation(o,"aVertexPosition"),textureCoordPosition:n.getAttribLocation(o,"aTextureCoord"),normalPosition:n.getAttribLocation(o,"aNormal")},uniformLocations:{projectionMatrix:n.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:n.getUniformLocation(o,"uModelViewMatrix"),normalMatrix:n.getUniformLocation(o,"uNormalMatrix"),texture:n.getUniformLocation(o,"uTexture"),highlight:n.getUniformLocation(o,"uHighlight")}};await mt(n);const s=h=>{Bt(n,a,{camera:v,buildingsPerRow:B,buildingsPerColumn:C,map:z,mapSize:A}),At(c),requestAnimationFrame(s)};requestAnimationFrame(s)}function At(e){n.clearColor(0,0,0,1),n.clearDepth(1),n.enable(n.DEPTH_TEST),n.depthFunc(n.LEQUAL),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT);const t=n.canvas.clientHeight/n.canvas.clientWidth,i=.1,r=100,o=F();de(o,0,B,0,B*t,i,r);const a=Math.floor(v.x/2)-1,c=Math.floor(v.z/2)-5;for(let s=c;s<c+C*2;s++){let h=s*A;for(let l=a;l<a+B*2;l++){let f=h+l;l===P[0]&&s===P[1]?n.uniform1i(e.uniformLocations.highlight,1):n.uniform1i(e.uniformLocations.highlight,0),!(l>=A)&&!(l<0)&&!(s<0)&&!(s>=A)?N(n,z[f],[l,s],e,o,v.cameraMatrix):N(n,254,[l,s],e,o,v.cameraMatrix)}}}

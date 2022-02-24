import"./modulepreload-polyfill.b7f2da20.js";import{c as R,s as re,f as Be,m as Le,t as U,a as Ae,i as Ce,b as ye,r as H,d as k,e as ae,w as $,g as v,h as Pe,j as oe,n as Xe,k as Se,$ as Ve,o as ne,l as De,p as We,q as Ne,u as se}from"./vendor.fcf43544.js";var je=`attribute vec4 aVertexPosition;
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
  
}`;function Ze(e,i){return new Promise((r,a)=>{const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const t=new Image;t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),ce(t.width)&&ce(t.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),r(n)},t.src=i})}function ce(e){return(e&e-1)==0}function l(e,i){return new Promise(async(r,a)=>{const t=await(await fetch(i)).json(),d=t.scenes[t.scene],h=await(await fetch(t.buffers[0].uri)).blob();let c=[...d.nodes],f=0,T=[],x=[],E=[],m=[];for(;f<c.length;){let le=x.length/3;const b=t.nodes[c[f]];if(b.children&&c.push(...b.children),b.mesh!==void 0){let I=R();if(b.scale&&re(I,I,b.scale),b.rotation){const w=R();Be(w,b.rotation),Le(I,I,w)}b.translation&&U(I,I,b.translation);const X=t.meshes[b.mesh].primitives[0],me=X.indices,fe=t.accessors[me],O=t.bufferViews[fe.bufferView],Te=h.slice(O.byteOffset,O.byteOffset+O.byteLength),xe=new Int16Array(await Te.arrayBuffer());T.push(...xe.map(w=>w+le));const Ee=X.attributes.POSITION,pe=t.accessors[Ee],J=t.bufferViews[pe.bufferView],be=h.slice(J.byteOffset,J.byteOffset+J.byteLength),S=new Float32Array(await be.arrayBuffer());for(let w=0;w<S.length;w+=3){let z=[S[w],S[w+1],S[w+2]];Ae(z,z,I),x.push(...z)}const we=X.attributes.NORMAL,Re=t.accessors[we],Y=t.bufferViews[Re.bufferView],Fe=h.slice(Y.byteOffset,Y.byteOffset+Y.byteLength),Me=new Float32Array(await Fe.arrayBuffer());E.push(...Me);const Ue=X.attributes.TEXCOORD_0,ve=t.accessors[Ue],G=t.bufferViews[ve.bufferView],Ie=h.slice(G.byteOffset,G.byteOffset+G.byteLength),_e=new Float32Array(await Ie.arrayBuffer());m.push(..._e)}f++}const Z=await Ze(e,t.images[0].uri),p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,new Float32Array(x),e.STATIC_DRAW);const P=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,P),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(T),e.STATIC_DRAW);const te=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,te),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW);const ie=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ie),e.bufferData(e.ARRAY_BUFFER,new Float32Array(E),e.STATIC_DRAW),r({buffers:{index:P,vertex:p,texCoords:te,normal:ie},indexCount:T.length,texture:Z})})}var Oe="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Je="/taptown/assets/Road-x.25087994.gltf",Ye="/taptown/assets/Road-right.05535041.gltf",Ge="/taptown/assets/Road-left.e4d57c46.gltf",ze="/taptown/assets/Road-y.43b84893.gltf",He="/taptown/assets/Road-up.f33fbfbe.gltf",ke="/taptown/assets/Road-down.3aa34828.gltf",$e="/taptown/assets/Road-cross.c0149426.gltf",ge="/taptown/assets/Road-upleft.8e8e8992.gltf",qe="/taptown/assets/Road-leftdown.43e4587d.gltf",Ke="/taptown/assets/Road-downright.2ee19715.gltf",et="/taptown/assets/Road-rightup.f9b3a2d6.gltf",tt="/taptown/assets/Road-T.dd27be2f.gltf",it="/taptown/assets/Road-l-.8fa437e2.gltf",rt="/taptown/assets/Road--l.cec3388c.gltf",at="/taptown/assets/Road-_l_.04dac8e2.gltf",ot="/taptown/assets/Road-single.f2299542.gltf",nt="/taptown/assets/outofbounds.8b7ad541.gltf",st="/taptown/assets/Cafe.5a05628e.gltf";const u=[null];let de=!1;async function ct(e){u[0]=await l(e,Oe),u[1]=await l(e,Je),u[2]=await l(e,Ye),u[3]=await l(e,Ge),u[4]=await l(e,ze),u[5]=await l(e,He),u[6]=await l(e,ke),u[7]=await l(e,$e),u[8]=await l(e,ge),u[9]=await l(e,qe),u[10]=await l(e,Ke),u[11]=await l(e,et),u[12]=await l(e,tt),u[13]=await l(e,it),u[14]=await l(e,rt),u[15]=await l(e,at),u[16]=await l(e,ot),u[254]=await l(e,nt),u[255]=await l(e,st),de=!0}function V(e,i,[r,a],n,t,d){if(!de)throw"Models aren't loaded!";const s=u[i];if(!s)return;const h=R();U(h,d,[r*2,0,a*2]);{const f=3,T=e.FLOAT,x=!1,E=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(n.attribLocations.vertexPosition,f,T,x,E,m),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const f=3,T=e.FLOAT,x=!1,E=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(n.attribLocations.normalPosition,f,T,x,E,m),e.enableVertexAttribArray(n.attribLocations.normalPosition)}{const f=2,T=e.FLOAT,x=!1,E=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(n.attribLocations.textureCoordPosition,f,T,x,E,m),e.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,t),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,h);const c=R();Ce(c,h),ye(c,c),e.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,c),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(n.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}class dt{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=R(),U(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),H(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),k(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,r){if(this._inFocusMode)return;const a=i/this._pixelToTileX,n=r/this._pixelToTileZ*1.425,t=[a,n];ae(t,t,[0,0],45*Math.PI/180),this.x-=t[0],this.z-=t[1],U(this.cameraMatrix,this.cameraMatrix,[t[0],0,t[1]])}setPixelToTileRatio(i,r){this._pixelToTileX=i,this._pixelToTileZ=r}update(i){let r=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*r)*Math.sign(this._velocityX)*10*r,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*r)*Math.sign(this._velocityY)*10*r,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,r]){this._inFocusMode=!0;const a=Date.now(),n=()=>{let t=(Date.now()-a)/1e3;t>1&&(t=1);const d=-this.x*(1-t)+(-i*2+innerWidth/200)*t,s=-this.z*(1-t)+(-r*2+innerHeight/200)*t,h=1;this.cameraMatrix=R(),U(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),H(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),k(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),re(this.cameraMatrix,this.cameraMatrix,[h,h,h]),U(this.cameraMatrix,this.cameraMatrix,[d,0,s]),t<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=R(),U(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),H(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),k(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),U(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function ut(){return new Worker("/taptown/assets/ambient.84990750.js",{type:"module"})}function ht(){return new Worker("/taptown/assets/buildings.42aece7c.js",{type:"module"})}function lt(){return new Worker("/taptown/assets/people.93116d62.js",{type:"module"})}let ue,L,g;const D=new MessageChannel,W=new MessageChannel,N=new MessageChannel,j=new MessageChannel;async function mt(){const e=$(new ut);e.log();const i=$(new ht);i.log();const r=$(new lt);return r.log(),ue=await new e(v(N.port1,[N.port1]),v(j.port2,[j.port2])),L=await new i(v(D.port1,[D.port1]),v(W.port2,[W.port2])),g=await new r(v(W.port1,[W.port1]),v(D.port2,[D.port2]),v(j.port1,[j.port1]),v(N.port2,[N.port2])),{ambient:ue,buildings:L,people:g}}var ft=`.close-button {
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

.tile-menu {
  position: absolute;
  background: #555;
  z-index: 2;
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
}`,q=globalThis&&globalThis.__decorate||function(e,i,r,a){var n=arguments.length,t=n<3?i:a===null?a=Object.getOwnPropertyDescriptor(i,r):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,i,r,a);else for(var s=e.length-1;s>=0;s--)(d=e[s])&&(t=(n<3?d(t):n>3?d(i,r,t):d(i,r))||t);return n>3&&t&&Object.defineProperty(i,r,t),t};let C=class extends Se{close(){this.remove()}render(){return Ve`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{L.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button @click=${()=>{L.setTile(this.x,this.z,255),this.close()}}>Build Cafe</button>
        </div>
      </div>
    `}};C.styles=Pe([ft]);q([oe()],C.prototype,"x",void 0);q([oe()],C.prototype,"z",void 0);C=q([Xe("tt-tile")],C);const Tt=document.querySelector(".money"),xt=document.querySelector(".population");function Et(e){Tt.textContent=`$${e.money}`,xt.textContent=`${e.population}`}function pt(e,i){const r=document.createElement("tt-tile");r.x=e,r.z=i,document.body.appendChild(r)}var bt=`attribute vec4 aVertexPosition;
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
}`;let he,K;function Rt(e){he=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",he);const i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,bt),e.compileShader(i);const r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,wt),e.compileShader(r),!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;if(!e.getShaderParameter(r,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null;const a=e.createProgram();if(e.attachShader(a,i),e.attachShader(a,r),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(a)),null;K={program:a,attribLocations:{vertexPosition:e.getAttribLocation(a,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(a,"aTextureCoord"),normalPosition:e.getAttribLocation(a,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(a,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(a,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(a,"uNormalMatrix"),texture:e.getUniformLocation(a,"uTexture"),highlight:e.getUniformLocation(a,"uHighlight")}}}function Ft(e,i,r){Rt(e);const a=e.createFramebuffer(),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,i,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,i,r,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,t,0);const d=e.checkFramebufferStatus(e.FRAMEBUFFER);return d!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+d.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),a}function Mt(e,i,{camera:r,buildingsPerRow:a,buildingsPerColumn:n,map:t,mapSize:d}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,h=.1,c=100,f=R();ne(f,0,a,0,a*s,h,c);const T=Math.floor(r.x/2)-1,x=Math.floor(r.z/2)-5,E=R();De(E,[r.x-10,2,r.z-13],[r.x,0,r.z],[0,1,0]);for(let m=x;m<x+n*2;m++){let Z=m*d;for(let p=T;p<T+a*2;p++){let P=Z+p;!(p>=d)&&!(p<0)&&!(m<0)&&!(m>=d)?V(e,t[P],[p,m],K,f,E):V(e,254,[p,m],K,f,E)}}}const M=document.getElementsByTagName("canvas")[0];let _=2*(innerWidth/200),y=2*(innerHeight/200),Q,A,F=new dt,B=[-100,-100];window.camera=F;M.width=innerWidth*devicePixelRatio;M.height=innerHeight*devicePixelRatio;let ee=innerWidth/_,Ut=innerHeight/y;F.setPixelToTileRatio(ee,Ut);let o=M.getContext("webgl");window.addEventListener("resize",()=>{M.width=innerWidth*devicePixelRatio,M.height=innerHeight*devicePixelRatio,o.viewport(0,0,M.width,M.height),_=2*(innerWidth/200),y=2*(innerHeight/200);let e=innerWidth/_,i=innerHeight/y;F.setPixelToTileRatio(e,i)});M.addEventListener("mousemove",e=>{const i=e.clientX/ee/2,r=(e.clientY-window.innerHeight)/ee/2*1.425,a=[i,r];ae(a,a,[0,0],45*Math.PI/180);const n=[F.x/2,F.z/2+1];We(a,a,n),Ne(a,a),B=a});M.addEventListener("click",e=>{B[1]*A+B[0],pt(B[0],B[1])});vt();async function vt(){await mt(),await L.setCallback(se(c=>{Q=c,A=Math.sqrt(Q.length)})),await g.setCallback(se(c=>{Et(c)}));const i=new URLSearchParams(location.search).get("save");i||(alert("Save not provided."),location.replace("../"));const r=await L.loadSave(i);r||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${i} \u2022 TapTown!`,console.log(r);const a=o.createShader(o.VERTEX_SHADER);o.shaderSource(a,je),o.compileShader(a);const n=o.createShader(o.FRAGMENT_SHADER);if(o.shaderSource(n,Qe),o.compileShader(n),!o.getShaderParameter(a,o.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+o.getShaderInfoLog(a)),o.deleteShader(a),null;if(!o.getShaderParameter(n,o.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+o.getShaderInfoLog(n)),o.deleteShader(n),null;const t=o.createProgram();if(o.attachShader(t,a),o.attachShader(t,n),o.linkProgram(t),!o.getProgramParameter(t,o.LINK_STATUS))return alert("Unable to initialize the shader program: "+o.getProgramInfoLog(t)),null;const d=Ft(o,innerWidth,innerHeight),s={program:t,frameBuffer:d,attribLocations:{vertexPosition:o.getAttribLocation(t,"aVertexPosition"),textureCoordPosition:o.getAttribLocation(t,"aTextureCoord"),normalPosition:o.getAttribLocation(t,"aNormal")},uniformLocations:{projectionMatrix:o.getUniformLocation(t,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(t,"uModelViewMatrix"),normalMatrix:o.getUniformLocation(t,"uNormalMatrix"),texture:o.getUniformLocation(t,"uTexture"),highlight:o.getUniformLocation(t,"uHighlight")}};await ct(o);const h=c=>{Mt(o,d,{camera:F,buildingsPerRow:_,buildingsPerColumn:y,map:Q,mapSize:A}),It(s),requestAnimationFrame(h)};requestAnimationFrame(h)}function It(e){o.clearColor(0,0,0,1),o.clearDepth(1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);const i=o.canvas.clientHeight/o.canvas.clientWidth,r=.1,a=100,n=R();ne(n,0,_,0,_*i,r,a);const t=Math.floor(F.x/2)-1,d=Math.floor(F.z/2)-5;for(let s=d;s<d+y*2;s++){let h=s*A;for(let c=t;c<t+_*2;c++){let f=h+c;c===B[0]&&s===B[1]?o.uniform1i(e.uniformLocations.highlight,1):o.uniform1i(e.uniformLocations.highlight,0),!(c>=A)&&!(c<0)&&!(s<0)&&!(s>=A)?V(o,Q[f],[c,s],e,n,F.cameraMatrix):V(o,254,[c,s],e,n,F.cameraMatrix)}}}

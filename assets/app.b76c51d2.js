import"./modulepreload-polyfill.b7f2da20.js";import{c as F,s as q,f as pe,m as Ue,t as M,a as Me,i as ve,b as Ie,r as O,d as J,e as g,g as _e,h as K,n as Be,j as Le,$ as Ae,o as ee,l as Ce,k as ye,p as Pe,w as Y,q as te}from"./vendor.07b4962f.js";var Xe=`attribute vec4 aVertexPosition;
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

`,Se=`varying highp vec2 vTextureCoord;
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
  
}`;function Ve(e,i){return new Promise((r,o)=>{const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const t=new Image;t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),ie(t.width)&&ie(t.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),r(n)},t.src=i})}function ie(e){return(e&e-1)==0}function l(e,i){return new Promise(async(r,o)=>{const t=await(await fetch(i)).json(),d=t.scenes[t.scene],c=await(await fetch(t.buffers[0].uri)).blob();let u=[...d.nodes],m=0,x=[],f=[],E=[],T=[];for(;m<u.length;){let ne=f.length/3;const w=t.nodes[u[m]];if(w.children&&u.push(...w.children),w.mesh!==void 0){let v=F();if(w.scale&&q(v,v,w.scale),w.rotation){const R=F();pe(R,w.rotation),Ue(v,v,R)}w.translation&&M(v,v,w.translation);const y=t.meshes[w.mesh].primitives[0],se=y.indices,ce=t.accessors[se],N=t.bufferViews[ce.bufferView],de=c.slice(N.byteOffset,N.byteOffset+N.byteLength),ue=new Int16Array(await de.arrayBuffer());x.push(...ue.map(R=>R+ne));const he=y.attributes.POSITION,le=t.accessors[he],W=t.bufferViews[le.bufferView],me=c.slice(W.byteOffset,W.byteOffset+W.byteLength),P=new Float32Array(await me.arrayBuffer());for(let R=0;R<P.length;R+=3){let Z=[P[R],P[R+1],P[R+2]];Me(Z,Z,v),f.push(...Z)}const fe=y.attributes.NORMAL,Te=t.accessors[fe],j=t.bufferViews[Te.bufferView],xe=c.slice(j.byteOffset,j.byteOffset+j.byteLength),Ee=new Float32Array(await xe.arrayBuffer());E.push(...Ee);const be=y.attributes.TEXCOORD_0,we=t.accessors[be],Q=t.bufferViews[we.bufferView],Re=c.slice(Q.byteOffset,Q.byteOffset+Q.byteLength),Fe=new Float32Array(await Re.arrayBuffer());T.push(...Fe)}m++}const D=await Ve(e,t.images[0].uri),b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array(f),e.STATIC_DRAW);const C=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,C),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(x),e.STATIC_DRAW);const k=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,k),e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);const $=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,$),e.bufferData(e.ARRAY_BUFFER,new Float32Array(E),e.STATIC_DRAW),r({buffers:{index:C,vertex:b,texCoords:k,normal:$},indexCount:x.length,texture:D})})}var De="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Ne="/taptown/assets/Road-x.25087994.gltf",We="/taptown/assets/Road-right.05535041.gltf",je="/taptown/assets/Road-left.e4d57c46.gltf",Qe="/taptown/assets/Road-y.43b84893.gltf",Ze="/taptown/assets/Road-up.f33fbfbe.gltf",Oe="/taptown/assets/Road-down.3aa34828.gltf",Je="/taptown/assets/Road-cross.c0149426.gltf",Ye="/taptown/assets/Road-upleft.8e8e8992.gltf",Ge="/taptown/assets/Road-leftdown.43e4587d.gltf",ze="/taptown/assets/Road-downright.2ee19715.gltf",He="/taptown/assets/Road-rightup.f9b3a2d6.gltf",ke="/taptown/assets/Road-T.dd27be2f.gltf",$e="/taptown/assets/Road-l-.8fa437e2.gltf",qe="/taptown/assets/Road--l.cec3388c.gltf",ge="/taptown/assets/Road-_l_.04dac8e2.gltf",Ke="/taptown/assets/Road-single.f2299542.gltf",et="/taptown/assets/outofbounds.8b7ad541.gltf",tt="/taptown/assets/Cafe.5a05628e.gltf";const h=[null];let re=!1;async function it(e){h[0]=await l(e,De),h[1]=await l(e,Ne),h[2]=await l(e,We),h[3]=await l(e,je),h[4]=await l(e,Qe),h[5]=await l(e,Ze),h[6]=await l(e,Oe),h[7]=await l(e,Je),h[8]=await l(e,Ye),h[9]=await l(e,Ge),h[10]=await l(e,ze),h[11]=await l(e,He),h[12]=await l(e,ke),h[13]=await l(e,$e),h[14]=await l(e,qe),h[15]=await l(e,ge),h[16]=await l(e,Ke),h[254]=await l(e,et),h[255]=await l(e,tt),re=!0}function X(e,i,[r,o],n,t,d){if(!re)throw"Models aren't loaded!";const s=h[i];if(!s)return;const c=F();M(c,d,[r*2,0,o*2]);{const m=3,x=e.FLOAT,f=!1,E=0,T=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(n.attribLocations.vertexPosition,m,x,f,E,T),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const m=3,x=e.FLOAT,f=!1,E=0,T=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(n.attribLocations.normalPosition,m,x,f,E,T),e.enableVertexAttribArray(n.attribLocations.normalPosition)}{const m=2,x=e.FLOAT,f=!1,E=0,T=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(n.attribLocations.textureCoordPosition,m,x,f,E,T),e.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,t),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,c);const u=F();ve(u,c),Ie(u,u),e.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,u),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(n.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}class rt{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=F(),M(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),O(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),J(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,r){if(this._inFocusMode)return;const o=i/this._pixelToTileX,n=r/this._pixelToTileZ*1.425,t=[o,n];g(t,t,[0,0],45*Math.PI/180),this.x-=t[0],this.z-=t[1],M(this.cameraMatrix,this.cameraMatrix,[t[0],0,t[1]])}setPixelToTileRatio(i,r){this._pixelToTileX=i,this._pixelToTileZ=r}update(i){let r=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*r)*Math.sign(this._velocityX)*10*r,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*r)*Math.sign(this._velocityY)*10*r,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,r]){this._inFocusMode=!0;const o=Date.now(),n=()=>{let t=(Date.now()-o)/1e3;t>1&&(t=1);const d=-this.x*(1-t)+(-i*2+innerWidth/200)*t,s=-this.z*(1-t)+(-r*2+innerHeight/200)*t,c=1;this.cameraMatrix=F(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),O(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),J(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),q(this.cameraMatrix,this.cameraMatrix,[c,c,c]),M(this.cameraMatrix,this.cameraMatrix,[d,0,s]),t<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=F(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),O(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),J(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),M(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}var at=`.close-button {
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
}`,G=globalThis&&globalThis.__decorate||function(e,i,r,o){var n=arguments.length,t=n<3?i:o===null?o=Object.getOwnPropertyDescriptor(i,r):o,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,i,r,o);else for(var s=e.length-1;s>=0;s--)(d=e[s])&&(t=(n<3?d(t):n>3?d(i,r,t):d(i,r))||t);return n>3&&t&&Object.defineProperty(i,r,t),t};let L=class extends Le{close(){this.remove()}render(){return Ae`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{console.log("building road"),window.dispatchEvent(new CustomEvent("tt-buildroad",{detail:{x:this.x,z:this.z}})),this.close()}}>Build Road</button>
          <button>Build Cafe</button>
        </div>
      </div>
    `}};L.styles=_e([at]);G([K()],L.prototype,"x",void 0);G([K()],L.prototype,"z",void 0);L=G([Be("tt-tile")],L);const ot=document.querySelector(".money"),nt=document.querySelector(".population");function st(e){ot.textContent=`$${e.money}`,nt.textContent=`${e.population}`}function ct(e,i){const r=document.createElement("tt-tile");r.x=e,r.z=i,document.body.appendChild(r)}var dt=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`,ut=`void main(void) {
  gl_FragColor = vec4(1, 1, 1, 1);
}`;let ae,z;function ht(e){ae=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",ae);const i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,dt),e.compileShader(i);const r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,ut),e.compileShader(r),!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;if(!e.getShaderParameter(r,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null;const o=e.createProgram();if(e.attachShader(o,i),e.attachShader(o,r),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(o)),null;z={program:o,attribLocations:{vertexPosition:e.getAttribLocation(o,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(o,"aTextureCoord"),normalPosition:e.getAttribLocation(o,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(o,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(o,"uNormalMatrix"),texture:e.getUniformLocation(o,"uTexture"),highlight:e.getUniformLocation(o,"uHighlight")}}}function lt(e,i,r){ht(e);const o=e.createFramebuffer(),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,i,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,i,r,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,t,0);const d=e.checkFramebufferStatus(e.FRAMEBUFFER);return d!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+d.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),o}function mt(e,i,{camera:r,buildingsPerRow:o,buildingsPerColumn:n,map:t,mapSize:d}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,c=.1,u=100,m=F();ee(m,0,o,0,o*s,c,u);const x=Math.floor(r.x/2)-1,f=Math.floor(r.z/2)-5,E=F();Ce(E,[r.x-10,2,r.z-13],[r.x,0,r.z],[0,1,0]);for(let T=f;T<f+n*2;T++){let D=T*d;for(let b=x;b<x+o*2;b++){let C=D+b;!(b>=d)&&!(b<0)&&!(T<0)&&!(T>=d)?X(e,t[C],[b,T],z,m,E):X(e,254,[b,T],z,m,E)}}}function ft(){return new Worker("/taptown/assets/ambient.6d469442.js",{type:"module"})}function Tt(){return new Worker("/taptown/assets/buildings.9671986a.js",{type:"module"})}function xt(){return new Worker("/taptown/assets/people.f51a4310.js",{type:"module"})}let S,oe;const U=document.getElementsByTagName("canvas")[0];let I=2*(innerWidth/200),A=2*(innerHeight/200),V,B,p=new rt,_=[-100,-100];window.camera=p;U.width=innerWidth*devicePixelRatio;U.height=innerHeight*devicePixelRatio;let H=innerWidth/I,Et=innerHeight/A;p.setPixelToTileRatio(H,Et);let a=U.getContext("webgl");window.addEventListener("resize",()=>{U.width=innerWidth*devicePixelRatio,U.height=innerHeight*devicePixelRatio,a.viewport(0,0,U.width,U.height),I=2*(innerWidth/200),A=2*(innerHeight/200);let e=innerWidth/I,i=innerHeight/A;p.setPixelToTileRatio(e,i)});U.addEventListener("mousemove",e=>{const i=e.clientX/H/2,r=(e.clientY-window.innerHeight)/H/2*1.425,o=[i,r];g(o,o,[0,0],45*Math.PI/180);const n=[p.x/2,p.z/2+1];ye(o,o,n),Pe(o,o),_=o});U.addEventListener("click",e=>{_[1]*B+_[0],ct(_[0],_[1])});window.addEventListener("tt-buildroad",e=>{S.buildRoad(e.detail.x,e.detail.z)});bt();async function bt(){const e=Y(new ft);e.log();const i=Y(new Tt);i.log();const r=Y(new xt);r.log(),await new e,S=await new i,await S.setCallback(te(f=>{console.log("recieved new map"),V=f,B=Math.sqrt(V.length)})),oe=await new r,await oe.setCallback(te(f=>{st(f)}));const n=new URLSearchParams(location.search).get("save");n||(alert("Save not provided."),location.replace("../"));const t=await S.loadSave(n);t||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${n} \u2022 TapTown!`,console.log(t);const d=a.createShader(a.VERTEX_SHADER);a.shaderSource(d,Xe),a.compileShader(d);const s=a.createShader(a.FRAGMENT_SHADER);if(a.shaderSource(s,Se),a.compileShader(s),!a.getShaderParameter(d,a.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+a.getShaderInfoLog(d)),a.deleteShader(d),null;if(!a.getShaderParameter(s,a.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+a.getShaderInfoLog(s)),a.deleteShader(s),null;const c=a.createProgram();if(a.attachShader(c,d),a.attachShader(c,s),a.linkProgram(c),!a.getProgramParameter(c,a.LINK_STATUS))return alert("Unable to initialize the shader program: "+a.getProgramInfoLog(c)),null;const u=lt(a,innerWidth,innerHeight),m={program:c,frameBuffer:u,attribLocations:{vertexPosition:a.getAttribLocation(c,"aVertexPosition"),textureCoordPosition:a.getAttribLocation(c,"aTextureCoord"),normalPosition:a.getAttribLocation(c,"aNormal")},uniformLocations:{projectionMatrix:a.getUniformLocation(c,"uProjectionMatrix"),modelViewMatrix:a.getUniformLocation(c,"uModelViewMatrix"),normalMatrix:a.getUniformLocation(c,"uNormalMatrix"),texture:a.getUniformLocation(c,"uTexture"),highlight:a.getUniformLocation(c,"uHighlight")}};await it(a);const x=f=>{mt(a,u,{camera:p,buildingsPerRow:I,buildingsPerColumn:A,map:V,mapSize:B}),wt(m),requestAnimationFrame(x)};requestAnimationFrame(x)}function wt(e){a.clearColor(0,0,0,1),a.clearDepth(1),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);const i=a.canvas.clientHeight/a.canvas.clientWidth,r=.1,o=100,n=F();ee(n,0,I,0,I*i,r,o);const t=Math.floor(p.x/2)-1,d=Math.floor(p.z/2)-5;for(let s=d;s<d+A*2;s++){let c=s*B;for(let u=t;u<t+I*2;u++){let m=c+u;u===_[0]&&s===_[1]?a.uniform1i(e.uniformLocations.highlight,1):a.uniform1i(e.uniformLocations.highlight,0),!(u>=B)&&!(u<0)&&!(s<0)&&!(s>=B)?X(a,V[m],[u,s],e,n,p.cameraMatrix):X(a,254,[u,s],e,n,p.cameraMatrix)}}}

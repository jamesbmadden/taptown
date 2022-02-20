import"./modulepreload-polyfill.b7f2da20.js";import{c as F,s as g,f as Ue,m as Me,t as M,a as ve,i as Ie,b as _e,r as O,d as J,e as K,w as Y,g as Be,h as ee,n as Le,j as Ae,$ as Ce,o as te,l as ye,k as Pe,p as Xe,q as ie}from"./vendor.07b4962f.js";var Se=`attribute vec4 aVertexPosition;
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

`,Ve=`varying highp vec2 vTextureCoord;
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
  
}`;function De(e,i){return new Promise((r,a)=>{const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const t=new Image;t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),re(t.width)&&re(t.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),r(n)},t.src=i})}function re(e){return(e&e-1)==0}function m(e,i){return new Promise(async(r,a)=>{const t=await(await fetch(i)).json(),d=t.scenes[t.scene],h=await(await fetch(t.buffers[0].uri)).blob();let c=[...d.nodes],f=0,T=[],x=[],E=[],l=[];for(;f<c.length;){let se=x.length/3;const R=t.nodes[c[f]];if(R.children&&c.push(...R.children),R.mesh!==void 0){let v=F();if(R.scale&&g(v,v,R.scale),R.rotation){const w=F();Ue(w,R.rotation),Me(v,v,w)}R.translation&&M(v,v,R.translation);const P=t.meshes[R.mesh].primitives[0],ce=P.indices,de=t.accessors[ce],W=t.bufferViews[de.bufferView],ue=h.slice(W.byteOffset,W.byteOffset+W.byteLength),he=new Int16Array(await ue.arrayBuffer());T.push(...he.map(w=>w+se));const me=P.attributes.POSITION,le=t.accessors[me],N=t.bufferViews[le.bufferView],fe=h.slice(N.byteOffset,N.byteOffset+N.byteLength),X=new Float32Array(await fe.arrayBuffer());for(let w=0;w<X.length;w+=3){let Z=[X[w],X[w+1],X[w+2]];ve(Z,Z,v),x.push(...Z)}const Te=P.attributes.NORMAL,xe=t.accessors[Te],j=t.bufferViews[xe.bufferView],Ee=h.slice(j.byteOffset,j.byteOffset+j.byteLength),be=new Float32Array(await Ee.arrayBuffer());E.push(...be);const Re=P.attributes.TEXCOORD_0,we=t.accessors[Re],Q=t.bufferViews[we.bufferView],Fe=h.slice(Q.byteOffset,Q.byteOffset+Q.byteLength),pe=new Float32Array(await Fe.arrayBuffer());l.push(...pe)}f++}const D=await De(e,t.images[0].uri),b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array(x),e.STATIC_DRAW);const y=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,y),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(T),e.STATIC_DRAW);const $=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,$),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW);const q=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,q),e.bufferData(e.ARRAY_BUFFER,new Float32Array(E),e.STATIC_DRAW),r({buffers:{index:y,vertex:b,texCoords:$,normal:q},indexCount:T.length,texture:D})})}var We="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Ne="/taptown/assets/Road-x.25087994.gltf",je="/taptown/assets/Road-right.05535041.gltf",Qe="/taptown/assets/Road-left.e4d57c46.gltf",Ze="/taptown/assets/Road-y.43b84893.gltf",Oe="/taptown/assets/Road-up.f33fbfbe.gltf",Je="/taptown/assets/Road-down.3aa34828.gltf",Ye="/taptown/assets/Road-cross.c0149426.gltf",Ge="/taptown/assets/Road-upleft.8e8e8992.gltf",ze="/taptown/assets/Road-leftdown.43e4587d.gltf",He="/taptown/assets/Road-downright.2ee19715.gltf",ke="/taptown/assets/Road-rightup.f9b3a2d6.gltf",$e="/taptown/assets/Road-T.dd27be2f.gltf",qe="/taptown/assets/Road-l-.8fa437e2.gltf",ge="/taptown/assets/Road--l.cec3388c.gltf",Ke="/taptown/assets/Road-_l_.04dac8e2.gltf",et="/taptown/assets/Road-single.f2299542.gltf",tt="/taptown/assets/outofbounds.8b7ad541.gltf",it="/taptown/assets/Cafe.5a05628e.gltf";const u=[null];let ae=!1;async function rt(e){u[0]=await m(e,We),u[1]=await m(e,Ne),u[2]=await m(e,je),u[3]=await m(e,Qe),u[4]=await m(e,Ze),u[5]=await m(e,Oe),u[6]=await m(e,Je),u[7]=await m(e,Ye),u[8]=await m(e,Ge),u[9]=await m(e,ze),u[10]=await m(e,He),u[11]=await m(e,ke),u[12]=await m(e,$e),u[13]=await m(e,qe),u[14]=await m(e,ge),u[15]=await m(e,Ke),u[16]=await m(e,et),u[254]=await m(e,tt),u[255]=await m(e,it),ae=!0}function S(e,i,[r,a],n,t,d){if(!ae)throw"Models aren't loaded!";const s=u[i];if(!s)return;const h=F();M(h,d,[r*2,0,a*2]);{const f=3,T=e.FLOAT,x=!1,E=0,l=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(n.attribLocations.vertexPosition,f,T,x,E,l),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const f=3,T=e.FLOAT,x=!1,E=0,l=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(n.attribLocations.normalPosition,f,T,x,E,l),e.enableVertexAttribArray(n.attribLocations.normalPosition)}{const f=2,T=e.FLOAT,x=!1,E=0,l=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(n.attribLocations.textureCoordPosition,f,T,x,E,l),e.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,t),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,h);const c=F();Ie(c,h),_e(c,c),e.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,c),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(n.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}class at{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=F(),M(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),O(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),J(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,r){if(this._inFocusMode)return;const a=i/this._pixelToTileX,n=r/this._pixelToTileZ*1.425,t=[a,n];K(t,t,[0,0],45*Math.PI/180),this.x-=t[0],this.z-=t[1],M(this.cameraMatrix,this.cameraMatrix,[t[0],0,t[1]])}setPixelToTileRatio(i,r){this._pixelToTileX=i,this._pixelToTileZ=r}update(i){let r=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*r)*Math.sign(this._velocityX)*10*r,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*r)*Math.sign(this._velocityY)*10*r,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,r]){this._inFocusMode=!0;const a=Date.now(),n=()=>{let t=(Date.now()-a)/1e3;t>1&&(t=1);const d=-this.x*(1-t)+(-i*2+innerWidth/200)*t,s=-this.z*(1-t)+(-r*2+innerHeight/200)*t,h=1;this.cameraMatrix=F(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),O(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),J(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),g(this.cameraMatrix,this.cameraMatrix,[h,h,h]),M(this.cameraMatrix,this.cameraMatrix,[d,0,s]),t<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=F(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),O(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),J(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),M(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function ot(){return new Worker("/taptown/assets/ambient.6d469442.js",{type:"module"})}function nt(){return new Worker("/taptown/assets/buildings.9671986a.js",{type:"module"})}function st(){return new Worker("/taptown/assets/people.f51a4310.js",{type:"module"})}let oe,B,G;async function ct(){const e=Y(new ot);e.log();const i=Y(new nt);i.log();const r=Y(new st);return r.log(),oe=await new e,B=await new i,G=await new r,{ambient:oe,buildings:B,people:G}}var dt=`.close-button {
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
}`,z=globalThis&&globalThis.__decorate||function(e,i,r,a){var n=arguments.length,t=n<3?i:a===null?a=Object.getOwnPropertyDescriptor(i,r):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,i,r,a);else for(var s=e.length-1;s>=0;s--)(d=e[s])&&(t=(n<3?d(t):n>3?d(i,r,t):d(i,r))||t);return n>3&&t&&Object.defineProperty(i,r,t),t};let A=class extends Ae{close(){this.remove()}render(){return Ce`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{B.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button @click=${()=>{B.setTile(this.x,this.z,255),this.close()}}>Build Cafe</button>
        </div>
      </div>
    `}};A.styles=Be([dt]);z([ee()],A.prototype,"x",void 0);z([ee()],A.prototype,"z",void 0);A=z([Le("tt-tile")],A);const ut=document.querySelector(".money"),ht=document.querySelector(".population");function mt(e){ut.textContent=`$${e.money}`,ht.textContent=`${e.population}`}function lt(e,i){const r=document.createElement("tt-tile");r.x=e,r.z=i,document.body.appendChild(r)}var ft=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`,Tt=`void main(void) {
  gl_FragColor = vec4(1, 1, 1, 1);
}`;let ne,H;function xt(e){ne=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",ne);const i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,ft),e.compileShader(i);const r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,Tt),e.compileShader(r),!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;if(!e.getShaderParameter(r,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null;const a=e.createProgram();if(e.attachShader(a,i),e.attachShader(a,r),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(a)),null;H={program:a,attribLocations:{vertexPosition:e.getAttribLocation(a,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(a,"aTextureCoord"),normalPosition:e.getAttribLocation(a,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(a,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(a,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(a,"uNormalMatrix"),texture:e.getUniformLocation(a,"uTexture"),highlight:e.getUniformLocation(a,"uHighlight")}}}function Et(e,i,r){xt(e);const a=e.createFramebuffer(),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,i,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,i,r,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,t,0);const d=e.checkFramebufferStatus(e.FRAMEBUFFER);return d!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+d.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),a}function bt(e,i,{camera:r,buildingsPerRow:a,buildingsPerColumn:n,map:t,mapSize:d}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,h=.1,c=100,f=F();te(f,0,a,0,a*s,h,c);const T=Math.floor(r.x/2)-1,x=Math.floor(r.z/2)-5,E=F();ye(E,[r.x-10,2,r.z-13],[r.x,0,r.z],[0,1,0]);for(let l=x;l<x+n*2;l++){let D=l*d;for(let b=T;b<T+a*2;b++){let y=D+b;!(b>=d)&&!(b<0)&&!(l<0)&&!(l>=d)?S(e,t[y],[b,l],H,f,E):S(e,254,[b,l],H,f,E)}}}const U=document.getElementsByTagName("canvas")[0];let I=2*(innerWidth/200),C=2*(innerHeight/200),V,L,p=new at,_=[-100,-100];window.camera=p;U.width=innerWidth*devicePixelRatio;U.height=innerHeight*devicePixelRatio;let k=innerWidth/I,Rt=innerHeight/C;p.setPixelToTileRatio(k,Rt);let o=U.getContext("webgl");window.addEventListener("resize",()=>{U.width=innerWidth*devicePixelRatio,U.height=innerHeight*devicePixelRatio,o.viewport(0,0,U.width,U.height),I=2*(innerWidth/200),C=2*(innerHeight/200);let e=innerWidth/I,i=innerHeight/C;p.setPixelToTileRatio(e,i)});U.addEventListener("mousemove",e=>{const i=e.clientX/k/2,r=(e.clientY-window.innerHeight)/k/2*1.425,a=[i,r];K(a,a,[0,0],45*Math.PI/180);const n=[p.x/2,p.z/2+1];Pe(a,a,n),Xe(a,a),_=a});U.addEventListener("click",e=>{_[1]*L+_[0],lt(_[0],_[1])});wt();async function wt(){await ct(),await B.setCallback(ie(c=>{console.log("recieved new map"),V=c,L=Math.sqrt(V.length)})),await G.setCallback(ie(c=>{mt(c)}));const i=new URLSearchParams(location.search).get("save");i||(alert("Save not provided."),location.replace("../"));const r=await B.loadSave(i);r||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${i} \u2022 TapTown!`,console.log(r);const a=o.createShader(o.VERTEX_SHADER);o.shaderSource(a,Se),o.compileShader(a);const n=o.createShader(o.FRAGMENT_SHADER);if(o.shaderSource(n,Ve),o.compileShader(n),!o.getShaderParameter(a,o.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+o.getShaderInfoLog(a)),o.deleteShader(a),null;if(!o.getShaderParameter(n,o.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+o.getShaderInfoLog(n)),o.deleteShader(n),null;const t=o.createProgram();if(o.attachShader(t,a),o.attachShader(t,n),o.linkProgram(t),!o.getProgramParameter(t,o.LINK_STATUS))return alert("Unable to initialize the shader program: "+o.getProgramInfoLog(t)),null;const d=Et(o,innerWidth,innerHeight),s={program:t,frameBuffer:d,attribLocations:{vertexPosition:o.getAttribLocation(t,"aVertexPosition"),textureCoordPosition:o.getAttribLocation(t,"aTextureCoord"),normalPosition:o.getAttribLocation(t,"aNormal")},uniformLocations:{projectionMatrix:o.getUniformLocation(t,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(t,"uModelViewMatrix"),normalMatrix:o.getUniformLocation(t,"uNormalMatrix"),texture:o.getUniformLocation(t,"uTexture"),highlight:o.getUniformLocation(t,"uHighlight")}};await rt(o);const h=c=>{bt(o,d,{camera:p,buildingsPerRow:I,buildingsPerColumn:C,map:V,mapSize:L}),Ft(s),requestAnimationFrame(h)};requestAnimationFrame(h)}function Ft(e){o.clearColor(0,0,0,1),o.clearDepth(1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);const i=o.canvas.clientHeight/o.canvas.clientWidth,r=.1,a=100,n=F();te(n,0,I,0,I*i,r,a);const t=Math.floor(p.x/2)-1,d=Math.floor(p.z/2)-5;for(let s=d;s<d+C*2;s++){let h=s*L;for(let c=t;c<t+I*2;c++){let f=h+c;c===_[0]&&s===_[1]?o.uniform1i(e.uniformLocations.highlight,1):o.uniform1i(e.uniformLocations.highlight,0),!(c>=L)&&!(c<0)&&!(s<0)&&!(s>=L)?S(o,V[f],[c,s],e,n,p.cameraMatrix):S(o,254,[c,s],e,n,p.cameraMatrix)}}}

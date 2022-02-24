import"./modulepreload-polyfill.b7f2da20.js";import{c as p,s as te,f as Ie,m as _e,t as U,a as Be,i as Le,b as Ae,r as G,d as z,e as ie,w as H,g as S,h as Ce,j as re,n as ye,k as Pe,$ as Xe,o as ae,l as Se,p as Ve,q as De,u as oe}from"./vendor.fcf43544.js";var We=`attribute vec4 aVertexPosition;
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

`,Ne=`varying highp vec2 vTextureCoord;
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
  
}`;function je(e,i){return new Promise((r,a)=>{const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const t=new Image;t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),ne(t.width)&&ne(t.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),r(n)},t.src=i})}function ne(e){return(e&e-1)==0}function l(e,i){return new Promise(async(r,a)=>{const t=await(await fetch(i)).json(),d=t.scenes[t.scene],h=await(await fetch(t.buffers[0].uri)).blob();let c=[...d.nodes],f=0,T=[],x=[],E=[],m=[];for(;f<c.length;){let ue=x.length/3;const R=t.nodes[c[f]];if(R.children&&c.push(...R.children),R.mesh!==void 0){let v=p();if(R.scale&&te(v,v,R.scale),R.rotation){const w=p();Ie(w,R.rotation),_e(v,v,w)}R.translation&&U(v,v,R.translation);const P=t.meshes[R.mesh].primitives[0],he=P.indices,le=t.accessors[he],Q=t.bufferViews[le.bufferView],me=h.slice(Q.byteOffset,Q.byteOffset+Q.byteLength),fe=new Int16Array(await me.arrayBuffer());T.push(...fe.map(w=>w+ue));const Te=P.attributes.POSITION,xe=t.accessors[Te],Z=t.bufferViews[xe.bufferView],Ee=h.slice(Z.byteOffset,Z.byteOffset+Z.byteLength),X=new Float32Array(await Ee.arrayBuffer());for(let w=0;w<X.length;w+=3){let Y=[X[w],X[w+1],X[w+2]];Be(Y,Y,v),x.push(...Y)}const be=P.attributes.NORMAL,Re=t.accessors[be],O=t.bufferViews[Re.bufferView],we=h.slice(O.byteOffset,O.byteOffset+O.byteLength),pe=new Float32Array(await we.arrayBuffer());E.push(...pe);const Fe=P.attributes.TEXCOORD_0,Me=t.accessors[Fe],J=t.bufferViews[Me.bufferView],Ue=h.slice(J.byteOffset,J.byteOffset+J.byteLength),ve=new Float32Array(await Ue.arrayBuffer());m.push(...ve)}f++}const j=await je(e,t.images[0].uri),b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array(x),e.STATIC_DRAW);const y=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,y),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(T),e.STATIC_DRAW);const K=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,K),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW);const ee=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ee),e.bufferData(e.ARRAY_BUFFER,new Float32Array(E),e.STATIC_DRAW),r({buffers:{index:y,vertex:b,texCoords:K,normal:ee},indexCount:T.length,texture:j})})}var Qe="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Ze="/taptown/assets/Road-x.25087994.gltf",Oe="/taptown/assets/Road-right.05535041.gltf",Je="/taptown/assets/Road-left.e4d57c46.gltf",Ye="/taptown/assets/Road-y.43b84893.gltf",Ge="/taptown/assets/Road-up.f33fbfbe.gltf",ze="/taptown/assets/Road-down.3aa34828.gltf",He="/taptown/assets/Road-cross.c0149426.gltf",ke="/taptown/assets/Road-upleft.8e8e8992.gltf",$e="/taptown/assets/Road-leftdown.43e4587d.gltf",qe="/taptown/assets/Road-downright.2ee19715.gltf",ge="/taptown/assets/Road-rightup.f9b3a2d6.gltf",Ke="/taptown/assets/Road-T.dd27be2f.gltf",et="/taptown/assets/Road-l-.8fa437e2.gltf",tt="/taptown/assets/Road--l.cec3388c.gltf",it="/taptown/assets/Road-_l_.04dac8e2.gltf",rt="/taptown/assets/Road-single.f2299542.gltf",at="/taptown/assets/outofbounds.8b7ad541.gltf",ot="/taptown/assets/Cafe.5a05628e.gltf";const u=[null];let se=!1;async function nt(e){u[0]=await l(e,Qe),u[1]=await l(e,Ze),u[2]=await l(e,Oe),u[3]=await l(e,Je),u[4]=await l(e,Ye),u[5]=await l(e,Ge),u[6]=await l(e,ze),u[7]=await l(e,He),u[8]=await l(e,ke),u[9]=await l(e,$e),u[10]=await l(e,qe),u[11]=await l(e,ge),u[12]=await l(e,Ke),u[13]=await l(e,et),u[14]=await l(e,tt),u[15]=await l(e,it),u[16]=await l(e,rt),u[254]=await l(e,at),u[255]=await l(e,ot),se=!0}function V(e,i,[r,a],n,t,d){if(!se)throw"Models aren't loaded!";const s=u[i];if(!s)return;const h=p();U(h,d,[r*2,0,a*2]);{const f=3,T=e.FLOAT,x=!1,E=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.vertex),e.vertexAttribPointer(n.attribLocations.vertexPosition,f,T,x,E,m),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const f=3,T=e.FLOAT,x=!1,E=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.normal),e.vertexAttribPointer(n.attribLocations.normalPosition,f,T,x,E,m),e.enableVertexAttribArray(n.attribLocations.normalPosition)}{const f=2,T=e.FLOAT,x=!1,E=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.buffers.texCoords),e.vertexAttribPointer(n.attribLocations.textureCoordPosition,f,T,x,E,m),e.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,s.buffers.index),e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,t),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,h);const c=p();Le(c,h),Ae(c,c),e.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,c),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.texture),e.uniform1i(n.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,s.indexCount,e.UNSIGNED_SHORT,0)}class st{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=p(),U(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,r){if(this._inFocusMode)return;const a=i/this._pixelToTileX,n=r/this._pixelToTileZ*1.425,t=[a,n];ie(t,t,[0,0],45*Math.PI/180),this.x-=t[0],this.z-=t[1],U(this.cameraMatrix,this.cameraMatrix,[t[0],0,t[1]])}setPixelToTileRatio(i,r){this._pixelToTileX=i,this._pixelToTileZ=r}update(i){let r=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*r)*Math.sign(this._velocityX)*10*r,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*r)*Math.sign(this._velocityY)*10*r,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,r]){this._inFocusMode=!0;const a=Date.now(),n=()=>{let t=(Date.now()-a)/1e3;t>1&&(t=1);const d=-this.x*(1-t)+(-i*2+innerWidth/200)*t,s=-this.z*(1-t)+(-r*2+innerHeight/200)*t,h=1;this.cameraMatrix=p(),U(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),te(this.cameraMatrix,this.cameraMatrix,[h,h,h]),U(this.cameraMatrix,this.cameraMatrix,[d,0,s]),t<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=p(),U(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),U(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function ct(){return new Worker("/taptown/assets/ambient.e862f4ae.js",{type:"module"})}function dt(){return new Worker("/taptown/assets/buildings.37c80018.js",{type:"module"})}function ut(){return new Worker("/taptown/assets/people.1150475f.js",{type:"module"})}let ce,B,k;const D=new MessageChannel,W=new MessageChannel;async function ht(){const e=H(new ct);e.log();const i=H(new dt);i.log();const r=H(new ut);return r.log(),ce=await new e(S(W.port1,[W.port1])),B=await new i(S(D.port1,[D.port1])),k=await new r(S(D.port2,[D.port2]),S(W.port2,[W.port2])),{ambient:ce,buildings:B,people:k}}var lt=`.close-button {
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
}`,$=globalThis&&globalThis.__decorate||function(e,i,r,a){var n=arguments.length,t=n<3?i:a===null?a=Object.getOwnPropertyDescriptor(i,r):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,i,r,a);else for(var s=e.length-1;s>=0;s--)(d=e[s])&&(t=(n<3?d(t):n>3?d(i,r,t):d(i,r))||t);return n>3&&t&&Object.defineProperty(i,r,t),t};let A=class extends Pe{close(){this.remove()}render(){return Xe`
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
    `}};A.styles=Ce([lt]);$([re()],A.prototype,"x",void 0);$([re()],A.prototype,"z",void 0);A=$([ye("tt-tile")],A);const mt=document.querySelector(".money"),ft=document.querySelector(".population");function Tt(e){mt.textContent=`$${e.money}`,ft.textContent=`${e.population}`}function xt(e,i){const r=document.createElement("tt-tile");r.x=e,r.z=i,document.body.appendChild(r)}var Et=`attribute vec4 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`,bt=`void main(void) {
  gl_FragColor = vec4(1, 1, 1, 1);
}`;let de,q;function Rt(e){de=e.getExtension("WEBGL_depth_texture"),console.log("[WEBGL Depth Texture Extension]",de);const i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,Et),e.compileShader(i);const r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,bt),e.compileShader(r),!e.getShaderParameter(i,e.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null;if(!e.getShaderParameter(r,e.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null;const a=e.createProgram();if(e.attachShader(a,i),e.attachShader(a,r),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))return alert("Unable to initialize the shader program: "+e.getProgramInfoLog(a)),null;q={program:a,attribLocations:{vertexPosition:e.getAttribLocation(a,"aVertexPosition"),textureCoordPosition:e.getAttribLocation(a,"aTextureCoord"),normalPosition:e.getAttribLocation(a,"aNormal")},uniformLocations:{projectionMatrix:e.getUniformLocation(a,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(a,"uModelViewMatrix"),normalMatrix:e.getUniformLocation(a,"uNormalMatrix"),texture:e.getUniformLocation(a,"uTexture"),highlight:e.getUniformLocation(a,"uHighlight")}}}function wt(e,i,r){Rt(e);const a=e.createFramebuffer(),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,i,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,i,r,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,t,0);const d=e.checkFramebufferStatus(e.FRAMEBUFFER);return d!=e.FRAMEBUFFER_COMPLETE&&alert("The frame buffer failed: "+d.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),a}function pt(e,i,{camera:r,buildingsPerRow:a,buildingsPerColumn:n,map:t,mapSize:d}){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const s=e.canvas.clientHeight/e.canvas.clientWidth,h=.1,c=100,f=p();ae(f,0,a,0,a*s,h,c);const T=Math.floor(r.x/2)-1,x=Math.floor(r.z/2)-5,E=p();Se(E,[r.x-10,2,r.z-13],[r.x,0,r.z],[0,1,0]);for(let m=x;m<x+n*2;m++){let j=m*d;for(let b=T;b<T+a*2;b++){let y=j+b;!(b>=d)&&!(b<0)&&!(m<0)&&!(m>=d)?V(e,t[y],[b,m],q,f,E):V(e,254,[b,m],q,f,E)}}}const M=document.getElementsByTagName("canvas")[0];let I=2*(innerWidth/200),C=2*(innerHeight/200),N,L,F=new st,_=[-100,-100];window.camera=F;M.width=innerWidth*devicePixelRatio;M.height=innerHeight*devicePixelRatio;let g=innerWidth/I,Ft=innerHeight/C;F.setPixelToTileRatio(g,Ft);let o=M.getContext("webgl");window.addEventListener("resize",()=>{M.width=innerWidth*devicePixelRatio,M.height=innerHeight*devicePixelRatio,o.viewport(0,0,M.width,M.height),I=2*(innerWidth/200),C=2*(innerHeight/200);let e=innerWidth/I,i=innerHeight/C;F.setPixelToTileRatio(e,i)});M.addEventListener("mousemove",e=>{const i=e.clientX/g/2,r=(e.clientY-window.innerHeight)/g/2*1.425,a=[i,r];ie(a,a,[0,0],45*Math.PI/180);const n=[F.x/2,F.z/2+1];Ve(a,a,n),De(a,a),_=a});M.addEventListener("click",e=>{_[1]*L+_[0],xt(_[0],_[1])});Mt();async function Mt(){await ht(),await B.setCallback(oe(c=>{N=c,L=Math.sqrt(N.length)})),await k.setCallback(oe(c=>{Tt(c)}));const i=new URLSearchParams(location.search).get("save");i||(alert("Save not provided."),location.replace("../"));const r=await B.loadSave(i);r||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${i} \u2022 TapTown!`,console.log(r);const a=o.createShader(o.VERTEX_SHADER);o.shaderSource(a,We),o.compileShader(a);const n=o.createShader(o.FRAGMENT_SHADER);if(o.shaderSource(n,Ne),o.compileShader(n),!o.getShaderParameter(a,o.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+o.getShaderInfoLog(a)),o.deleteShader(a),null;if(!o.getShaderParameter(n,o.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+o.getShaderInfoLog(n)),o.deleteShader(n),null;const t=o.createProgram();if(o.attachShader(t,a),o.attachShader(t,n),o.linkProgram(t),!o.getProgramParameter(t,o.LINK_STATUS))return alert("Unable to initialize the shader program: "+o.getProgramInfoLog(t)),null;const d=wt(o,innerWidth,innerHeight),s={program:t,frameBuffer:d,attribLocations:{vertexPosition:o.getAttribLocation(t,"aVertexPosition"),textureCoordPosition:o.getAttribLocation(t,"aTextureCoord"),normalPosition:o.getAttribLocation(t,"aNormal")},uniformLocations:{projectionMatrix:o.getUniformLocation(t,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(t,"uModelViewMatrix"),normalMatrix:o.getUniformLocation(t,"uNormalMatrix"),texture:o.getUniformLocation(t,"uTexture"),highlight:o.getUniformLocation(t,"uHighlight")}};await nt(o);const h=c=>{pt(o,d,{camera:F,buildingsPerRow:I,buildingsPerColumn:C,map:N,mapSize:L}),Ut(s),requestAnimationFrame(h)};requestAnimationFrame(h)}function Ut(e){o.clearColor(0,0,0,1),o.clearDepth(1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);const i=o.canvas.clientHeight/o.canvas.clientWidth,r=.1,a=100,n=p();ae(n,0,I,0,I*i,r,a);const t=Math.floor(F.x/2)-1,d=Math.floor(F.z/2)-5;for(let s=d;s<d+C*2;s++){let h=s*L;for(let c=t;c<t+I*2;c++){let f=h+c;c===_[0]&&s===_[1]?o.uniform1i(e.uniformLocations.highlight,1):o.uniform1i(e.uniformLocations.highlight,0),!(c>=L)&&!(c<0)&&!(s<0)&&!(s>=L)?V(o,N[f],[c,s],e,n,F.cameraMatrix):V(o,254,[c,s],e,n,F.cameraMatrix)}}}

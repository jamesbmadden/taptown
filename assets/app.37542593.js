import"./modulepreload-polyfill.b7f2da20.js";import{c as F,s as lt,f as Nt,m as Yt,t as g,a as Dt,b as dt,d as Ot,i as zt,e as Gt,r as G,g as H,h as k,j as ht,k as mt,w as P,p as Q,o as ut,l as Ht,n as ft,q as kt,u as $t,$ as qt}from"./vendor.71547ac7.js";var wt=`attribute vec4 aVertexPosition;
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

`,xt=`varying highp vec2 vTextureCoord;
uniform sampler2D uTexture;

varying highp vec3 vNormal;

uniform bool uHighlight;
uniform highp mat4 uNormalMatrix;

void main(void) {

  /*// calculate lighting
  highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
  highp vec3 directionalLightColour = vec3(1, 1, 1);
  highp vec3 directionalVector = normalize(vec3(1, 1, 1));

  highp vec4 transformedNormal = uNormalMatrix * vec4(vNormal, 1.0);

  highp float directional = min(max(dot(vNormal.xyz, directionalVector), 0.0), 0.7);
  highp vec3 lighting = ambientLight + (directionalLightColour * directional);*/

  // initial colour
  highp vec4 colour;
  // brighten if highlighted
  if (uHighlight) {
    colour = texture2D(uTexture, vTextureCoord) + vec4(0.1, 0.1, 0.1, 0.0);
  } else {
    colour = texture2D(uTexture, vTextureCoord);
  }

  // colour = vec4(colour.rgb * lighting, colour.a);

  // now adjust colour by lighting and return
  gl_FragColor = colour;
  
}`;function Kt(t,i){return new Promise((c,l)=>{const n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n);const e=new Image;e.onload=()=>{t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),pt(e.width)&&pt(e.height)?t.generateMipmap(t.TEXTURE_2D):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),c(n)},e.src=i})}function pt(t){return(t&t-1)==0}function x(t,i){return new Promise(async(c,l)=>{const e=await(await fetch(i)).json(),d=e.scenes[e.scene],s=await(await fetch(e.buffers[0].uri)).blob();let h=[...d.nodes],f=0,w=[],v=[],I=[],B=[];for(;f<h.length;){let Et=v.length/3;const b=e.nodes[h[f]];if(b.children&&h.push(...b.children),b.mesh!==void 0){let L=F();if(b.scale&&lt(L,L,b.scale),b.rotation){const m=F();Nt(m,b.rotation),Yt(L,L,m)}b.translation&&g(L,L,b.translation);const Y=e.meshes[b.mesh].primitives[0],Ct=Y.indices,yt=e.accessors[Ct],D=e.bufferViews[yt.bufferView],Pt=s.slice(D.byteOffset,D.byteOffset+D.byteLength),St=new Int16Array(await Pt.arrayBuffer());w.push(...St.map(m=>m+Et));const _t=Y.attributes.POSITION,At=e.accessors[_t],O=e.bufferViews[At.bufferView],Vt=s.slice(O.byteOffset,O.byteOffset+O.byteLength),p=new Float32Array(await Vt.arrayBuffer());for(let m=0;m<p.length;m+=3){let y=[p[m],p[m+1],p[m+2]];Dt(y,y,L),v.push(...y)}for(let m=0;m<p.length;m+=9){const y=[p[m],p[m+1],p[m+2]],Zt=[p[m+3],p[m+4],p[m+5]],Jt=[p[m+6],p[m+7],p[m+8]],st=[0,0,0],ct=[0,0,0],W=[0,0,0];dt(st,Zt,y),dt(ct,Jt,y),Ot(W,st,ct),I.push(...W,...W,...W)}const Xt=Y.attributes.TEXCOORD_0,Wt=e.accessors[Xt],z=e.bufferViews[Wt.bufferView],Qt=s.slice(z.byteOffset,z.byteOffset+z.byteLength),jt=new Float32Array(await Qt.arrayBuffer());B.push(...jt)}f++}const Lt=await Kt(t,e.images[0].uri),at=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,at),t.bufferData(t.ARRAY_BUFFER,new Float32Array(v),t.STATIC_DRAW);const ot=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ot),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(w),t.STATIC_DRAW);const rt=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,rt),t.bufferData(t.ARRAY_BUFFER,new Float32Array(B),t.STATIC_DRAW);const nt=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,nt),t.bufferData(t.ARRAY_BUFFER,new Float32Array(I),t.STATIC_DRAW),c({buffers:{index:ot,vertex:at,texCoords:rt,normal:nt},indexCount:w.length,texture:Lt})})}var te="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",ee="/taptown/assets/Road-x.25087994.gltf",ie="/taptown/assets/Road-right.05535041.gltf",ae="/taptown/assets/Road-left.e4d57c46.gltf",oe="/taptown/assets/Road-y.43b84893.gltf",re="/taptown/assets/Road-up.f33fbfbe.gltf",ne="/taptown/assets/Road-down.3aa34828.gltf",se="/taptown/assets/Road-cross.c0149426.gltf",ce="/taptown/assets/Road-upleft.8e8e8992.gltf",le="/taptown/assets/Road-leftdown.43e4587d.gltf",de="/taptown/assets/Road-downright.2ee19715.gltf",he="/taptown/assets/Road-rightup.f9b3a2d6.gltf",me="/taptown/assets/Road-T.dd27be2f.gltf",ue="/taptown/assets/Road-l-.8fa437e2.gltf",fe="/taptown/assets/Road--l.cec3388c.gltf",we="/taptown/assets/Road-_l_.04dac8e2.gltf",xe="/taptown/assets/Road-single.f2299542.gltf",pe="/taptown/assets/outofbounds.8b7ad541.gltf",be="/taptown/assets/Cafe.5a05628e.gltf";const u=[null];let bt=!1;async function vt(t){u[0]=await x(t,te),u[1]=await x(t,ee),u[2]=await x(t,ie),u[3]=await x(t,ae),u[4]=await x(t,oe),u[5]=await x(t,re),u[6]=await x(t,ne),u[7]=await x(t,se),u[8]=await x(t,ce),u[9]=await x(t,le),u[10]=await x(t,de),u[11]=await x(t,he),u[12]=await x(t,me),u[13]=await x(t,ue),u[14]=await x(t,fe),u[15]=await x(t,we),u[16]=await x(t,xe),u[254]=await x(t,pe),u[255]=await x(t,be),bt=!0}function j(t,i,[c,l],n,e,d){if(!bt)throw"Models aren't loaded!";const r=u[i];if(!r)return;const s=F();g(s,d,[c*2,0,l*2]);{const f=3,w=t.FLOAT,v=!1,I=0,B=0;t.bindBuffer(t.ARRAY_BUFFER,r.buffers.vertex),t.vertexAttribPointer(n.attribLocations.vertexPosition,f,w,v,I,B),t.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const f=3,w=t.FLOAT,v=!1,I=0,B=0;t.bindBuffer(t.ARRAY_BUFFER,r.buffers.normal),t.vertexAttribPointer(n.attribLocations.normalPosition,f,w,v,I,B),t.enableVertexAttribArray(n.attribLocations.normalPosition)}{const f=2,w=t.FLOAT,v=!1,I=0,B=0;t.bindBuffer(t.ARRAY_BUFFER,r.buffers.texCoords),t.vertexAttribPointer(n.attribLocations.textureCoordPosition,f,w,v,I,B),t.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r.buffers.index),t.useProgram(n.program),t.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,e),t.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,s);const h=F();zt(h,s),Gt(h,h),t.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,h),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,r.texture),t.uniform1i(n.uniformLocations.texture,0),t.drawElements(t.TRIANGLES,r.indexCount,t.UNSIGNED_SHORT,0)}class Ft{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=F(),g(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),H(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,c){if(this._inFocusMode)return;const l=i/this._pixelToTileX,n=c/this._pixelToTileZ*1.425,e=[l,n];k(e,e,[0,0],45*Math.PI/180),this.x-=e[0],this.z-=e[1],g(this.cameraMatrix,this.cameraMatrix,[e[0],0,e[1]])}setPixelToTileRatio(i,c){this._pixelToTileX=i,this._pixelToTileZ=c}update(i){let c=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*c)*Math.sign(this._velocityX)*10*c,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*c)*Math.sign(this._velocityY)*10*c,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,c]){this._inFocusMode=!0;const l=Date.now(),n=()=>{let e=(Date.now()-l)/1e3;e>1&&(e=1);const d=-this.x*(1-e)+(-i*2+innerWidth/200)*e,r=-this.z*(1-e)+(-c*2+innerHeight/200)*e,s=1;this.cameraMatrix=F(),g(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),H(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),lt(this.cameraMatrix,this.cameraMatrix,[s,s,s]),g(this.cameraMatrix,this.cameraMatrix,[d,0,r]),e<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=F(),g(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),H(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),g(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function Tt(){return new Worker("/taptown/assets/ambient.6d469442.js",{type:"module"})}function Rt(){return new Worker("/taptown/assets/buildings.9671986a.js",{type:"module"})}function Mt(){return new Worker("/taptown/assets/people.f51a4310.js",{type:"module"})}let Z,Ut;const T=document.getElementsByTagName("canvas")[0];let S=2*(innerWidth/200),J=2*(innerHeight/200),$,A,R=new Ft,E=[-100,-100];window.camera=R;T.width=innerWidth*devicePixelRatio;T.height=innerHeight*devicePixelRatio;let q=innerWidth/S,ve=innerHeight/J;R.setPixelToTileRatio(q,ve);let a=T.getContext("webgl");window.addEventListener("resize",()=>{T.width=innerWidth*devicePixelRatio,T.height=innerHeight*devicePixelRatio,a.viewport(0,0,T.width,T.height),S=2*(innerWidth/200),J=2*(innerHeight/200);let t=innerWidth/S,i=innerHeight/J;R.setPixelToTileRatio(t,i)});T.addEventListener("mousemove",t=>{const i=t.clientX/q/2,c=(t.clientY-window.innerHeight)/q/2*1.425,l=[i,c];k(l,l,[0,0],45*Math.PI/180);const n=[R.x/2,R.z/2+1];ht(l,l,n),mt(l,l),E=l});T.addEventListener("click",t=>{E[1]*A+E[0],Bt(E[0],E[1])});Fe();async function Fe(){const t=P(new Tt);t.log();const i=P(new Rt);i.log();const c=P(new Mt);c.log(),await new t,Z=await new i,await Z.setCallback(Q(w=>{console.log("recieved new map"),$=w,A=Math.sqrt($.length)})),Ut=await new c,await Ut.setCallback(Q(w=>{It(w)}));const n=new URLSearchParams(location.search).get("save");n||(alert("Save not provided."),location.replace("../"));const e=await Z.loadSave(n);e||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${n} \u2022 TapTown!`,console.log(e);const d=a.createShader(a.VERTEX_SHADER);a.shaderSource(d,wt),a.compileShader(d);const r=a.createShader(a.FRAGMENT_SHADER);if(a.shaderSource(r,xt),a.compileShader(r),!a.getShaderParameter(d,a.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+a.getShaderInfoLog(d)),a.deleteShader(d),null;if(!a.getShaderParameter(r,a.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+a.getShaderInfoLog(r)),a.deleteShader(r),null;const s=a.createProgram();if(a.attachShader(s,d),a.attachShader(s,r),a.linkProgram(s),!a.getProgramParameter(s,a.LINK_STATUS))return alert("Unable to initialize the shader program: "+a.getProgramInfoLog(s)),null;const h={program:s,attribLocations:{vertexPosition:a.getAttribLocation(s,"aVertexPosition"),textureCoordPosition:a.getAttribLocation(s,"aTextureCoord"),normalPosition:a.getAttribLocation(s,"aNormal")},uniformLocations:{projectionMatrix:a.getUniformLocation(s,"uProjectionMatrix"),modelViewMatrix:a.getUniformLocation(s,"uModelViewMatrix"),normalMatrix:a.getUniformLocation(s,"uNormalMatrix"),texture:a.getUniformLocation(s,"uTexture"),highlight:a.getUniformLocation(s,"uHighlight")}};await vt(a);const f=w=>{Te(h),requestAnimationFrame(f)};requestAnimationFrame(f)}function Te(t){a.clearColor(0,0,0,1),a.clearDepth(1),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);const i=a.canvas.clientHeight/a.canvas.clientWidth,c=.1,l=100,n=F();ut(n,0,S,0,S*i,c,l);const e=Math.floor(R.x/2)-1,d=Math.floor(R.z/2)-5;for(let r=d;r<d+J*2;r++){let s=r*A;for(let h=e;h<e+S*2;h++){let f=s+h;h===E[0]&&r===E[1]?a.uniform1i(t.uniformLocations.highlight,1):a.uniform1i(t.uniformLocations.highlight,0),!(h>=A)&&!(h<0)&&!(r<0)&&!(r>=A)?j(a,$[f],[h,r],t,n,R.cameraMatrix):j(a,254,[h,r],t,n,R.cameraMatrix)}}}var Re=`.close-button {
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
}`,K=globalThis&&globalThis.__decorate||function(t,i,c,l){var n=arguments.length,e=n<3?i:l===null?l=Object.getOwnPropertyDescriptor(i,c):l,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,i,c,l);else for(var r=t.length-1;r>=0;r--)(d=t[r])&&(e=(n<3?d(e):n>3?d(i,c,e):d(i,c))||e);return n>3&&e&&Object.defineProperty(i,c,e),e};let V=class extends $t{close(){this.remove()}render(){return qt`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{console.log("building road"),Z.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button>Build Cafe</button>
        </div>
      </div>
    `}};V.styles=Ht([Re]);K([ft()],V.prototype,"x",void 0);K([ft()],V.prototype,"z",void 0);V=K([kt("tt-tile")],V);const Me=document.querySelector(".money"),Ue=document.querySelector(".population");function It(t){Me.textContent=`$${t.money}`,Ue.textContent=`${t.population}`}function Bt(t,i){const c=document.createElement("tt-tile");c.x=t,c.z=i,document.body.appendChild(c)}let tt,gt;const M=document.getElementsByTagName("canvas")[0];let _=2*(innerWidth/200),N=2*(innerHeight/200),et,X,U=new Ft,C=[-100,-100];window.camera=U;M.width=innerWidth*devicePixelRatio;M.height=innerHeight*devicePixelRatio;let it=innerWidth/_,Ie=innerHeight/N;U.setPixelToTileRatio(it,Ie);let o=M.getContext("webgl");window.addEventListener("resize",()=>{M.width=innerWidth*devicePixelRatio,M.height=innerHeight*devicePixelRatio,o.viewport(0,0,M.width,M.height),_=2*(innerWidth/200),N=2*(innerHeight/200);let t=innerWidth/_,i=innerHeight/N;U.setPixelToTileRatio(t,i)});M.addEventListener("mousemove",t=>{const i=t.clientX/it/2,c=(t.clientY-window.innerHeight)/it/2*1.425,l=[i,c];k(l,l,[0,0],45*Math.PI/180);const n=[U.x/2,U.z/2+1];ht(l,l,n),mt(l,l),C=l});M.addEventListener("click",t=>{C[1]*X+C[0],Bt(C[0],C[1])});Be();async function Be(){const t=P(new Tt);t.log();const i=P(new Rt);i.log();const c=P(new Mt);c.log(),await new t,tt=await new i,await tt.setCallback(Q(w=>{console.log("recieved new map"),et=w,X=Math.sqrt(et.length)})),gt=await new c,await gt.setCallback(Q(w=>{It(w)}));const n=new URLSearchParams(location.search).get("save");n||(alert("Save not provided."),location.replace("../"));const e=await tt.loadSave(n);e||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${n} \u2022 TapTown!`,console.log(e);const d=o.createShader(o.VERTEX_SHADER);o.shaderSource(d,wt),o.compileShader(d);const r=o.createShader(o.FRAGMENT_SHADER);if(o.shaderSource(r,xt),o.compileShader(r),!o.getShaderParameter(d,o.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+o.getShaderInfoLog(d)),o.deleteShader(d),null;if(!o.getShaderParameter(r,o.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+o.getShaderInfoLog(r)),o.deleteShader(r),null;const s=o.createProgram();if(o.attachShader(s,d),o.attachShader(s,r),o.linkProgram(s),!o.getProgramParameter(s,o.LINK_STATUS))return alert("Unable to initialize the shader program: "+o.getProgramInfoLog(s)),null;const h={program:s,attribLocations:{vertexPosition:o.getAttribLocation(s,"aVertexPosition"),textureCoordPosition:o.getAttribLocation(s,"aTextureCoord"),normalPosition:o.getAttribLocation(s,"aNormal")},uniformLocations:{projectionMatrix:o.getUniformLocation(s,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(s,"uModelViewMatrix"),normalMatrix:o.getUniformLocation(s,"uNormalMatrix"),texture:o.getUniformLocation(s,"uTexture"),highlight:o.getUniformLocation(s,"uHighlight")}};await vt(o);const f=w=>{ge(h),requestAnimationFrame(f)};requestAnimationFrame(f)}function ge(t){o.clearColor(0,0,0,1),o.clearDepth(1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);const i=o.canvas.clientHeight/o.canvas.clientWidth,c=.1,l=100,n=F();ut(n,0,_,0,_*i,c,l);const e=Math.floor(U.x/2)-1,d=Math.floor(U.z/2)-5;for(let r=d;r<d+N*2;r++){let s=r*X;for(let h=e;h<e+_*2;h++){let f=s+h;h===C[0]&&r===C[1]?o.uniform1i(t.uniformLocations.highlight,1):o.uniform1i(t.uniformLocations.highlight,0),!(h>=X)&&!(h<0)&&!(r<0)&&!(r>=X)?j(o,et[f],[h,r],t,n,U.cameraMatrix):j(o,254,[h,r],t,n,U.cameraMatrix)}}}

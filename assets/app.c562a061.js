import"./modulepreload-polyfill.b7f2da20.js";import{c as R,s as G,f as ft,m as wt,t as M,a as xt,i as bt,b as pt,r as Z,d as j,e as z,g as vt,h as H,n as Ft,j as Rt,$ as Mt,k as It,l as Ut,w as W,p as k,o as Tt}from"./vendor.57491b8c.js";var Bt=`attribute vec4 aVertexPosition;
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

`,yt=`varying highp vec2 vTextureCoord;
uniform sampler2D uTexture;

varying highp vec3 vNormal;

uniform bool uHighlight;
uniform highp mat4 uNormalMatrix;

void main(void) {

  // calculate lighting
  /*highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
  highp vec3 directionalLightColour = vec3(1, 1, 1);
  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

  highp vec4 transformedNormal = uNormalMatrix * vec4(vNormal, 1.0);

  highp float directional = max(dot(vNormal.xyz, directionalVector), 0.0);
  highp vec3 lighting = ambientLight + (directionalLightColour * directional);*/

  // initial colour
  highp vec4 colour;
  // brighten if highlighted
  if (uHighlight) {
    colour = texture2D(uTexture, vTextureCoord) + vec4(0.1, 0.1, 0.1, 0.0);
  } else {
    colour = texture2D(uTexture, vTextureCoord);
  }

  //colour = vec4(colour.rgb * lighting, colour.a);

  // now adjust colour by lighting and return
  gl_FragColor = colour;
  
}`;function Et(t,a){return new Promise((r,c)=>{const o=t.createTexture();t.bindTexture(t.TEXTURE_2D,o);const e=new Image;e.onload=()=>{t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),$(e.width)&&$(e.height)?t.generateMipmap(t.TEXTURE_2D):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),r(o)},e.src=a})}function $(t){return(t&t-1)==0}function u(t,a){return new Promise(async(r,c)=>{const e=await(await fetch(a)).json(),l=e.scenes[e.scene],s=await(await fetch(e.buffers[0].uri)).blob();let h=[...l.nodes],m=0,f=[],b=[],F=[],I=[];for(;m<h.length;){let it=b.length/3;const w=e.nodes[h[m]];if(w.children&&h.push(...w.children),w.mesh!==void 0){let U=R();if(w.scale&&G(U,U,w.scale),w.rotation){const x=R();ft(x,w.rotation),wt(U,U,x)}w.translation&&M(U,U,w.translation);const _=e.meshes[w.mesh].primitives[0],at=_.indices,ot=e.accessors[at],V=e.bufferViews[ot.bufferView],rt=s.slice(V.byteOffset,V.byteOffset+V.byteLength),nt=new Int16Array(await rt.arrayBuffer());f.push(...nt.map(x=>x+it));const st=_.attributes.POSITION,ct=e.accessors[st],A=e.bufferViews[ct.bufferView],lt=s.slice(A.byteOffset,A.byteOffset+A.byteLength),L=new Float32Array(await lt.arrayBuffer());for(let x=0;x<L.length;x+=3){let Q=[L[x],L[x+1],L[x+2]];xt(Q,Q,U),b.push(...Q)}const dt=_.attributes.NORMAL,ht=e.accessors[dt],X=e.bufferViews[ht.bufferView],ut=s.slice(X.byteOffset,X.byteOffset+X.byteLength),mt=new Float32Array(await ut.arrayBuffer());F.push(...mt)}m++}const et=await Et(t,e.images[0].uri),N=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,N),t.bufferData(t.ARRAY_BUFFER,new Float32Array(b),t.STATIC_DRAW);const Y=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,Y),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),t.STATIC_DRAW);const D=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,D),t.bufferData(t.ARRAY_BUFFER,new Float32Array(I),t.STATIC_DRAW);const O=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,O),t.bufferData(t.ARRAY_BUFFER,new Float32Array(F),t.STATIC_DRAW),r({buffers:{index:Y,vertex:N,texCoords:D,normal:O},indexCount:f.length,texture:et})})}var Lt="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Ct="/taptown/assets/Road-x.25087994.gltf",_t="/taptown/assets/Road-right.05535041.gltf",Vt="/taptown/assets/Road-left.e4d57c46.gltf",At="/taptown/assets/Road-y.43b84893.gltf",Xt="/taptown/assets/Road-up.f33fbfbe.gltf",Qt="/taptown/assets/Road-down.3aa34828.gltf",Zt="/taptown/assets/Road-cross.c0149426.gltf",jt="/taptown/assets/Road-upleft.8e8e8992.gltf",Wt="/taptown/assets/Road-leftdown.43e4587d.gltf",Pt="/taptown/assets/Road-downright.2ee19715.gltf",St="/taptown/assets/Road-rightup.f9b3a2d6.gltf",Jt="/taptown/assets/Road-T.dd27be2f.gltf",gt="/taptown/assets/Road-l-.8fa437e2.gltf",Nt="/taptown/assets/Road--l.cec3388c.gltf",Yt="/taptown/assets/Road-_l_.04dac8e2.gltf",Dt="/taptown/assets/Road-single.f2299542.gltf",Ot="/taptown/assets/outofbounds.8b7ad541.gltf",Gt="/taptown/assets/Cafe.5a05628e.gltf";const d=[null];let q=!1;async function zt(t){d[0]=await u(t,Lt),d[1]=await u(t,Ct),d[2]=await u(t,_t),d[3]=await u(t,Vt),d[4]=await u(t,At),d[5]=await u(t,Xt),d[6]=await u(t,Qt),d[7]=await u(t,Zt),d[8]=await u(t,jt),d[9]=await u(t,Wt),d[10]=await u(t,Pt),d[11]=await u(t,St),d[12]=await u(t,Jt),d[13]=await u(t,gt),d[14]=await u(t,Nt),d[15]=await u(t,Yt),d[16]=await u(t,Dt),d[254]=await u(t,Ot),d[255]=await u(t,Gt),q=!0}function K(t,a,[r,c],o,e,l){if(!q)throw"Models aren't loaded!";const n=d[a];if(!n)return;const s=R();M(s,l,[r*2,0,c*2]);{const m=3,f=t.FLOAT,b=!1,F=0,I=0;t.bindBuffer(t.ARRAY_BUFFER,n.buffers.vertex),t.vertexAttribPointer(o.attribLocations.vertexPosition,m,f,b,F,I),t.enableVertexAttribArray(o.attribLocations.vertexPosition)}{const m=3,f=t.FLOAT,b=!1,F=0,I=0;t.bindBuffer(t.ARRAY_BUFFER,n.buffers.normal),t.vertexAttribPointer(o.attribLocations.normalPosition,m,f,b,F,I),t.enableVertexAttribArray(o.attribLocations.normalPosition)}{const m=2,f=t.FLOAT,b=!1,F=0,I=0;t.bindBuffer(t.ARRAY_BUFFER,n.buffers.texCoords),t.vertexAttribPointer(o.attribLocations.textureCoordPosition,m,f,b,F,I),t.enableVertexAttribArray(o.attribLocations.textureCoordPosition)}t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.buffers.index),t.useProgram(o.program),t.uniformMatrix4fv(o.uniformLocations.projectionMatrix,!1,e),t.uniformMatrix4fv(o.uniformLocations.modelViewMatrix,!1,s);const h=R();bt(h,s),pt(h,h),t.uniformMatrix4fv(o.uniformLocations.normalMatrix,!1,h),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n.texture),t.uniform1i(o.uniformLocations.texture,0),t.drawElements(t.TRIANGLES,n.indexCount,t.UNSIGNED_SHORT,0)}class Ht{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=R(),M(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),Z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),j(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",a=>{this._pointerDown=!0,this._prevPointerX=a.clientX,this._prevPointerY=a.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",a=>{this._pointerDown&&(this._moveCamera(a.clientX-this._prevPointerX,a.clientY-this._prevPointerY),this._velocityX=a.clientX-this._prevPointerX,this._velocityY=a.clientY-this._prevPointerY),this._prevPointerX=a.clientX,this._prevPointerY=a.clientY})}_moveCamera(a,r){if(this._inFocusMode)return;const c=a/this._pixelToTileX,o=r/this._pixelToTileZ*1.425,e=[c,o];z(e,e,[0,0],45*Math.PI/180),this.x-=e[0],this.z-=e[1],M(this.cameraMatrix,this.cameraMatrix,[e[0],0,e[1]])}setPixelToTileRatio(a,r){this._pixelToTileX=a,this._pixelToTileZ=r}update(a){let r=a/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*r)*Math.sign(this._velocityX)*10*r,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*r)*Math.sign(this._velocityY)*10*r,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([a,r]){this._inFocusMode=!0;const c=Date.now(),o=()=>{let e=(Date.now()-c)/1e3;e>1&&(e=1);const l=-this.x*(1-e)+(-a*2+innerWidth/200)*e,n=-this.z*(1-e)+(-r*2+innerHeight/200)*e,s=1;this.cameraMatrix=R(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),Z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),j(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),G(this.cameraMatrix,this.cameraMatrix,[s,s,s]),M(this.cameraMatrix,this.cameraMatrix,[l,0,n]),e<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}exitFocus(){this.cameraMatrix=R(),M(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),Z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),j(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),M(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}var kt=`.close-button {
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
}`,P=globalThis&&globalThis.__decorate||function(t,a,r,c){var o=arguments.length,e=o<3?a:c===null?c=Object.getOwnPropertyDescriptor(a,r):c,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,a,r,c);else for(var n=t.length-1;n>=0;n--)(l=t[n])&&(e=(o<3?l(e):o>3?l(a,r,e):l(a,r))||e);return o>3&&e&&Object.defineProperty(a,r,e),e};let y=class extends Rt{close(){this.remove()}render(){return Mt`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{console.log("building road"),this.close()}}>Build Road</button>
          <button>Build Cafe</button>
        </div>
      </div>
    `}};y.styles=vt([kt]);P([H()],y.prototype,"x",void 0);P([H()],y.prototype,"z",void 0);y=P([Ft("tt-tile")],y);const $t=document.querySelector(".money"),qt=document.querySelector(".population");function Kt(t){$t.textContent=`$${t.money}`,qt.textContent=`${t.population}`}function te(t,a){const r=document.createElement("tt-tile");r.x=t,r.z=a,document.body.appendChild(r)}function ee(){return new Worker("/taptown/assets/ambient.6d469442.js",{type:"module"})}function ie(){return new Worker("/taptown/assets/buildings.9671986a.js",{type:"module"})}function ae(){return new Worker("/taptown/assets/people.f51a4310.js",{type:"module"})}let S,tt;const p=document.getElementsByTagName("canvas")[0];let B=2*(innerWidth/200),C=2*(innerHeight/200),J,E,v=new Ht,T=[-100,-100];window.camera=v;p.width=innerWidth*devicePixelRatio;p.height=innerHeight*devicePixelRatio;let g=innerWidth/B,oe=innerHeight/C;v.setPixelToTileRatio(g,oe);let i=p.getContext("webgl");window.addEventListener("resize",()=>{p.width=innerWidth*devicePixelRatio,p.height=innerHeight*devicePixelRatio,i.viewport(0,0,p.width,p.height),B=2*(innerWidth/200),C=2*(innerHeight/200);let t=innerWidth/B,a=innerHeight/C;v.setPixelToTileRatio(t,a)});p.addEventListener("mousemove",t=>{const a=t.clientX/g/2,r=(t.clientY-window.innerHeight)/g/2*1.425,c=[a,r];z(c,c,[0,0],45*Math.PI/180);const o=[v.x/2,v.z/2+1];It(c,c,o),Ut(c,c),T=c});p.addEventListener("click",t=>{T[1]*E+T[0],te(T[0],T[1])});re();async function re(){const t=W(new ee);t.log();const a=W(new ie);a.log();const r=W(new ae);r.log(),await new t,S=await new a,await S.setCallback(k(f=>{console.log("recieved new map"),J=f,E=Math.sqrt(J.length)})),tt=await new r,await tt.setCallback(k(f=>{Kt(f)}));const o=new URLSearchParams(location.search).get("save");o||(alert("Save not provided."),location.replace("../"));const e=await S.loadSave(o);e||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${o} \u2022 TapTown!`,console.log(e);const l=i.createShader(i.VERTEX_SHADER);i.shaderSource(l,Bt),i.compileShader(l);const n=i.createShader(i.FRAGMENT_SHADER);if(i.shaderSource(n,yt),i.compileShader(n),!i.getShaderParameter(l,i.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+i.getShaderInfoLog(l)),i.deleteShader(l),null;if(!i.getShaderParameter(n,i.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+i.getShaderInfoLog(n)),i.deleteShader(n),null;const s=i.createProgram();if(i.attachShader(s,l),i.attachShader(s,n),i.linkProgram(s),!i.getProgramParameter(s,i.LINK_STATUS))return alert("Unable to initialize the shader program: "+i.getProgramInfoLog(s)),null;const h={program:s,attribLocations:{vertexPosition:i.getAttribLocation(s,"aVertexPosition"),textureCoordPosition:i.getAttribLocation(s,"aTextureCoord"),normalPosition:i.getAttribLocation(s,"aNormal")},uniformLocations:{projectionMatrix:i.getUniformLocation(s,"uProjectionMatrix"),modelViewMatrix:i.getUniformLocation(s,"uModelViewMatrix"),normalMatrix:i.getUniformLocation(s,"uNormalMatrix"),texture:i.getUniformLocation(s,"uTexture"),highlight:i.getUniformLocation(s,"uHighlight")}};await zt(i);const m=f=>{ne(h),requestAnimationFrame(m)};requestAnimationFrame(m)}function ne(t){i.clearColor(0,0,0,1),i.clearDepth(1),i.enable(i.DEPTH_TEST),i.depthFunc(i.LEQUAL),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT);const a=i.canvas.clientHeight/i.canvas.clientWidth,r=.1,c=100,o=R();Tt(o,0,B,0,B*a,r,c);const e=Math.floor(v.x/2)-1,l=Math.floor(v.z/2)-5;for(let n=l;n<l+C*2;n++){let s=n*E;for(let h=e;h<e+B*2;h++){let m=s+h;h===T[0]&&n===T[1]?i.uniform1i(t.uniformLocations.highlight,1):i.uniform1i(t.uniformLocations.highlight,0),!(h>=E)&&!(h<0)&&!(n<0)&&!(n>=E)?K(i,J[m],[h,n],t,o,v.cameraMatrix):K(i,254,[h,n],t,o,v.cameraMatrix)}}}

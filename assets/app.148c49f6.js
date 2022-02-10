import"./modulepreload-polyfill.b7f2da20.js";import{c as M,s as G,f as vt,m as Ft,t as I,a as Rt,i as Mt,b as It,r as S,d as W,e as H,g as Tt,h as k,n as Ut,j as Bt,$ as yt,k as Et,l as Ct,w as P,p as $,o as Lt}from"./vendor.57491b8c.js";var _t=`attribute vec4 aVertexPosition;
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

`,Vt=`varying highp vec2 vTextureCoord;
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
  
}`;function At(t,a){return new Promise((r,c)=>{const o=t.createTexture();t.bindTexture(t.TEXTURE_2D,o);const e=new Image;e.onload=()=>{t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),q(e.width)&&q(e.height)?t.generateMipmap(t.TEXTURE_2D):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),r(o)},e.src=a})}function q(t){return(t&t-1)==0}function u(t,a){return new Promise(async(r,c)=>{const e=await(await fetch(a)).json(),l=e.scenes[e.scene],s=await(await fetch(e.buffers[0].uri)).blob();let h=[...l.nodes],m=0,f=[],x=[],F=[],R=[];for(;m<h.length;){let at=x.length/3;const w=e.nodes[h[m]];if(w.children&&h.push(...w.children),w.mesh!==void 0){let T=M();if(w.scale&&G(T,T,w.scale),w.rotation){const b=M();vt(b,w.rotation),Ft(T,T,b)}w.translation&&I(T,T,w.translation);const C=e.meshes[w.mesh].primitives[0],ot=C.indices,rt=e.accessors[ot],A=e.bufferViews[rt.bufferView],nt=s.slice(A.byteOffset,A.byteOffset+A.byteLength),st=new Int16Array(await nt.arrayBuffer());f.push(...st.map(b=>b+at));const ct=C.attributes.POSITION,lt=e.accessors[ct],X=e.bufferViews[lt.bufferView],dt=s.slice(X.byteOffset,X.byteOffset+X.byteLength),L=new Float32Array(await dt.arrayBuffer());for(let b=0;b<L.length;b+=3){let j=[L[b],L[b+1],L[b+2]];Rt(j,j,T),x.push(...j)}const ht=C.attributes.NORMAL,ut=e.accessors[ht],Q=e.bufferViews[ut.bufferView],mt=s.slice(Q.byteOffset,Q.byteOffset+Q.byteLength),ft=new Float32Array(await mt.arrayBuffer());F.push(...ft);const wt=C.attributes.TEXCOORD_0,bt=e.accessors[wt],Z=e.bufferViews[bt.bufferView],xt=s.slice(Z.byteOffset,Z.byteOffset+Z.byteLength),pt=new Float32Array(await xt.arrayBuffer());R.push(...pt)}m++}const it=await At(t,e.images[0].uri),Y=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Y),t.bufferData(t.ARRAY_BUFFER,new Float32Array(x),t.STATIC_DRAW);const D=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,D),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),t.STATIC_DRAW);const O=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,O),t.bufferData(t.ARRAY_BUFFER,new Float32Array(R),t.STATIC_DRAW);const z=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,z),t.bufferData(t.ARRAY_BUFFER,new Float32Array(F),t.STATIC_DRAW),r({buffers:{index:D,vertex:Y,texCoords:O,normal:z},indexCount:f.length,texture:it})})}var Xt="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Qt="/taptown/assets/Road-x.25087994.gltf",Zt="/taptown/assets/Road-right.05535041.gltf",jt="/taptown/assets/Road-left.e4d57c46.gltf",St="/taptown/assets/Road-y.43b84893.gltf",Wt="/taptown/assets/Road-up.f33fbfbe.gltf",Pt="/taptown/assets/Road-down.3aa34828.gltf",gt="/taptown/assets/Road-cross.c0149426.gltf",Jt="/taptown/assets/Road-upleft.8e8e8992.gltf",Nt="/taptown/assets/Road-leftdown.43e4587d.gltf",Yt="/taptown/assets/Road-downright.2ee19715.gltf",Dt="/taptown/assets/Road-rightup.f9b3a2d6.gltf",Ot="/taptown/assets/Road-T.dd27be2f.gltf",zt="/taptown/assets/Road-l-.8fa437e2.gltf",Gt="/taptown/assets/Road--l.cec3388c.gltf",Ht="/taptown/assets/Road-_l_.04dac8e2.gltf",kt="/taptown/assets/Road-single.f2299542.gltf",$t="/taptown/assets/outofbounds.8b7ad541.gltf",qt="/taptown/assets/Cafe.5a05628e.gltf";const d=[null];let K=!1;async function Kt(t){d[0]=await u(t,Xt),d[1]=await u(t,Qt),d[2]=await u(t,Zt),d[3]=await u(t,jt),d[4]=await u(t,St),d[5]=await u(t,Wt),d[6]=await u(t,Pt),d[7]=await u(t,gt),d[8]=await u(t,Jt),d[9]=await u(t,Nt),d[10]=await u(t,Yt),d[11]=await u(t,Dt),d[12]=await u(t,Ot),d[13]=await u(t,zt),d[14]=await u(t,Gt),d[15]=await u(t,Ht),d[16]=await u(t,kt),d[254]=await u(t,$t),d[255]=await u(t,qt),K=!0}function tt(t,a,[r,c],o,e,l){if(!K)throw"Models aren't loaded!";const n=d[a];if(!n)return;const s=M();I(s,l,[r*2,0,c*2]);{const m=3,f=t.FLOAT,x=!1,F=0,R=0;t.bindBuffer(t.ARRAY_BUFFER,n.buffers.vertex),t.vertexAttribPointer(o.attribLocations.vertexPosition,m,f,x,F,R),t.enableVertexAttribArray(o.attribLocations.vertexPosition)}{const m=3,f=t.FLOAT,x=!1,F=0,R=0;t.bindBuffer(t.ARRAY_BUFFER,n.buffers.normal),t.vertexAttribPointer(o.attribLocations.normalPosition,m,f,x,F,R),t.enableVertexAttribArray(o.attribLocations.normalPosition)}{const m=2,f=t.FLOAT,x=!1,F=0,R=0;t.bindBuffer(t.ARRAY_BUFFER,n.buffers.texCoords),t.vertexAttribPointer(o.attribLocations.textureCoordPosition,m,f,x,F,R),t.enableVertexAttribArray(o.attribLocations.textureCoordPosition)}t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.buffers.index),t.useProgram(o.program),t.uniformMatrix4fv(o.uniformLocations.projectionMatrix,!1,e),t.uniformMatrix4fv(o.uniformLocations.modelViewMatrix,!1,s);const h=M();Mt(h,s),It(h,h),t.uniformMatrix4fv(o.uniformLocations.normalMatrix,!1,h),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n.texture),t.uniform1i(o.uniformLocations.texture,0),t.drawElements(t.TRIANGLES,n.indexCount,t.UNSIGNED_SHORT,0)}class te{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=M(),I(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),S(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),W(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",a=>{this._pointerDown=!0,this._prevPointerX=a.clientX,this._prevPointerY=a.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",a=>{this._pointerDown&&(this._moveCamera(a.clientX-this._prevPointerX,a.clientY-this._prevPointerY),this._velocityX=a.clientX-this._prevPointerX,this._velocityY=a.clientY-this._prevPointerY),this._prevPointerX=a.clientX,this._prevPointerY=a.clientY})}_moveCamera(a,r){if(this._inFocusMode)return;const c=a/this._pixelToTileX,o=r/this._pixelToTileZ*1.425,e=[c,o];H(e,e,[0,0],45*Math.PI/180),this.x-=e[0],this.z-=e[1],I(this.cameraMatrix,this.cameraMatrix,[e[0],0,e[1]])}setPixelToTileRatio(a,r){this._pixelToTileX=a,this._pixelToTileZ=r}update(a){let r=a/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*r)*Math.sign(this._velocityX)*10*r,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*r)*Math.sign(this._velocityY)*10*r,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([a,r]){this._inFocusMode=!0;const c=Date.now(),o=()=>{let e=(Date.now()-c)/1e3;e>1&&(e=1);const l=-this.x*(1-e)+(-a*2+innerWidth/200)*e,n=-this.z*(1-e)+(-r*2+innerHeight/200)*e,s=1;this.cameraMatrix=M(),I(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),S(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),W(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),G(this.cameraMatrix,this.cameraMatrix,[s,s,s]),I(this.cameraMatrix,this.cameraMatrix,[l,0,n]),e<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}exitFocus(){this.cameraMatrix=M(),I(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),S(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),W(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),I(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}var ee=`.close-button {
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
}`,g=globalThis&&globalThis.__decorate||function(t,a,r,c){var o=arguments.length,e=o<3?a:c===null?c=Object.getOwnPropertyDescriptor(a,r):c,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,a,r,c);else for(var n=t.length-1;n>=0;n--)(l=t[n])&&(e=(o<3?l(e):o>3?l(a,r,e):l(a,r))||e);return o>3&&e&&Object.defineProperty(a,r,e),e};let y=class extends Bt{close(){this.remove()}render(){return yt`
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
    `}};y.styles=Tt([ee]);g([k()],y.prototype,"x",void 0);g([k()],y.prototype,"z",void 0);y=g([Ut("tt-tile")],y);const ie=document.querySelector(".money"),ae=document.querySelector(".population");function oe(t){ie.textContent=`$${t.money}`,ae.textContent=`${t.population}`}function re(t,a){const r=document.createElement("tt-tile");r.x=t,r.z=a,document.body.appendChild(r)}function ne(){return new Worker("/taptown/assets/ambient.6d469442.js",{type:"module"})}function se(){return new Worker("/taptown/assets/buildings.9671986a.js",{type:"module"})}function ce(){return new Worker("/taptown/assets/people.f51a4310.js",{type:"module"})}let _,et;const p=document.getElementsByTagName("canvas")[0];let B=2*(innerWidth/200),V=2*(innerHeight/200),J,E,v=new te,U=[-100,-100];window.camera=v;p.width=innerWidth*devicePixelRatio;p.height=innerHeight*devicePixelRatio;let N=innerWidth/B,le=innerHeight/V;v.setPixelToTileRatio(N,le);let i=p.getContext("webgl");window.addEventListener("resize",()=>{p.width=innerWidth*devicePixelRatio,p.height=innerHeight*devicePixelRatio,i.viewport(0,0,p.width,p.height),B=2*(innerWidth/200),V=2*(innerHeight/200);let t=innerWidth/B,a=innerHeight/V;v.setPixelToTileRatio(t,a)});p.addEventListener("mousemove",t=>{const a=t.clientX/N/2,r=(t.clientY-window.innerHeight)/N/2*1.425,c=[a,r];H(c,c,[0,0],45*Math.PI/180);const o=[v.x/2,v.z/2+1];Et(c,c,o),Ct(c,c),U=c});p.addEventListener("click",t=>{U[1]*E+U[0],re(U[0],U[1])});window.addEventListener("tt-buildroad",t=>{_.buildRoad(t.detail.x,t.detail.z)});de();async function de(){const t=P(new ne);t.log();const a=P(new se);a.log();const r=P(new ce);r.log(),await new t,_=await new a,await _.setCallback($(f=>{console.log("recieved new map"),J=f,E=Math.sqrt(J.length)})),et=await new r,await et.setCallback($(f=>{oe(f)}));const o=new URLSearchParams(location.search).get("save");o||(alert("Save not provided."),location.replace("../"));const e=await _.loadSave(o);e||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${o} \u2022 TapTown!`,console.log(e);const l=i.createShader(i.VERTEX_SHADER);i.shaderSource(l,_t),i.compileShader(l);const n=i.createShader(i.FRAGMENT_SHADER);if(i.shaderSource(n,Vt),i.compileShader(n),!i.getShaderParameter(l,i.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+i.getShaderInfoLog(l)),i.deleteShader(l),null;if(!i.getShaderParameter(n,i.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+i.getShaderInfoLog(n)),i.deleteShader(n),null;const s=i.createProgram();if(i.attachShader(s,l),i.attachShader(s,n),i.linkProgram(s),!i.getProgramParameter(s,i.LINK_STATUS))return alert("Unable to initialize the shader program: "+i.getProgramInfoLog(s)),null;const h={program:s,attribLocations:{vertexPosition:i.getAttribLocation(s,"aVertexPosition"),textureCoordPosition:i.getAttribLocation(s,"aTextureCoord"),normalPosition:i.getAttribLocation(s,"aNormal")},uniformLocations:{projectionMatrix:i.getUniformLocation(s,"uProjectionMatrix"),modelViewMatrix:i.getUniformLocation(s,"uModelViewMatrix"),normalMatrix:i.getUniformLocation(s,"uNormalMatrix"),texture:i.getUniformLocation(s,"uTexture"),highlight:i.getUniformLocation(s,"uHighlight")}};await Kt(i);const m=f=>{he(h),requestAnimationFrame(m)};requestAnimationFrame(m)}function he(t){i.clearColor(0,0,0,1),i.clearDepth(1),i.enable(i.DEPTH_TEST),i.depthFunc(i.LEQUAL),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT);const a=i.canvas.clientHeight/i.canvas.clientWidth,r=.1,c=100,o=M();Lt(o,0,B,0,B*a,r,c);const e=Math.floor(v.x/2)-1,l=Math.floor(v.z/2)-5;for(let n=l;n<l+V*2;n++){let s=n*E;for(let h=e;h<e+B*2;h++){let m=s+h;h===U[0]&&n===U[1]?i.uniform1i(t.uniformLocations.highlight,1):i.uniform1i(t.uniformLocations.highlight,0),!(h>=E)&&!(h<0)&&!(n<0)&&!(n>=E)?tt(i,J[m],[h,n],t,o,v.cameraMatrix):tt(i,254,[h,n],t,o,v.cameraMatrix)}}}

import"./modulepreload-polyfill.b7f2da20.js";import{c as v,s as ne,f as Xe,m as We,t as I,a as Qe,i as je,b as Ze,r as z,d as G,e as H,g as se,h as ce,w as y,p as X,o as le,j as Ne,k as de,n as Je,l as Ye,$ as De}from"./vendor.eacfab9e.js";var he=`attribute vec4 aVertexPosition;
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

`,me=`varying highp vec2 vTextureCoord;
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
  
}`;function Oe(e,i){return new Promise((c,l)=>{const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const t=new Image;t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),ue(t.width)&&ue(t.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),c(n)},t.src=i})}function ue(e){return(e&e-1)==0}function w(e,i){return new Promise(async(c,l)=>{const t=await(await fetch(i)).json(),d=t.scenes[t.scene],s=await(await fetch(t.buffers[0].uri)).blob();let h=[...d.nodes],u=0,f=[],p=[],U=[],B=[];for(;u<h.length;){let Ie=p.length/3;const x=t.nodes[h[u]];if(x.children&&h.push(...x.children),x.mesh!==void 0){let g=v();if(x.scale&&ne(g,g,x.scale),x.rotation){const b=v();Xe(b,x.rotation),We(g,g,b)}x.translation&&I(g,g,x.translation);const N=t.meshes[x.mesh].primitives[0],Be=N.indices,ge=t.accessors[Be],J=t.bufferViews[ge.bufferView],Le=s.slice(J.byteOffset,J.byteOffset+J.byteLength),Ee=new Int16Array(await Le.arrayBuffer());f.push(...Ee.map(b=>b+Ie));const ye=N.attributes.POSITION,Ce=t.accessors[ye],Y=t.bufferViews[Ce.bufferView],Pe=s.slice(Y.byteOffset,Y.byteOffset+Y.byteLength),V=new Float32Array(await Pe.arrayBuffer());for(let b=0;b<V.length;b+=3){let O=[V[b],V[b+1],V[b+2]];Qe(O,O,g),p.push(...O)}const Se=N.attributes.NORMAL,Ae=t.accessors[Se],D=t.bufferViews[Ae.bufferView],_e=s.slice(D.byteOffset,D.byteOffset+D.byteLength),Ve=new Float32Array(await _e.arrayBuffer());U.push(...Ve)}u++}const Ue=await Oe(e,t.images[0].uri),ie=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ie),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW);const ae=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,ae),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),e.STATIC_DRAW);const oe=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,oe),e.bufferData(e.ARRAY_BUFFER,new Float32Array(B),e.STATIC_DRAW);const re=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,re),e.bufferData(e.ARRAY_BUFFER,new Float32Array(U),e.STATIC_DRAW),c({buffers:{index:ae,vertex:ie,texCoords:oe,normal:re},indexCount:f.length,texture:Ue})})}var ze="data:model/gltf+json;base64,eyJhc3NldCI6eyJ2ZXJzaW9uIjoiMi4wIiwiZ2VuZXJhdG9yIjoiQmxvY2tiZW5jaCA0LjEuMSBnbFRGIGV4cG9ydGVyIn0sInNjZW5lcyI6W3sibm9kZXMiOlsxXSwibmFtZSI6ImJsb2NrYmVuY2hfZXhwb3J0In1dLCJzY2VuZSI6MCwibm9kZXMiOlt7Im5hbWUiOiJwbGFuZSIsIm1lc2giOjB9LHsiY2hpbGRyZW4iOlswXX1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjowLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0OCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6MTJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo0OCwiYnl0ZUxlbmd0aCI6NDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6OTYsImJ5dGVMZW5ndGgiOjMyLCJ0YXJnZXQiOjM0OTYyLCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTI4LCJieXRlTGVuZ3RoIjoxMiwidGFyZ2V0IjozNDk2M31dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDAsInVyaSI6ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUFBUUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBZ0Q4QUFBQUFBQUFBQUFBQWdEOEFBQUFBQUFBQUFBQUFnRDhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBUHdBQWdEOEFBSUEvQUFDQVB3QUFBQUFBQUFFQUFnQUFBQUlBQXdBPSJ9XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6NCwibWF4IjpbMiwwLDBdLCJtaW4iOlswLDAsLTJdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzAsMSwwXSwibWluIjpbMCwxLDBdLCJ0eXBlIjoiVkVDMyJ9LHsiYnVmZmVyVmlldyI6MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjQsIm1heCI6WzEsMV0sIm1pbiI6WzAsMF0sInR5cGUiOiJWRUMyIn0seyJidWZmZXJWaWV3IjozLCJjb21wb25lbnRUeXBlIjo1MTIzLCJjb3VudCI6NiwibWF4IjpbM10sIm1pbiI6WzBdLCJ0eXBlIjoiU0NBTEFSIn1dLCJtYXRlcmlhbHMiOlt7InBick1ldGFsbGljUm91Z2huZXNzIjp7Im1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjEsImJhc2VDb2xvclRleHR1cmUiOnsiaW5kZXgiOjB9fSwiYWxwaGFNb2RlIjoiTUFTSyIsImFscGhhQ3V0b2ZmIjowLjA1LCJkb3VibGVTaWRlZCI6dHJ1ZX1dLCJ0ZXh0dXJlcyI6W3sic2FtcGxlciI6MCwic291cmNlIjowLCJuYW1lIjoiZ3Jhc3MifV0sInNhbXBsZXJzIjpbeyJtYWdGaWx0ZXIiOjk3MjgsIm1pbkZpbHRlciI6OTcyOCwid3JhcFMiOjMzMDcxLCJ3cmFwVCI6MzMwNzF9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsInVyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBWUFBQUJ6ZW5yMEFBQUFNa2xFUVZSWVIrM1FRUkVBQUFRQVFib2EwZFFraHM5ZWdwdk5tdDU0TEEwUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDM3dJSDRVbE9BVit2UnpVQUFBQUFTVVZPUks1Q1lJST0ifV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3sibW9kZSI6NCwiYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjB9XX1dfQ==",Ge="/taptown/assets/Road-x.25087994.gltf",He="/taptown/assets/Road-right.05535041.gltf",ke="/taptown/assets/Road-left.e4d57c46.gltf",$e="/taptown/assets/Road-y.43b84893.gltf",qe="/taptown/assets/Road-up.f33fbfbe.gltf",Ke="/taptown/assets/Road-down.3aa34828.gltf",et="/taptown/assets/Road-cross.c0149426.gltf",tt="/taptown/assets/Road-upleft.8e8e8992.gltf",it="/taptown/assets/Road-leftdown.43e4587d.gltf",at="/taptown/assets/Road-downright.2ee19715.gltf",ot="/taptown/assets/Road-rightup.f9b3a2d6.gltf",rt="/taptown/assets/Road-T.dd27be2f.gltf",nt="/taptown/assets/Road-l-.8fa437e2.gltf",st="/taptown/assets/Road--l.cec3388c.gltf",ct="/taptown/assets/Road-_l_.04dac8e2.gltf",lt="/taptown/assets/Road-single.f2299542.gltf",dt="/taptown/assets/outofbounds.8b7ad541.gltf",ht="/taptown/assets/Cafe.5a05628e.gltf";const m=[null];let fe=!1;async function we(e){m[0]=await w(e,ze),m[1]=await w(e,Ge),m[2]=await w(e,He),m[3]=await w(e,ke),m[4]=await w(e,$e),m[5]=await w(e,qe),m[6]=await w(e,Ke),m[7]=await w(e,et),m[8]=await w(e,tt),m[9]=await w(e,it),m[10]=await w(e,at),m[11]=await w(e,ot),m[12]=await w(e,rt),m[13]=await w(e,nt),m[14]=await w(e,st),m[15]=await w(e,ct),m[16]=await w(e,lt),m[254]=await w(e,dt),m[255]=await w(e,ht),fe=!0}function W(e,i,[c,l],n,t,d){if(!fe)throw"Models aren't loaded!";const r=m[i];if(!r)return;const s=v();I(s,d,[c*2,0,l*2]);{const u=3,f=e.FLOAT,p=!1,U=0,B=0;e.bindBuffer(e.ARRAY_BUFFER,r.buffers.vertex),e.vertexAttribPointer(n.attribLocations.vertexPosition,u,f,p,U,B),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}{const u=3,f=e.FLOAT,p=!1,U=0,B=0;e.bindBuffer(e.ARRAY_BUFFER,r.buffers.normal),e.vertexAttribPointer(n.attribLocations.normalPosition,u,f,p,U,B),e.enableVertexAttribArray(n.attribLocations.normalPosition)}{const u=2,f=e.FLOAT,p=!1,U=0,B=0;e.bindBuffer(e.ARRAY_BUFFER,r.buffers.texCoords),e.vertexAttribPointer(n.attribLocations.textureCoordPosition,u,f,p,U,B),e.enableVertexAttribArray(n.attribLocations.textureCoordPosition)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.buffers.index),e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,t),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,s);const h=v();je(h,s),Ze(h,h),e.uniformMatrix4fv(n.uniformLocations.normalMatrix,!1,h),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.texture),e.uniform1i(n.uniformLocations.texture,0),e.drawElements(e.TRIANGLES,r.indexCount,e.UNSIGNED_SHORT,0)}class xe{constructor(){this.x=0,this.z=0,this._pointerDown=!1,this._velocityX=0,this._velocityY=0,this._inFocusMode=!1,this.cameraMatrix=v(),I(this.cameraMatrix,this.cameraMatrix,[0,0,-3]),z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),document.addEventListener("pointerdown",i=>{this._pointerDown=!0,this._prevPointerX=i.clientX,this._prevPointerY=i.clientY}),document.addEventListener("pointerup",()=>this._pointerDown=!1),document.addEventListener("pointermove",i=>{this._pointerDown&&(this._moveCamera(i.clientX-this._prevPointerX,i.clientY-this._prevPointerY),this._velocityX=i.clientX-this._prevPointerX,this._velocityY=i.clientY-this._prevPointerY),this._prevPointerX=i.clientX,this._prevPointerY=i.clientY})}_moveCamera(i,c){if(this._inFocusMode)return;const l=i/this._pixelToTileX,n=c/this._pixelToTileZ*1.425,t=[l,n];H(t,t,[0,0],45*Math.PI/180),this.x-=t[0],this.z-=t[1],I(this.cameraMatrix,this.cameraMatrix,[t[0],0,t[1]])}setPixelToTileRatio(i,c){this._pixelToTileX=i,this._pixelToTileZ=c}update(i){let c=i/16.66667;this._pointerDown||(this._velocityX=Math.floor(Math.abs(this._velocityX)/10.25*c)*Math.sign(this._velocityX)*10*c,this._velocityY=Math.floor(Math.abs(this._velocityY)/10.25*c)*Math.sign(this._velocityY)*10*c,this._moveCamera(this._velocityX,this._velocityY))}enterFocus([i,c]){this._inFocusMode=!0;const l=Date.now(),n=()=>{let t=(Date.now()-l)/1e3;t>1&&(t=1);const d=-this.x*(1-t)+(-i*2+innerWidth/200)*t,r=-this.z*(1-t)+(-c*2+innerHeight/200)*t,s=1;this.cameraMatrix=v(),I(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),ne(this.cameraMatrix,this.cameraMatrix,[s,s,s]),I(this.cameraMatrix,this.cameraMatrix,[d,0,r]),t<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}exitFocus(){this.cameraMatrix=v(),I(this.cameraMatrix,this.cameraMatrix,[0,1,-3]),z(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),G(this.cameraMatrix,this.cameraMatrix,45*Math.PI/180),I(this.cameraMatrix,this.cameraMatrix,[-this.x,0,-this.z]),this._inFocusMode=!1}}function be(){return new Worker("/taptown/assets/ambient.6d469442.js",{type:"module"})}function pe(){return new Worker("/taptown/assets/buildings.9671986a.js",{type:"module"})}function ve(){return new Worker("/taptown/assets/people.f51a4310.js",{type:"module"})}let Q,Fe;const F=document.getElementsByTagName("canvas")[0];let C=2*(innerWidth/200),j=2*(innerHeight/200),k,S,T=new xe,L=[-100,-100];window.camera=T;F.width=innerWidth*devicePixelRatio;F.height=innerHeight*devicePixelRatio;let $=innerWidth/C,mt=innerHeight/j;T.setPixelToTileRatio($,mt);let a=F.getContext("webgl");window.addEventListener("resize",()=>{F.width=innerWidth*devicePixelRatio,F.height=innerHeight*devicePixelRatio,a.viewport(0,0,F.width,F.height),C=2*(innerWidth/200),j=2*(innerHeight/200);let e=innerWidth/C,i=innerHeight/j;T.setPixelToTileRatio(e,i)});F.addEventListener("mousemove",e=>{const i=e.clientX/$/2,c=(e.clientY-window.innerHeight)/$/2*1.425,l=[i,c];H(l,l,[0,0],45*Math.PI/180);const n=[T.x/2,T.z/2+1];se(l,l,n),ce(l,l),L=l});F.addEventListener("click",e=>{L[1]*S+L[0],Re(L[0],L[1])});ut();async function ut(){const e=y(new be);e.log();const i=y(new pe);i.log();const c=y(new ve);c.log(),await new e,Q=await new i,await Q.setCallback(X(f=>{console.log("recieved new map"),k=f,S=Math.sqrt(k.length)})),Fe=await new c,await Fe.setCallback(X(f=>{Te(f)}));const n=new URLSearchParams(location.search).get("save");n||(alert("Save not provided."),location.replace("../"));const t=await Q.loadSave(n);t||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${n} \u2022 TapTown!`,console.log(t);const d=a.createShader(a.VERTEX_SHADER);a.shaderSource(d,he),a.compileShader(d);const r=a.createShader(a.FRAGMENT_SHADER);if(a.shaderSource(r,me),a.compileShader(r),!a.getShaderParameter(d,a.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+a.getShaderInfoLog(d)),a.deleteShader(d),null;if(!a.getShaderParameter(r,a.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+a.getShaderInfoLog(r)),a.deleteShader(r),null;const s=a.createProgram();if(a.attachShader(s,d),a.attachShader(s,r),a.linkProgram(s),!a.getProgramParameter(s,a.LINK_STATUS))return alert("Unable to initialize the shader program: "+a.getProgramInfoLog(s)),null;const h={program:s,attribLocations:{vertexPosition:a.getAttribLocation(s,"aVertexPosition"),textureCoordPosition:a.getAttribLocation(s,"aTextureCoord"),normalPosition:a.getAttribLocation(s,"aNormal")},uniformLocations:{projectionMatrix:a.getUniformLocation(s,"uProjectionMatrix"),modelViewMatrix:a.getUniformLocation(s,"uModelViewMatrix"),normalMatrix:a.getUniformLocation(s,"uNormalMatrix"),texture:a.getUniformLocation(s,"uTexture"),highlight:a.getUniformLocation(s,"uHighlight")}};await we(a);const u=f=>{ft(h),requestAnimationFrame(u)};requestAnimationFrame(u)}function ft(e){a.clearColor(0,0,0,1),a.clearDepth(1),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);const i=a.canvas.clientHeight/a.canvas.clientWidth,c=.1,l=100,n=v();le(n,0,C,0,C*i,c,l);const t=Math.floor(T.x/2)-1,d=Math.floor(T.z/2)-5;for(let r=d;r<d+j*2;r++){let s=r*S;for(let h=t;h<t+C*2;h++){let u=s+h;h===L[0]&&r===L[1]?a.uniform1i(e.uniformLocations.highlight,1):a.uniform1i(e.uniformLocations.highlight,0),!(h>=S)&&!(h<0)&&!(r<0)&&!(r>=S)?W(a,k[u],[h,r],e,n,T.cameraMatrix):W(a,254,[h,r],e,n,T.cameraMatrix)}}}var wt=`.close-button {
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
}`,q=globalThis&&globalThis.__decorate||function(e,i,c,l){var n=arguments.length,t=n<3?i:l===null?l=Object.getOwnPropertyDescriptor(i,c):l,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(e,i,c,l);else for(var r=e.length-1;r>=0;r--)(d=e[r])&&(t=(n<3?d(t):n>3?d(i,c,t):d(i,c))||t);return n>3&&t&&Object.defineProperty(i,c,t),t};let A=class extends Ye{close(){this.remove()}render(){return De`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${()=>{console.log("building road"),Q.buildRoad(this.x,this.z),this.close()}}>Build Road</button>
          <button>Build Cafe</button>
        </div>
      </div>
    `}};A.styles=Ne([wt]);q([de()],A.prototype,"x",void 0);q([de()],A.prototype,"z",void 0);A=q([Je("tt-tile")],A);const xt=document.querySelector(".money"),bt=document.querySelector(".population");function Te(e){xt.textContent=`$${e.money}`,bt.textContent=`${e.population}`}function Re(e,i){const c=document.createElement("tt-tile");c.x=e,c.z=i,document.body.appendChild(c)}let K,Me;const R=document.getElementsByTagName("canvas")[0];let P=2*(innerWidth/200),Z=2*(innerHeight/200),ee,_,M=new xe,E=[-100,-100];window.camera=M;R.width=innerWidth*devicePixelRatio;R.height=innerHeight*devicePixelRatio;let te=innerWidth/P,pt=innerHeight/Z;M.setPixelToTileRatio(te,pt);let o=R.getContext("webgl");window.addEventListener("resize",()=>{R.width=innerWidth*devicePixelRatio,R.height=innerHeight*devicePixelRatio,o.viewport(0,0,R.width,R.height),P=2*(innerWidth/200),Z=2*(innerHeight/200);let e=innerWidth/P,i=innerHeight/Z;M.setPixelToTileRatio(e,i)});R.addEventListener("mousemove",e=>{const i=e.clientX/te/2,c=(e.clientY-window.innerHeight)/te/2*1.425,l=[i,c];H(l,l,[0,0],45*Math.PI/180);const n=[M.x/2,M.z/2+1];se(l,l,n),ce(l,l),E=l});R.addEventListener("click",e=>{E[1]*_+E[0],Re(E[0],E[1])});vt();async function vt(){const e=y(new be);e.log();const i=y(new pe);i.log();const c=y(new ve);c.log(),await new e,K=await new i,await K.setCallback(X(f=>{console.log("recieved new map"),ee=f,_=Math.sqrt(ee.length)})),Me=await new c,await Me.setCallback(X(f=>{Te(f)}));const n=new URLSearchParams(location.search).get("save");n||(alert("Save not provided."),location.replace("../"));const t=await K.loadSave(n);t||(alert("Save couldn't be loaded."),location.replace("../")),document.title=`\u{1F3E0} ${n} \u2022 TapTown!`,console.log(t);const d=o.createShader(o.VERTEX_SHADER);o.shaderSource(d,he),o.compileShader(d);const r=o.createShader(o.FRAGMENT_SHADER);if(o.shaderSource(r,me),o.compileShader(r),!o.getShaderParameter(d,o.COMPILE_STATUS))return alert("An error occurred compiling the vert shaders: "+o.getShaderInfoLog(d)),o.deleteShader(d),null;if(!o.getShaderParameter(r,o.COMPILE_STATUS))return alert("An error occurred compiling the frag shaders: "+o.getShaderInfoLog(r)),o.deleteShader(r),null;const s=o.createProgram();if(o.attachShader(s,d),o.attachShader(s,r),o.linkProgram(s),!o.getProgramParameter(s,o.LINK_STATUS))return alert("Unable to initialize the shader program: "+o.getProgramInfoLog(s)),null;const h={program:s,attribLocations:{vertexPosition:o.getAttribLocation(s,"aVertexPosition"),textureCoordPosition:o.getAttribLocation(s,"aTextureCoord"),normalPosition:o.getAttribLocation(s,"aNormal")},uniformLocations:{projectionMatrix:o.getUniformLocation(s,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(s,"uModelViewMatrix"),normalMatrix:o.getUniformLocation(s,"uNormalMatrix"),texture:o.getUniformLocation(s,"uTexture"),highlight:o.getUniformLocation(s,"uHighlight")}};await we(o);const u=f=>{Ft(h),requestAnimationFrame(u)};requestAnimationFrame(u)}function Ft(e){o.clearColor(0,0,0,1),o.clearDepth(1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);const i=o.canvas.clientHeight/o.canvas.clientWidth,c=.1,l=100,n=v();le(n,0,P,0,P*i,c,l);const t=Math.floor(M.x/2)-1,d=Math.floor(M.z/2)-5;for(let r=d;r<d+Z*2;r++){let s=r*_;for(let h=t;h<t+P*2;h++){let u=s+h;h===E[0]&&r===E[1]?o.uniform1i(e.uniformLocations.highlight,1):o.uniform1i(e.uniformLocations.highlight,0),!(h>=_)&&!(h<0)&&!(r<0)&&!(r>=_)?W(o,ee[u],[h,r],e,n,M.cameraMatrix):W(o,254,[h,r],e,n,M.cameraMatrix)}}}

(function(){"use strict";const w=Symbol("Comlink.proxy"),M=Symbol("Comlink.endpoint"),R=Symbol("Comlink.releaseProxy"),E=Symbol("Comlink.thrown"),P=e=>typeof e=="object"&&e!==null||typeof e=="function",T={canHandle:e=>P(e)&&e[w],serialize(e){const{port1:t,port2:r}=new MessageChannel;return y(e,t),[r,[r]]},deserialize(e){return e.start(),A(e)}},C={canHandle:e=>P(e)&&E in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},S=new Map([["proxy",T],["throw",C]]);function y(e,t=self){t.addEventListener("message",function r(a){if(!a||!a.data)return;const{id:u,type:f,path:n}=Object.assign({path:[]},a.data),i=(a.data.argumentList||[]).map(m);let s;try{const o=n.slice(0,-1).reduce((c,d)=>c[d],e),l=n.reduce((c,d)=>c[d],e);switch(f){case"GET":s=l;break;case"SET":o[n.slice(-1)[0]]=m(a.data.value),s=!0;break;case"APPLY":s=l.apply(o,i);break;case"CONSTRUCT":{const c=new l(...i);s=_(c)}break;case"ENDPOINT":{const{port1:c,port2:d}=new MessageChannel;y(e,d),s=H(c,[c])}break;case"RELEASE":s=void 0;break;default:return}}catch(o){s={value:o,[E]:0}}Promise.resolve(s).catch(o=>({value:o,[E]:0})).then(o=>{const[l,c]=b(o);t.postMessage(Object.assign(Object.assign({},l),{id:u}),c),f==="RELEASE"&&(t.removeEventListener("message",r),k(t))})}),t.start&&t.start()}function O(e){return e.constructor.name==="MessagePort"}function k(e){O(e)&&e.close()}function A(e,t){return p(e,[],t)}function h(e){if(e)throw new Error("Proxy has been released and is not useable")}function p(e,t=[],r=function(){}){let a=!1;const u=new Proxy(r,{get(f,n){if(h(a),n===R)return()=>g(e,{type:"RELEASE",path:t.map(i=>i.toString())}).then(()=>{k(e),a=!0});if(n==="then"){if(t.length===0)return{then:()=>u};const i=g(e,{type:"GET",path:t.map(s=>s.toString())}).then(m);return i.then.bind(i)}return p(e,[...t,n])},set(f,n,i){h(a);const[s,o]=b(i);return g(e,{type:"SET",path:[...t,n].map(l=>l.toString()),value:s},o).then(m)},apply(f,n,i){h(a);const s=t[t.length-1];if(s===M)return g(e,{type:"ENDPOINT"}).then(m);if(s==="bind")return p(e,t.slice(0,-1));const[o,l]=L(i);return g(e,{type:"APPLY",path:t.map(c=>c.toString()),argumentList:o},l).then(m)},construct(f,n){h(a);const[i,s]=L(n);return g(e,{type:"CONSTRUCT",path:t.map(o=>o.toString()),argumentList:i},s).then(m)}});return u}function N(e){return Array.prototype.concat.apply([],e)}function L(e){const t=e.map(b);return[t.map(r=>r[0]),N(t.map(r=>r[1]))]}const x=new WeakMap;function H(e,t){return x.set(e,t),e}function _(e){return Object.assign(e,{[w]:!0})}function b(e){for(const[t,r]of S)if(r.canHandle(e)){const[a,u]=r.serialize(e);return[{type:"HANDLER",name:t,value:a},u]}return[{type:"RAW",value:e},x.get(e)||[]]}function m(e){switch(e.type){case"HANDLER":return S.get(e.name).deserialize(e.value);case"RAW":return e.value}}function g(e,t,r){return new Promise(a=>{const u=j();e.addEventListener("message",function f(n){!n.data||!n.data.id||n.data.id!==u||(e.removeEventListener("message",f),a(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:u},t),r)})}function j(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}class V{constructor(t,r){y(this,r),this.people=A(t),this.people.test("ambient")}static log(){console.log("ambient worker running")}}y(V)})();
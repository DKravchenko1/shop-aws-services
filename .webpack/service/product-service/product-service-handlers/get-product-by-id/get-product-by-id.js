(()=>{var e={24:e=>{e.exports={entities:[{id:"1",title:"entity-1",count:1,description:"entity-description-1",price:1},{id:"2",title:"entity-2",count:2,description:"entity-description-2",price:2},{id:"3",title:"entity-3",count:3,description:"entity-description-3",price:3},{id:"4",title:"entity-4",count:4,description:"entity-description-4",price:4},{id:"5",title:"entity-5",count:5,description:"entity-description-5",price:5}]}}},t={};function r(i){var o=t[i];if(void 0!==o)return o.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{"use strict";r.r(i),r.d(i,{handler:()=>n});var e=r(24);const t={"Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"OPTIONS,POST,GET"},o=async r=>{try{const{id:o}=r?.pathParameters,n=await(async t=>await e.entities.find((e=>e.id===t)))(o);return n?(i=n,{statusCode:200,headers:t,body:JSON.stringify(i)}):{statusCode:404,body:"Product item is not found",headers:t}}catch(e){return(e=>({statusCode:500,body:JSON.stringify(e),message:"Internal server error",headers:t}))(e)}var i},n=async e=>o(e)})();var o=exports;for(var n in i)o[n]=i[n];i.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();
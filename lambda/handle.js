!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}({11:function(e,t){t.handler=(e,t,r)=>{if("POST"===e.httpMethod){const t=n(e.body);r(null,{statusCode:t.success?201:400,body:JSON.stringify(t)})}else r(null,{statusCode:404,body:"Method not allowed"})};const n=e=>{try{let{handle:t}=JSON.parse(e);if(!t)throw{client:!0,message:"handle is required"};if("string"!=typeof t)throw{client:!0,message:"handle must be a string"};if(t=t.trimStart().trimEnd(),t.length<2)throw{client:!0,message:"handle is too short"};return{success:!0,data:{handle:t}}}catch(e){return{success:!1,data:{error:e.client?e.message:"Failed to save handle",detail:e.client?void 0:e.message}}}}}}));
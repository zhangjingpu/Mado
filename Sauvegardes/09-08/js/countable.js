(function(e){"use strict";function r(e){var t=[],n=0,r=e.length,i,s;while(n<r){i=e.charCodeAt(n++);if((i&63488)==55296&&n<r){s=e.charCodeAt(n++);if((s&64512)==56320){t.push(((i&1023)<<10)+(s&1023)+65536)}else{t.push(i,s)}}else{t.push(i)}}return t}function i(e,t){var n=e&&(Object.prototype.toString.call(e)==="[object NodeList]"&&e.length||e.nodeType===1),r=t&&typeof t==="function";if("console"in window&&"warn"in console){if(!n)console.warn("Countable: No valid elements were found");if(!r)console.warn('Countable: "'+t+'" is not a valid callback function')}return n&&r}function s(e){var t={hardReturns:false,stripTags:false};for(var n in e){if(t.hasOwnProperty(n))t[n]=e[n]}return t}function o(e,t){var n="value"in e?e.value:e.innerText||e.textContent,i;if(t.stripTags)n=n.replace(/<\/?[a-z][^>]*>/gi,"");i=n.trim();return{paragraphs:i?(i.match(t.hardReturns?/\n{2,}/g:/\n+/g)||[]).length+1:0,words:i?(i.replace(/['";:,.?¿\-!¡]+/g,"").match(/\S+/g)||[]).length:0,characters:i?r(i.replace(/\s/g,"")).length:0,all:r(n.replace(/[\n\r]/g,"")).length}}function u(e,t){var n=e.length;if(typeof n!=="undefined"){while(n--){t(e[n])}}else{t(e)}}var t=[],n="oninput"in document?"input":"keyup";if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}var a={live:function(e,r,a){var f=s(a),l=function(e){var i=function(){r.call(e,o(e,f))};t.push({element:e,handler:i});i();if(e.addEventListener){e.addEventListener(n,i,false)}else if(e.attachEvent){e.attachEvent("on"+n,i)}};if(!i(e,r))return;if(e.length){u(e,l)}else{l(e)}return this},die:function(e){if(!i(e,function(){}))return;u(e,function(e){var r;u(t,function(t){if(t.element===e)r=t});if(!r)return;if(e.removeEventListener){e.removeEventListener(n,r.handler,false)}else if(e.detachEvent){e.detachEvent("on"+n,r.handler)}t.splice(t.indexOf(r),1)});return this},once:function(e,t,n){if(!i(e,t))return;u(e,function(e){t.call(e,o(e,s(n)))});return this},enabled:function(e){var n=false;if(e&&e.nodeType===1){u(t,function(t){if(t.element===e)n=true})}return n}};if(typeof exports==="object"){module.exports=a}else if(typeof define==="function"&&define.amd){define(function(){return a})}else{e.Countable=a}})(this)
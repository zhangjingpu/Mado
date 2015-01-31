/**
* @license Rangy Inputs, a jQuery plug-in for selection and caret manipulation within textareas and text inputs.
*
* https://github.com/timdown/rangyinputs
*
* For range and selection features for contenteditable, see Rangy.

* http://code.google.com/p/rangy/
*
* Depends on jQuery 1.0 or later.
*
* Copyright 2014, Tim Down
* Licensed under the MIT license.
* Version: 1.2.0
* Build date: 30 November 2014
*/
!function(e){function t(e,t){var n=typeof e[t];return"function"===n||!("object"!=n||!e[t])||"unknown"==n}function n(e,t){return typeof e[t]!=x}function r(e,t){return!("object"!=typeof e[t]||!e[t])}function o(e){window.console&&window.console.log&&window.console.log("RangyInputs not supported in your browser. Reason: "+e)}function a(e,t,n){return 0>t&&(t+=e.value.length),typeof n==x&&(n=t),0>n&&(n+=e.value.length),{start:t,end:n}}function c(e,t,n){return{start:t,end:n,length:n-t,text:e.value.slice(t,n)}}function l(){return r(document,"body")?document.body:document.getElementsByTagName("body")[0]}var i,u,s,d,f,v,p,m,g,x="undefined";e(document).ready(function(){function h(e,t){var n=e.value,r=i(e),o=r.start;return{value:n.slice(0,o)+t+n.slice(r.end),index:o,replaced:r.text}}function y(e,t){e.focus();var n=i(e);return u(e,n.start,n.end),""==t?document.execCommand("delete",!1,null):document.execCommand("insertText",!1,t),{replaced:n.text,index:n.start}}function T(e,t){e.focus();var n=h(e,t);return e.value=n.value,n}function E(e,t){return function(){var n=this.jquery?this[0]:this,r=n.nodeName.toLowerCase();if(1==n.nodeType&&("textarea"==r||"input"==r&&/^(?:text|email|number|search|tel|url|password)$/i.test(n.type))){var o=[n].concat(Array.prototype.slice.call(arguments)),a=e.apply(this,o);if(!t)return a}return t?this:void 0}}var S=document.createElement("textarea");if(l().appendChild(S),n(S,"selectionStart")&&n(S,"selectionEnd"))i=function(e){var t=e.selectionStart,n=e.selectionEnd;return c(e,t,n)},u=function(e,t,n){var r=a(e,t,n);e.selectionStart=r.start,e.selectionEnd=r.end},g=function(e,t){t?e.selectionEnd=e.selectionStart:e.selectionStart=e.selectionEnd};else{if(!(t(S,"createTextRange")&&r(document,"selection")&&t(document.selection,"createRange")))return l().removeChild(S),void o("No means of finding text input caret position");i=function(e){var t,n,r,o,a=0,l=0,i=document.selection.createRange();return i&&i.parentElement()==e&&(r=e.value.length,t=e.value.replace(/\r\n/g,"\n"),n=e.createTextRange(),n.moveToBookmark(i.getBookmark()),o=e.createTextRange(),o.collapse(!1),n.compareEndPoints("StartToEnd",o)>-1?a=l=r:(a=-n.moveStart("character",-r),a+=t.slice(0,a).split("\n").length-1,n.compareEndPoints("EndToEnd",o)>-1?l=r:(l=-n.moveEnd("character",-r),l+=t.slice(0,l).split("\n").length-1))),c(e,a,l)};var w=function(e,t){return t-(e.value.slice(0,t).split("\r\n").length-1)};u=function(e,t,n){var r=a(e,t,n),o=e.createTextRange(),c=w(e,r.start);o.collapse(!0),r.start==r.end?o.move("character",c):(o.moveEnd("character",w(e,r.end)),o.moveStart("character",c)),o.select()},g=function(e,t){var n=document.selection.createRange();n.collapse(t),n.select()}}l().removeChild(S);var b=function(e,t){var n=h(e,t);try{var r=y(e,t);if(e.value==n.value)return b=y,r}catch(o){}return b=T,e.value=n.value,n};d=function(e,t,n,r){t!=n&&(u(e,t,n),b(e,"")),r&&u(e,t)},s=function(e){u(e,b(e,"").index)},m=function(e){var t=b(e,"");return u(e,t.index),t.replaced};var R=function(e,t,n,r){var o=t+n.length;if(r="string"==typeof r?r.toLowerCase():"",("collapsetoend"==r||"select"==r)&&/[\r\n]/.test(n)){var a=n.replace(/\r\n/g,"\n").replace(/\r/g,"\n");o=t+a.length;var c=t+a.indexOf("\n");"\r\n"==e.value.slice(c,c+2)&&(o+=a.match(/\n/g).length)}switch(r){case"collapsetostart":u(e,t,t);break;case"collapsetoend":u(e,o,o);break;case"select":u(e,t,o)}};f=function(e,t,n,r){u(e,n),b(e,t),"boolean"==typeof r&&(r=r?"collapseToEnd":""),R(e,n,t,r)},v=function(e,t,n){var r=b(e,t);R(e,r.index,t,n||"collapseToEnd")},p=function(e,t,n,r){typeof n==x&&(n=t);var o=i(e),a=b(e,t+o.text+n);R(e,a.index+t.length,o.text,r||"select")},e.fn.extend({getSelection:E(i,!1),setSelection:E(u,!0),collapseSelection:E(g,!0),deleteSelectedText:E(s,!0),deleteText:E(d,!0),extractSelectedText:E(m,!1),insertText:E(f,!0),replaceSelectedText:E(v,!0),surroundSelectedText:E(p,!0)})})}(jQuery);

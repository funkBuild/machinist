!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/machinist/",r(r.s=3)}([function(t,e,r){t.exports=r(1)},function(t,e,r){var n=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r(2),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(a){n.regeneratorRuntime=void 0}},function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag",c="object"===typeof t,f=e.regeneratorRuntime;if(f)c&&(t.exports=f);else{(f=e.regeneratorRuntime=c?t.exports:{}).wrap=x;var l="suspendedStart",h="suspendedYield",p="executing",y="completed",v={},m={};m[a]=function(){return this};var d=Object.getPrototypeOf,g=d&&d(d(M([])));g&&g!==n&&o.call(g,a)&&(m=g);var w=E.prototype=k.prototype=Object.create(m);S.prototype=w.constructor=E,E.constructor=S,E[u]=S.displayName="GeneratorFunction",f.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===S||"GeneratorFunction"===(e.displayName||e.name))},f.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},f.awrap=function(t){return{__await:t}},P(L.prototype),L.prototype[s]=function(){return this},f.AsyncIterator=L,f.async=function(t,e,r,n){var o=new L(x(t,e,r,n));return f.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},P(w),w[u]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},f.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},f.values=M,z.prototype={constructor:z,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return s.type="throw",s.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:M(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function x(t,e,r,n){var o=e&&e.prototype instanceof k?e:k,i=Object.create(o.prototype),a=new z(n||[]);return i._invoke=function(t,e,r){var n=l;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return C()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=O(a,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=b(t,e,r);if("normal"===u.type){if(n=r.done?y:h,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function b(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function k(){}function S(){}function E(){}function P(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function L(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var s=b(t[r],t,n);if("throw"!==s.type){var u=s.arg,c=u.value;return c&&"object"===typeof c&&o.call(c,"__await")?Promise.resolve(c.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(c).then(function(t){u.value=t,i(u)},function(t){return e("throw",t,i,a)})}a(s.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function O(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=b(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,v;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,v):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function z(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function M(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:C}}function C(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n);function i(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(c){return void r(c)}s.done?e(u):Promise.resolve(u).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise(function(n,o){var a=t.apply(e,r);function s(t){i(a,n,o,s,u,"next",t)}function u(t){i(a,n,o,s,u,"throw",t)}s(void 0)})}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t,e,r){return e&&u(t.prototype,e),r&&u(t,r),t}function f(t){return new Promise(function(e){return setTimeout(e,t)})}var l=function(){function t(e,r,n){s(this,t),this.worker=e,this.simCore=e.simCore,this.pathBuffer=r,this.updateInterval=n,this.totalSegments=this.pathBuffer.length/4,this.running=!1}return c(t,[{key:"run",value:function(){var t=a(o.a.mark(function t(){var e;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.startPolygonEmitter(),e=0;case 2:if(!(e<this.totalSegments)){t.next=8;break}return t.next=5,this.runSegment(e);case 5:e++,t.next=2;break;case 8:this.stopPolygonEmitter();case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"startPolygonEmitter",value:function(){var t=this;this._polygoneEmitter=setInterval(function(){var e=t.simCore.getPolygons();t.worker.sendPolygonUpdate(e)},this.updateInterval)}},{key:"stopPolygonEmitter",value:function(){clearInterval(this._polygoneEmitter)}},{key:"getSegment",value:function(t){var e=4*(t-1),r=4*t;return{start:{x:this.pathBuffer[e+1],y:this.pathBuffer[e+2],z:this.pathBuffer[e+3]},end:{x:this.pathBuffer[r+1],y:this.pathBuffer[r+2],z:this.pathBuffer[r+3]}}}},{key:"runSegment",value:function(){var t=a(o.a.mark(function t(e){var r,n,i,a,s,u,c;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=this.getSegment(e),n=r.start,i=r.end,a={x:i.x-n.x,y:i.y-n.y,z:i.z-n.z},s={x:n.x,y:n.y,z:n.z},u=Math.sqrt(a.x*a.x+a.y*a.y+a.z*a.z)/.1,a.x/=u,a.y/=u,a.z/=u,c=0;case 8:if(!(c<u)){t.next=18;break}return s.x+=a.x,s.y+=a.y,s.z+=a.z,this.worker.simCore.toolCollision(s),t.next=15,f(1);case 15:c++,t.next=8;break;case 18:case 19:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}]),t}();self.importScripts("/main.js"),Module.onRuntimeInitialized=function(){new(function(){function t(){s(this,t),onmessage=this.onMessage.bind(this),postMessage({type:"ready"})}return c(t,[{key:"onMessage",value:function(t){var e=t.data;switch(e.action){case"initSimulation":this.initSimulation(e);break;case"setTool":this.setSimTool(e);break;case"toolCollision":this.doToolCollision(e);break;case"getSimPolygons":this.getSimPolygons(e);break;case"runOperationSimulation":this.runOperationSimulation(e);break;default:console.log("Unknown message type")}}},{key:"initSimulation",value:function(){var t=a(o.a.mark(function t(e){var r,n,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=e.id,n=e.params,i=n.stock,this.simCore=new Module.SimulateCore(i.size.x,i.size.y,i.size.z),postMessage({id:r,params:{}});case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"setSimTool",value:function(){var t=a(o.a.mark(function t(e){var r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=e.id,n=e.params,this.simCore.setTool(n.tool),postMessage({id:r,params:{}});case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"getSimPolygons",value:function(){var t=a(o.a.mark(function t(e){var r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=e.id,n=this.simCore.getPolygons(),postMessage({id:r,params:n});case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"doToolCollision",value:function(){var t=a(o.a.mark(function t(e){var r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=e.id,n=e.params,this.simCore.toolCollision(n.toolPosition),postMessage({id:r,params:{}});case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"runOperationSimulation",value:function(){var t=a(o.a.mark(function t(e){var r,n,i,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.id,n=e.params,i=Date.now(),this.simCore.setTool(n.tool),postMessage({id:r,params:{}}),this.simulation=new l(this,n.pathBuffer,n.updateInterval),t.next=7,this.simulation.run();case 7:a=Date.now()-i,console.log("Sim done in ".concat(a," ms")),postMessage({type:"simFinished",params:{}});case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"sendPolygonUpdate",value:function(){var t=a(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:postMessage({event:"polygonUpdate",params:{polygonBuffer:e}});case 1:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()}]),t}())}}]);
//# sourceMappingURL=3f01e2f2591ae1c410f1.worker.js.map
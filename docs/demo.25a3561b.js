parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QVnC":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3];!function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"==typeof module,h=t.regeneratorRuntime;if(h)u&&(module.exports=h);else{(h=t.regeneratorRuntime=u?module.exports:{}).wrap=w;var f="suspendedStart",s="suspendedYield",l="executing",p="completed",y={},v={};v[i]=function(){return this};var d=Object.getPrototypeOf,g=d&&d(d(P([])));g&&g!==e&&n.call(g,i)&&(v=g);var m=b.prototype=x.prototype=Object.create(v);E.prototype=m.constructor=b,b.constructor=E,b[c]=E.displayName="GeneratorFunction",h.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===E||"GeneratorFunction"===(r.displayName||r.name))},h.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(m),t},h.awrap=function(t){return{__await:t}},_(j.prototype),j.prototype[a]=function(){return this},h.AsyncIterator=j,h.async=function(t,r,e,n){var o=new j(w(t,r,e,n));return h.isGeneratorFunction(r)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(m),m[c]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},h.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},h.values=P,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(G),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),h=n.call(a,"finallyLoc");if(u&&h){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!h)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),G(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;G(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}}}function w(t,r,e,n){var o=r&&r.prototype instanceof x?r:x,i=Object.create(o.prototype),a=new N(n||[]);return i._invoke=function(t,r,e){var n=f;return function(o,i){if(n===l)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return F()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=O(a,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===f)throw n=p,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=l;var u=L(t,r,e);if("normal"===u.type){if(n=e.done?p:s,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=p,e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function L(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}function x(){}function E(){}function b(){}function _(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function j(t){var r;this._invoke=function(e,o){function i(){return new Promise(function(r,i){!function r(e,o,i,a){var c=L(t[e],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?Promise.resolve(h.__await).then(function(t){r("next",t,i,a)},function(t){r("throw",t,i,a)}):Promise.resolve(h).then(function(t){u.value=t,i(u)},function(t){return r("throw",t,i,a)})}a(c.arg)}(e,o,r,i)})}return r=r?r.then(i,i):i()}}function O(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=L(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function k(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function G(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:F}}function F(){return{value:r,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")());
},{}],"QYzI":[function(require,module,exports) {
var e=function(){return this||"object"==typeof self&&self}()||Function("return this")(),r=e.regeneratorRuntime&&Object.getOwnPropertyNames(e).indexOf("regeneratorRuntime")>=0,t=r&&e.regeneratorRuntime;if(e.regeneratorRuntime=void 0,module.exports=require("./runtime"),r)e.regeneratorRuntime=t;else try{delete e.regeneratorRuntime}catch(n){e.regeneratorRuntime=void 0}
},{"./runtime":"QVnC"}],"PMvg":[function(require,module,exports) {
module.exports=require("regenerator-runtime");
},{"regenerator-runtime":"QYzI"}],"0fcM":[function(require,module,exports) {
function n(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}module.exports=n;
},{}],"P8NW":[function(require,module,exports) {
function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function r(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}module.exports=r;
},{}],"Xyu5":[function(require,module,exports) {
"use strict";function e(e){return new Promise(function(t){return setTimeout(t,e)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.timer=e;
},{}],"6NdL":[function(require,module,exports) {
"use strict";var t=s(require("@babel/runtime/regenerator")),e=s(require("@babel/runtime/helpers/classCallCheck")),i=s(require("@babel/runtime/helpers/createClass"));function s(t){return t&&t.__esModule?t:{default:t}}var r=function(t,e,i,s){return new(i||(i=Promise))(function(r,n){function a(t){try{u(s.next(t))}catch(e){n(e)}}function o(t){try{u(s.throw(t))}catch(e){n(e)}}function u(t){t.done?r(t.value):new i(function(e){e(t.value)}).then(a,o)}u((s=s.apply(t,e||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./utils"),a=function(){function s(t,i){(0,e.default)(this,s),this._timeout=!1,this._stop=!1,this._paused=!1,this._time=0,this._running=!1;if(this.options=Object.assign({},{autoplay:0,prev:!0,next:!0,progress:!1,loop:!1},i),this.carousel=t,this.controller=this.carousel.querySelector(".carousel__controller"),this.items=this.carousel.querySelectorAll(".carousel__items .item"),this.nodes=Array.from(this.items),this.maxLength=this.items.length,this.maxArrayLength=this.maxLength-1,this.maxLength<=1)throw new Error("You must have at least two items in your carousel!");this.carousel.querySelector(".carousel__items .item.active")||this.items[0].classList.add("active"),this.activeItem=this.carousel.querySelector(".carousel__items .item.active"),this.buildHeight(),this.createKey(),this.initCtrl()}return(0,i.default)(s,[{key:"initCtrl",value:function(){return r(this,void 0,void 0,t.default.mark(function e(){var i,s,r,n,a,o=this;return t.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.controller){t.next=2;break}throw new Error("You must have a controller element if you want to use controlls!");case 2:if(!this.options.progress){t.next=5;break}return t.next=5,this.createProgress();case 5:if(!this.options.prev||!this.controller){t.next=12;break}if(i=this.controller.querySelector(".prev")){t.next=11;break}return t.next=10,this.createPrev();case 10:i=t.sent;case 11:i.addEventListener("click",function(){o.stop(),o.prevItem()});case 12:if(!this.options.next||!this.controller){t.next=19;break}if(s=this.controller.querySelector(".next")){t.next=18;break}return t.next=17,this.createNext();case 17:s=t.sent;case 18:s.addEventListener("click",function(){o.stop(),o.nextItem()});case 19:(r=this.controller.querySelector(".play"))&&r.addEventListener("click",function(){o.play()}),(n=this.controller.querySelector(".pause"))&&n.addEventListener("click",function(){o.pause()}),(a=this.controller.querySelector(".stop"))&&a.addEventListener("click",function(){o.stop()}),this.options.autoplay&&("number"!=typeof this.options.autoplay?console.error("Autoplay must be type of number!"):this.options.autoplay<=500?console.error("Autoplay must be higher then 500!"):this.autoplay());case 26:case"end":return t.stop()}},e,this)}))}},{key:"mouseOver",value:function(){console.log("PAUSE")}},{key:"mouseOut",value:function(){console.log("START")}},{key:"read",value:function(){return(new Date).getTime()-this._time}},{key:"autoplay",value:function(){this._timeout=this.options.autoplay,this._stop=!1,this._paused=!1,this._time=0,this._running=!1,this.autoplayNext()}},{key:"pause",value:function(){if(!this._paused||this._running){var t=(new Date).getTime()-this._time;this._timeout=Math.round(Number(this._timeout)-t)+1,this._paused=!0,this._running=!1,this._time=0}}},{key:"play",value:function(){!this._paused&&this._running||(this._paused=!1,this.autoplayNext())}},{key:"autoplayNext",value:function(){return r(this,void 0,void 0,t.default.mark(function e(){var i,s;return t.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this._running){t.next=2;break}return t.abrupt("return");case 2:this._running=!0,this._time=(new Date).getTime(),i=this.nodes.indexOf(this.activeItem),this.options.progress&&this.startProgress(i),s=0;case 7:if(s===Math.round(Number(this._timeout)/100)){t.next=17;break}return t.next=10,n.timer(100);case 10:if(!this._stop&&!this._paused){t.next=12;break}return t.abrupt("return");case 12:if(!document.hidden){t.next=14;break}return t.abrupt("continue",7);case 14:s++,t.next=7;break;case 17:this._running=!1,this._timeout=this.options.autoplay,i!==this.maxArrayLength&&(this.nextItem(),this.autoplayNext()),this.options.loop&&i===this.maxArrayLength&&(this.nextItem(),this.autoplay());case 21:case"end":return t.stop()}},e,this)}))}},{key:"stop",value:function(){var t=this;this._stop=!0,this._running=!1;var e=this.controller.querySelector(".progress .item.active");e&&(e.getElementsByTagName("div")[0].style.width="0%");this.options.autoplay&&(clearTimeout(this._call),this._call=setTimeout(function(){t.autoplay()},1e3))}},{key:"createKey",value:function(){for(var t=0;t<this.maxLength;t++)this.items[t].setAttribute("index",t.toString())}},{key:"buildHeight",value:function(){for(var t=0,e=0;e<this.maxLength;e++){var i=this.items[e].getElementsByClassName("inner")[0].offsetHeight;i>t&&(t=i)}this.carousel.getElementsByClassName("carousel__items")[0].style.height="".concat(t,"px")}},{key:"createProgress",value:function(){var t=this.controller.getElementsByClassName("progress")[0];t||((t=document.createElement("div")).classList.add("progress"),t=this.controller.appendChild(t));for(var e=0;e<this.maxLength;e++){var i=document.createElement("div");i.classList.add("item");var s=document.createElement("div");i.appendChild(s),t.appendChild(i)}}},{key:"startProgress",value:function(e){return r(this,void 0,void 0,t.default.mark(function i(){var s,r;return t.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:s=Math.round(Number(this._timeout)/Number(this.options.autoplay)*100),r=100===s?0:-1*(s-100);case 2:if(!(r<=100)){t.next=14;break}return t.next=5,n.timer(Number(this.options.autoplay)/100);case 5:if(this._stop&&this.moveProgress(0,e),!document.hidden){t.next=8;break}return t.abrupt("continue",2);case 8:if(!this._stop&&!this._paused){t.next=10;break}return t.abrupt("break",14);case 10:this.moveProgress(r,e),r++,t.next=2;break;case 14:case"end":return t.stop()}},i,this)}))}},{key:"moveProgress",value:function(t,e){var i=this.controller.querySelector(".progress .item.active");i&&i.classList.remove("acitve");var s=this.controller.querySelectorAll(".progress .item")[e];s.classList.add("active");var r=s.getElementsByTagName("div")[0];s.classList.remove("transition"),r.style.width="".concat(t,"%"),100===t&&(s.classList.add("transition"),r.style.width="0%")}},{key:"createPrev",value:function(){var t=document.createElement("div");return t.classList.add("prev"),"string"==typeof this.options.prev?t.innerHTML=this.options.prev:t.innerText="←",this.controller.appendChild(t)}},{key:"createNext",value:function(){var t=document.createElement("div");return t.classList.add("next"),"string"==typeof this.options.next?t.innerHTML=this.options.next:t.innerText="→",this.controller.appendChild(t)}},{key:"nextItem",value:function(){if(!document.hidden){this.activeItem.classList.remove("active");var t=this.nodes.indexOf(this.activeItem),e=t===this.maxArrayLength?0:t+1,i=this.items[e];i.classList.add("active"),this.activeItem=i}}},{key:"prevItem",value:function(){if(!document.hidden){this.activeItem.classList.remove("active");var t=this.nodes.indexOf(this.activeItem),e=t-1<0?this.maxArrayLength:t-1,i=this.items[e];i.classList.add("active"),this.activeItem=i}}}]),s}();exports.default=a;
},{"@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/classCallCheck":"0fcM","@babel/runtime/helpers/createClass":"P8NW","./utils":"Xyu5"}],"EWEi":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("../src/carousel"));!function(){var e=document.getElementsByClassName("carousel")[0];new t.default(e,{autoplay:2e3,prev:!0,next:!0,progress:!0,loop:!0})}();
},{"../src/carousel":"6NdL"}]},{},["EWEi"], null)
//# sourceMappingURL=/demo.25a3561b.js.map
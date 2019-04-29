/*!
 * VanillaCarousel v1.4.0
 * https://github.com/muuvmuuv/vanilla-carousel
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 2019-04-29T12:35:39.069Z
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).VanillaCarousel=e()}(this,function(){"use strict";function t(t,e,s,i){return new(s||(s=Promise))(function(o,r){function n(t){try{h(i.next(t))}catch(t){r(t)}}function a(t){try{h(i.throw(t))}catch(t){r(t)}}function h(t){t.done?o(t.value):new s(function(e){e(t.value)}).then(n,a)}h((i=i.apply(t,e||[])).next())})}function e(t){return new Promise(e=>setTimeout(e,t))}return class{constructor(t,e){if(this._timeout=!1,this._stop=!1,this._paused=!1,this._time=0,this._running=!1,this.options=Object.assign({},{autoplay:0,prev:!0,next:!0,progress:!1,loop:!1},e),this.carousel=t,this.controller=this.carousel.querySelector(".carousel__controller"),this.items=this.carousel.querySelectorAll(".carousel__items .item"),this.nodes=Array.from(this.items),this.maxLength=this.items.length,this.maxArrayLength=this.maxLength-1,this.maxLength<=1)throw new Error("You must have at least two items in your carousel!");this.carousel.querySelector(".carousel__items .item.active")||this.items[0].classList.add("active"),this.activeItem=this.carousel.querySelector(".carousel__items .item.active"),this.buildHeight(),this.createKey(),this.initCtrl()}initCtrl(){return t(this,void 0,void 0,function*(){if(!this.controller)throw new Error("You must have a controller element if you want to use controlls!");if(this.options.progress&&(yield this.createProgress()),this.options.prev&&this.controller){let t=this.controller.querySelector(".prev");t||(t=yield this.createPrev()),t.addEventListener("click",()=>{this.stop(),this.prevItem()})}if(this.options.next&&this.controller){let t=this.controller.querySelector(".next");t||(t=yield this.createNext()),t.addEventListener("click",()=>{this.stop(),this.nextItem()})}const t=this.controller.querySelector(".play");t&&t.addEventListener("click",()=>{this.play()});const e=this.controller.querySelector(".pause");e&&e.addEventListener("click",()=>{this.pause()});const s=this.controller.querySelector(".stop");s&&s.addEventListener("click",()=>{this.stop()}),this.options.autoplay&&("number"!=typeof this.options.autoplay?console.error("Autoplay must be type of number!"):this.options.autoplay<=500?console.error("Autoplay must be higher then 500!"):this.autoplay())})}mouseOver(){console.log("PAUSE")}mouseOut(){console.log("START")}read(){return(new Date).getTime()-this._time}autoplay(){this._timeout=this.options.autoplay,this._stop=!1,this._paused=!1,this._time=0,this._running=!1,this.autoplayNext()}pause(){if(this._paused&&!this._running)return;const t=(new Date).getTime()-this._time;this._timeout=Math.round(Number(this._timeout)-t)+1,this._paused=!0,this._running=!1,this._time=0}play(){!this._paused&&this._running||(this._paused=!1,this.autoplayNext())}autoplayNext(){return t(this,void 0,void 0,function*(){if(this._running)return;this._running=!0,this._time=(new Date).getTime();const t=this.nodes.indexOf(this.activeItem);this.options.progress&&this.startProgress(t);let s=0;for(;s!==Math.round(Number(this._timeout)/100);){if(yield e(100),this._stop||this._paused)return;document.hidden||s++}this._running=!1,this._timeout=this.options.autoplay,t!==this.maxArrayLength&&(this.nextItem(),this.autoplayNext()),this.options.loop&&t===this.maxArrayLength&&(this.nextItem(),this.autoplay())})}stop(){this._stop=!0,this._running=!1;const t=this.controller.querySelector(".progress .item.active");t&&(t.getElementsByTagName("div")[0].style.width="0%"),this.options.autoplay&&(clearTimeout(this._call),this._call=setTimeout(()=>{this.autoplay()},1e3))}createKey(){for(let t=0;t<this.maxLength;t++)this.items[t].setAttribute("index",t.toString())}buildHeight(){let t=0;for(let e=0;e<this.maxLength;e++){const s=this.items[e].getElementsByClassName("inner")[0].offsetHeight;s>t&&(t=s)}this.carousel.getElementsByClassName("carousel__items")[0].style.height=`${t}px`}createProgress(){let t=this.controller.getElementsByClassName("progress")[0];t||((t=document.createElement("div")).classList.add("progress"),t=this.controller.appendChild(t));for(let e=0;e<this.maxLength;e++){const e=document.createElement("div");e.classList.add("item");const s=document.createElement("div");e.appendChild(s),t.appendChild(e)}}startProgress(s){return t(this,void 0,void 0,function*(){const t=Math.round(Number(this._timeout)/Number(this.options.autoplay)*100);let i=100===t?0:-1*(t-100);for(;i<=100;)if(yield e(Number(this.options.autoplay)/100),this._stop&&this.moveProgress(0,s),!document.hidden){if(this._stop||this._paused)break;this.moveProgress(i,s),i++}})}moveProgress(t,e){const s=this.controller.querySelector(".progress .item.active");s&&s.classList.remove("acitve");const i=this.controller.querySelectorAll(".progress .item")[e];i.classList.add("active");const o=i.getElementsByTagName("div")[0];i.classList.remove("transition"),o.style.width=`${t}%`,100===t&&(i.classList.add("transition"),o.style.width="0%")}createPrev(){const t=document.createElement("div");return t.classList.add("prev"),"string"==typeof this.options.prev?t.innerHTML=this.options.prev:t.innerText="←",this.controller.appendChild(t)}createNext(){const t=document.createElement("div");return t.classList.add("next"),"string"==typeof this.options.next?t.innerHTML=this.options.next:t.innerText="→",this.controller.appendChild(t)}nextItem(){if(document.hidden)return;this.activeItem.classList.remove("active");const t=this.nodes.indexOf(this.activeItem),e=t===this.maxArrayLength?0:t+1,s=this.items[e];s.classList.add("active"),this.activeItem=s}prevItem(){if(document.hidden)return;this.activeItem.classList.remove("active");const t=this.nodes.indexOf(this.activeItem),e=t-1<0?this.maxArrayLength:t-1,s=this.items[e];s.classList.add("active"),this.activeItem=s}}});

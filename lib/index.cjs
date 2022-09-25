"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}var _typeof=function(obj){"@swc/helpers - typeof";return obj&&typeof Symbol!=="undefined"&&obj.constructor===Symbol?"symbol":typeof obj};var __generator=this&&this.__generator||function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var g=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var W=function(n,e,t){return e in n?g(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t};var I=function(n,e){for(var t in e)g(n,t,{get:e[t],enumerable:!0})},N=function(n,e,t,o){var _iteratorNormalCompletion=true,_didIteratorError=false,_iteratorError=undefined;if(e&&typeof e=="object"||typeof e=="function")try{var _loop=function(){var i=_step.value;!O.call(n,i)&&i!==t&&g(n,i,{get:function(){return e[i]},enumerable:!(o=U(e,i))||o.enumerable})};for(var _iterator=R(e)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true)_loop()}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return n};var k=function(n){return N(g({},"__esModule",{value:!0}),n)};var s=function(n,e,t){return W(n,(typeof e==="undefined"?"undefined":_typeof(e))!="symbol"?e+"":e,t),t};var B={};I(B,{BlockchainTypes:function(){return T},CrossmintEVMWalletAdapter:function(){return E},CrossmintEmbedRequestType:function(){return C},CrossmintEnvironment:function(){return S},default:function(){return c}});module.exports=k(B);var l=function(){function l(e){_classCallCheck(this,l);s(this,"controlledWindow");s(this,"open");s(this,"onClose");this.open=!1,this.onClose=e}_createClass(l,[{key:"init",value:function init(param){var e=param.parentWindow,t=param.url,tmp=param.width,o=tmp===void 0?375:tmp,tmp1=param.height,i=tmp1===void 0?650:tmp1,tmp2=param.target,r=tmp2===void 0?"popupWindow":tmp2;var a=e.open(t,r,this.createPopupString(o,i));if(!a)throw new Error("Failed to open popup. This may be caused by the browsers' popup blocker");return this.controlledWindow=a!==null&&a!==void 0?a:void 0,this.open=!0,this.registerListeners(),this.controlledWindow}},{key:"close",value:function close(){var ref;(ref=this.controlledWindow)===null||ref===void 0?void 0:ref.close()}},{key:"registerListeners",value:function registerListeners(){var _this=this;var e=setInterval(function(){var ref;((ref=_this.controlledWindow)===null||ref===void 0?void 0:ref.closed)&&(clearInterval(e),_this.controlledWindow=void 0,_this.open=!1,_this.onClose&&_this.onClose())},50)}},{key:"createPopupString",value:function createPopupString(e,t){var o=window.outerHeight/2+window.screenY-t/2,i=window.outerWidth/2+window.screenX-e/2,r=this.getChromeVersion();return"".concat(r&&r>99?"popup=true,":"","height=").concat(t,",width=").concat(e,",left=").concat(i,",top=").concat(o,",resizable=yes,scrollbars=yes,toolbar=yes,menubar=true,location=no,directories=no,status=yes")}},{key:"getChromeVersion",value:function getChromeVersion(){var e=navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);return e?parseInt(e[2]):null}}]);return l}();var p=["http://localhost:3001","https://staging.crossmint.io","https://www.crossmint.io"];var C=function(o){return o.REQUEST_ACCOUNTS="crossmint_requestAccounts",o.SIGN_MESSAGE="crossmint_signMessage",o.USER_REJECT="crossmint_userReject",o}(C||{});var b=function(n){var e=window.document.createElement("template"),t=n.trim();return e.innerHTML=t,e.content.firstChild};var h="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40.91 40.91'%3E%3Cpath d='M1.37,18.32H5.52a4.27,4.27,0,0,1,4.27,4.27v2.14A4.27,4.27,0,0,0,14.05,29a4.27,4.27,0,0,1,4.27,4.27v6.29m-6.4-36.3V6.59a5.33,5.33,0,0,0,5.34,5.33h1.06a4.27,4.27,0,0,1,4.27,4.27,4.27,4.27,0,1,0,8.54,0,4.27,4.27,0,0,1,4.27-4.27h2.27M26.86,38.57V33.26A4.27,4.27,0,0,1,31.13,29h6.54m2-8.53A19.2,19.2,0,1,1,34,6.88,19.12,19.12,0,0,1,39.66,20.46Z' style='fill:none;stroke:%2367797f;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px'/%3E%3C/svg%3E";function y(n){return new Promise(function(e,t){try{var _$o=document.createElement("img");_$o.onload=function(){return e(!0)},_$o.onerror=function(){return e(!1)},_$o.src=n}catch(o){t(o)}})}var q=function(n){var e=n.document,t=e.querySelector('head > meta[property="og:site_name"]');if(t)return t.content;var o=e.querySelector('head > meta[name="title"]');return o?o.content:e.title&&e.title.length>0?e.title:n.location.hostname};function P(n){return _P.apply(this,arguments)}function _P(){_P=_asyncToGenerator(function(n){var e,t,_tmp,_tmp1,_tmp2,e1;return __generator(this,function(_state){switch(_state.label){case 0:_state.trys.push([0,6,,7]);e=n.document,t=e.querySelector('head > link[rel="shortcut icon"]');_tmp1=t;if(!_tmp1)return[3,2];return[4,y(t.href)];case 1:_tmp1=_state.sent();_state.label=2;case 2:_tmp=_tmp1;if(_tmp)return[3,5];t=Array.from(e.querySelectorAll('head > link[rel="icon"]')).find(function(o){return Boolean(o.href)});_tmp2=t;if(!_tmp2)return[3,4];return[4,y(t.href)];case 3:_tmp2=_state.sent();_state.label=4;case 4:_tmp=_tmp2;_state.label=5;case 5:return[2,_tmp?t.href:h];case 6:e1=_state.sent();return[2,h];case 7:return[2]}})});return _P.apply(this,arguments)}function f(n){return _f.apply(this,arguments)}function _f(){_f=_asyncToGenerator(function(n){var _tmp,_tmp1;return __generator(this,function(_state){switch(_state.label){case 0:_tmp={name:n&&n.name?n.name:q(window)};if(!(n&&n.icon))return[3,1];_tmp1=n.icon;return[3,3];case 1:return[4,P(window)];case 2:_tmp1=_state.sent();_state.label=3;case 3:return[2,(_tmp.icon=_tmp1,_tmp.url=window.location.origin,_tmp)]}})});return _f.apply(this,arguments)}function w(n){return _w.apply(this,arguments)}function _w(){_w=_asyncToGenerator(function(n){return __generator(this,function(_state){return[2,new Promise(function(e){return setTimeout(e,n)})]})});return _w.apply(this,arguments)}var c=function(){function c1(e){_classCallCheck(this,c1);s(this,"_config");console.log("[crossmint-embed] Initialized embed with version:",e.libVersion),this._config=e}_createClass(c1,[{key:"_frameUrl",get:function get(){return this._config.environment+"/frame"}},{key:"login",value:function login(){var _this=this;return _asyncToGenerator(function(){var e,_tmp,t;return __generator(this,function(_state){switch(_state.label){case 0:e=new l;_tmp={};if(!(e.init((_tmp.parentWindow=window,_tmp.url=_this._frameUrl,_tmp)),_this._config.autoConnect))return[3,2];return[4,_this.getLoginFromIFrame()];case 1:t=_state.sent();if(t!=null)return[2,(console.log("[crossmint-embed] Received account from auto connect"),e.close(),t)];_state.label=2;case 2:return[4,new Promise(function(){var _ref=_asyncToGenerator(function(t,o){var i,r;return __generator(this,function(_state){switch(_state.label){case 0:console.log("[crossmint-embed] Waiting login");r=function(){var _ref=_asyncToGenerator(function(a){var _data,m,d,ref,u;return __generator(this,function(_state){if(!p.includes(a.origin))return[2];_data=a.data,m=_data.request,d=_data.data;switch(m){case"crossmint_requestAccounts":;u=d.account;i=u,(ref=e.controlledWindow)===null||ref===void 0?void 0:ref.close();break;case"crossmint_userReject":console.log("[crossmint-embed] User rejected login"),i=null;break;default:break}return[2]})});return function r(a){return _ref.apply(this,arguments)}}();window.addEventListener("message",r);_state.label=1;case 1:if(!(e.open&&e.controlledWindow))return[3,4];_this.postMessage(e.controlledWindow,"crossmint_requestAccounts",void 0,_this._frameUrl);return[4,w(100)];case 2:_state.sent();_state.label=3;case 3:return[3,1];case 4:window.removeEventListener("message",r),t(i);return[2]}})});return function(t,o){return _ref.apply(this,arguments)}}())];case 3:return[2,_state.sent()]}})})()}},{key:"signMessage",value:function signMessage(e){var _this=this;return _asyncToGenerator(function(){var t,_tmp;return __generator(this,function(_state){switch(_state.label){case 0:t=new l;_tmp={};t.init((_tmp.parentWindow=window,_tmp.url=_this._frameUrl,_tmp));return[4,new Promise(function(){var _ref=_asyncToGenerator(function(o,i){var r,a,_tmp;return __generator(this,function(_state){switch(_state.label){case 0:console.log("[crossmint-embed] Waiting sign message");a=function(){var _ref=_asyncToGenerator(function(m){var _data,d,u,ref,L;return __generator(this,function(_state){if(!p.includes(m.origin))return[2];_data=m.data,d=_data.request,u=_data.data;switch(d){case"crossmint_signMessage":;L=u.signedMessage;r=new Uint8Array(L.split(",").map(Number)),(ref=t.controlledWindow)===null||ref===void 0?void 0:ref.close();break;case"crossmint_userReject":console.log("[crossmint-embed] User rejected signMessage"),r=null;break;default:break}return[2]})});return function a(m){return _ref.apply(this,arguments)}}();window.addEventListener("message",a);_state.label=1;case 1:if(!(t.open&&t.controlledWindow))return[3,5];_tmp={};return[4,_this.postMessage(t.controlledWindow,"crossmint_signMessage",(_tmp.message=e,_tmp),_this._frameUrl)];case 2:_state.sent();return[4,w(100)];case 3:_state.sent();_state.label=4;case 4:return[3,1];case 5:window.removeEventListener("message",a),o(r);return[2]}})});return function(o,i){return _ref.apply(this,arguments)}}())];case 1:return[2,_state.sent()]}})})()}},{key:"cleanUp",value:function cleanUp(){return _asyncToGenerator(function(){return __generator(this,function(_state){return[2]})})()}},{key:"postMessage",value:function postMessage(e,t,o){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"*";var _this=this;return _asyncToGenerator(function(){var _,_tmp,_tmp1;return __generator(this,function(_state){switch(_state.label){case 0:_=e.postMessage;_tmp={request:t};_tmp1={libVersion:_this._config.libVersion,chain:_this._config.chain,apiKey:_this._config.apiKey};return[4,f(_this._config.appMetadata)];case 1:return[2,_.apply(e,[(_tmp.data=_objectSpread.apply(void 0,[(_tmp1.siteMetadata=_state.sent(),_tmp1),o]),_tmp),i])]}})})()}},{key:"getLoginFromIFrame",value:function getLoginFromIFrame(){var _this=this;return _asyncToGenerator(function(){var e;return __generator(this,function(_state){switch(_state.label){case 0:console.log("[crossmint] Attempting auto connect");e=b('<iframe\n              id="crossmintIframe"\n              class="crossmintIframe"\n              src="'.concat(_this._frameUrl,'"\n              style="display: none; position: fixed; top: 0; right: 0; width: 100%;\n              height: 100%; border: none; border-radius: 0; z-index: 999"\n            ></iframe>'));return[4,new Promise(function(t,o){try{window.document.body.appendChild(e),e.addEventListener("load",_asyncToGenerator(function(){var _$i,r;return __generator(this,function(_state){_$i=setTimeout(function(){console.log("[crossmint] Failed to auto connect within",_this._config.maxTimeAutoConnectMs,"ms"),window.removeEventListener("message",r),window.document.body.removeChild(e),t(void 0)},_this._config.maxTimeAutoConnectMs),r=function(){var _ref=_asyncToGenerator(function(a){var _data,m,d,u;return __generator(this,function(_state){if(!p.includes(a.origin))return[2];_data=a.data,m=_data.request,d=_data.data;switch(m){case"crossmint_requestAccounts":u=d.account;clearTimeout(_$i),t(u);break;default:break}return[2]})});return function r(a){return _ref.apply(this,arguments)}}();window.addEventListener("message",r),_this.postMessage(e.contentWindow,"crossmint_requestAccounts",void 0,_this._frameUrl);return[2]})}))}catch(i){console.log(i),t(void 0)}})];case 1:return[2,_state.sent()]}})})()}}],[{key:"init",value:function init(e){return new c(e)}}]);return c1}();var v=require("ethers");var _="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1000 995.87'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='13.93' y1='11.32' x2='984.35' y2='981.73' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.2' stop-color='%2300ff85'/%3E%3Cstop offset='1' stop-color='%2300e0ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M970.31,889.5s9.6-.12,16,4.63c0,0,19.09-38.79-49.46-107.81,0,0,9.49-4.27,21.94-.12,0,0-1.93-59.1-73.09-113.18,0,0,10.47-3.84,15.69-1.86,0,0-27.63-52.78-99.5-81a52.06,52.06,0,0,1,24.19-5.86s-53.61-63.72-146.75-58.19c0,0,4.9-5.69,14.87-9.25,0,0-15-10.19-50.85-14.64-19.07-4.25-43.24-5.36-43.24-5.36,7.79-.22,24.11-4.81,33.63-7.68,39.34-4.22,77.39-14.39,95.74-36.48,0,0-7.91,2.53-19.21-8.3,0,0,81.51-7.83,141-85.95,0,0-20.56,8.19-32.83-.41,0,0,73.83-29.59,91.38-83.68,0,0-14,9-30.3,7.06,0,0,45.12-31.13,62-84.74,0,0-13.88,7.39-24.79,3,0,0,52-37,45-92.39,0,0-8.19,12.57-25.26,8.18,0,0,54.35-59.34,31.42-115.16,0,0-40.32-5.22-76.85,29.41,0,0-.12-9.6,4.63-16,0,0-38.78-19.09-107.81,49.46,0,0-4.27-9.49-.12-21.94,0,0-59.1,1.93-113.18,73.09,0,0-3.84-10.47-1.86-15.69,0,0-52.78,27.63-81,99.5a52,52,0,0,1-5.85-24.19S522,227.52,527.55,320.66c0,0-5.69-4.9-9.25-14.87,0,0-7.46,11-12.41,36.61-4.85,22.51-7.14,54-7.14,54,.13-16.77-8.69-46.09-12.27-57.29C481.16,307.3,471,278.5,452.7,263.28c0,0,2.53,7.9-8.3,19.21,0,0-7.83-81.52-85.95-141,0,0,8.19,20.56-.41,32.84,0,0-29.59-73.83-83.68-91.39,0,0,9,14,7.06,30.31,0,0-31.13-45.13-84.74-62,0,0,7.39,13.87,3,24.79,0,0-37-51.95-92.39-44.95,0,0,12.57,8.18,8.18,25.26C115.44,56.4,56.1,2,.28,25c0,0-5.22,40.32,29.41,76.85,0,0-9.6.12-16-4.62,0,0-19.09,38.78,49.46,107.8,0,0-9.49,4.27-21.94.12,0,0,1.93,59.1,73.09,113.19,0,0-10.47,3.83-15.69,1.85,0,0,27.63,52.78,99.5,81A52,52,0,0,1,173.91,407s53.61,63.73,146.75,58.19c0,0-4.9,5.69-14.87,9.25,0,0,7.12,4.82,23.18,9.28,21.27,8,91.82,10.59,91.82,10.59-10.91,1.84-27,6.31-43.7,11.44-42.68,3.55-85.62,13.49-105.47,37.4,0,0,7.9-2.53,19.21,8.3,0,0-81.52,7.83-141,85.95,0,0,20.56-8.19,32.84.41,0,0-73.83,29.59-91.39,83.67,0,0,14-9,30.31-7,0,0-45.13,31.13-62,84.74,0,0,13.87-7.4,24.79-3,0,0-52,37-45,92.39,0,0,8.18-12.57,25.26-8.18,0,0-54.36,59.34-31.43,115.16,0,0,40.32,5.22,76.85-29.41,0,0,.12,9.6-4.62,16,0,0,38.78,19.09,107.8-49.46,0,0,4.27,9.49.12,21.94,0,0,59.1-1.94,113.19-73.1,0,0,3.83,10.48,1.85,15.7,0,0,52.78-27.63,81-99.51a52,52,0,0,1,5.85,24.2s63.73-53.61,58.19-146.75c0,0,5.69,4.9,9.25,14.87,0,0,19.18-28.29,16.39-99.78,3.85,14.84,7.89,29.14,11.61,41.73,4.2,39.44,14.36,77.63,36.5,96,0,0-2.53-7.91,8.3-19.22,0,0,7.83,81.52,85.95,141,0,0-8.18-20.56.41-32.83,0,0,29.59,73.83,83.68,91.38,0,0-9-14-7.06-30.3,0,0,31.13,45.12,84.74,62,0,0-7.39-13.87-3-24.78,0,0,37,51.94,92.39,45,0,0-12.57-8.19-8.18-25.26,0,0,59.34,54.35,115.16,31.42C999.72,966.35,1004.94,926,970.31,889.5ZM499.57,517.66C381.15,592.75,144.65,854.75,144.65,854.75c34-84.53,218.09-288.31,342.57-358.25C410.92,377.61,151,143,151,143,235.42,177,438.56,360.41,508.88,484.87c126.6-72,353.7-341.72,353.7-341.72-10.58,66.61-228.87,298-342.5,362.62C590.76,632.07,862.64,861,862.64,861,795.87,850.35,563.52,631.06,499.57,517.66Z' style='fill:url(%23a)'/%3E%3C/svg%3E",M="Crossmint";var x="0.0.4";var S=function(o){return o.PROD="https://www.crossmint.io",o.STAGING="https://staging.crossmint.io",o.LOCAL="http://localhost:3001",o}(S||{});var T=function(o){return o.SOLANA="solana",o.ETHEREUM="ethereum",o.POLYGON="polygon",o}(T||{});function A(n){var _autoConnect;return{libVersion:x,apiKey:n.apiKey,environment:n.environment||"https://www.crossmint.io",autoConnect:(_autoConnect=n.autoConnect)!==null&&_autoConnect!==void 0?_autoConnect:!0,maxTimeAutoConnectMs:n.maxTimeAutoConnectMs||300,appMetadata:n.appMetadata,chain:n.chain}}var E=function(){function E(e){_classCallCheck(this,E);s(this,"name",M);s(this,"url","https://www.crossmint.io");s(this,"icon",_);s(this,"_connecting");s(this,"_publicKey");s(this,"_config");s(this,"_client");this._connecting=!1,this._publicKey=null,this._config=A(_objectSpread({},e))}_createClass(E,[{key:"publicKey",get:function get(){return this._publicKey}},{key:"connecting",get:function get(){return this._connecting}},{key:"connected",get:function get(){return this._publicKey!==null&&this._publicKey!==void 0}},{key:"connect",value:function connect(){var _this=this;return _asyncToGenerator(function(){var _$e,t,o,e;return __generator(this,function(_state){switch(_state.label){case 0:_state.trys.push([0,2,3,4]);if(_this.connected||_this.connecting)return[2];_this._connecting=!0;_$e=c.init(_this._config);return[4,_$e.login()];case 1:t=_state.sent();if(t===null)throw new Error("User rejected the request");if(t===void 0)throw new Error("User rejected the request or closed the window");try{o=v.ethers.utils.getAddress(t)}catch(i){throw new Error(i===null||i===void 0?void 0:i.message,i)}return[2,(_this._client=_$e,_this._publicKey=o,_this._publicKey)];case 2:e=_state.sent();throw e;case 3:_this._connecting=!1;return[7];case 4:return[2]}})})()}},{key:"disconnect",value:function disconnect(){var _this=this;return _asyncToGenerator(function(){var ref;return __generator(this,function(_state){(ref=_this._client)===null||ref===void 0?void 0:ref.cleanUp(),_this._client=void 0,_this._publicKey=null;return[2]})})()}},{key:"signMessage",value:function signMessage(e){var _this=this;return _asyncToGenerator(function(){var _$t,t;return __generator(this,function(_state){switch(_state.label){case 0:_state.trys.push([0,2,,3]);if(!_this._client||!_this.connected)throw new Error("Not connected");return[4,_this._client.signMessage(new TextEncoder().encode(e))];case 1:_$t=_state.sent();if(_$t===null)throw new Error("User rejected the request");if(_$t===void 0)throw new Error("User rejected the request or closed the window");return[2,new TextDecoder().decode(_$t)];case 2:t=_state.sent();throw t;case 3:return[2]}})})()}}]);return E}();0&&(module.exports={BlockchainTypes:BlockchainTypes,CrossmintEVMWalletAdapter:CrossmintEVMWalletAdapter,CrossmintEmbedRequestType:CrossmintEmbedRequestType,CrossmintEnvironment:CrossmintEnvironment});
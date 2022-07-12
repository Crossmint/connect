(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[770],{6770:function(f,b,a){"use strict";a.r(b),a.d(b,{default:function(){return j}});var c=a(6729),d=a.n(c),g=a(8155),e=a(9054),h=a.n(e),i=function(b,c,a,d){return new(a||(a=Promise))(function(f,g){function h(a){try{e(d.next(a))}catch(b){g(b)}}function i(a){try{e(d.throw(a))}catch(b){g(b)}}function e(b){var c;b.done?f(b.value):((c=b.value)instanceof a?c:new a(function(a){a(c)})).then(h,i)}e((d=d.apply(b,c||[])).next())})};class j extends d(){constructor(a,d){var b,c;if(super(),this._network=d,this._publicKey=null,this._popup=null,this._handlerAdded=!1,this._nextRequestId=1,this._autoApprove=!1,this._responsePromises=new Map,this.handleMessage=a=>{var b;if(this._injectedProvider&&a.source===window||a.origin===(null===(b=this._providerUrl)|| void 0===b?void 0:b.origin)&&a.source===this._popup){if("connected"===a.data.method){let c=new g.nh(a.data.params.publicKey);this._publicKey&&this._publicKey.equals(c)||(this._publicKey&&!this._publicKey.equals(c)&&this.handleDisconnect(),this._publicKey=c,this._autoApprove=!!a.data.params.autoApprove,this.emit("connect",this._publicKey))}else if("disconnected"===a.data.method)this.handleDisconnect();else if(a.data.result||a.data.error){let d=this._responsePromises.get(a.data.id);if(d){let[e,f]=d;a.data.result?e(a.data.result):f(Error(a.data.error))}}}},this._beforeUnload=()=>{this.disconnect()},k(b=a)&&"postMessage"in b&&"function"==typeof b.postMessage)this._injectedProvider=a;else{if(c=a,"string"==typeof c)this._providerUrl=new URL(a),this._providerUrl.hash=new URLSearchParams({origin:window.location.origin,network:this._network}).toString();else throw Error("provider parameter must be an injected provider or a URL string.")}}handleConnect(){var a;return(this._handlerAdded||(this._handlerAdded=!0,window.addEventListener("message",this.handleMessage),window.addEventListener("beforeunload",this._beforeUnload)),this._injectedProvider)?new Promise(a=>{this.sendRequest("connect",{}),a()}):(window.name="parent",this._popup=window.open(null===(a=this._providerUrl)|| void 0===a?void 0:a.toString(),"_blank","location,resizable,width=460,height=675"),new Promise(a=>{this.once("connect",a)}))}handleDisconnect(){this._handlerAdded&&(this._handlerAdded=!1,window.removeEventListener("message",this.handleMessage),window.removeEventListener("beforeunload",this._beforeUnload)),this._publicKey&&(this._publicKey=null,this.emit("disconnect")),this._responsePromises.forEach(([,a],b)=>{this._responsePromises.delete(b),a(Error("Wallet disconnected"))})}sendRequest(a,b){return i(this,void 0,void 0,function*(){if("connect"!==a&&!this.connected)throw Error("Wallet not connected");let c=this._nextRequestId;return++this._nextRequestId,new Promise((h,i)=>{var d,e,f,g;this._responsePromises.set(c,[h,i]),this._injectedProvider?this._injectedProvider.postMessage({jsonrpc:"2.0",id:c,method:a,params:Object.assign({network:this._network},b)}):(null===(d=this._popup)|| void 0===d||d.postMessage({jsonrpc:"2.0",id:c,method:a,params:b},null!==(f=null===(e=this._providerUrl)|| void 0===e?void 0:e.origin)&& void 0!==f?f:""),this.autoApprove||null===(g=this._popup)|| void 0===g||g.focus())})})}get publicKey(){return this._publicKey}get connected(){return null!==this._publicKey}get autoApprove(){return this._autoApprove}connect(){return i(this,void 0,void 0,function*(){this._popup&&this._popup.close(),yield this.handleConnect()})}disconnect(){return i(this,void 0,void 0,function*(){this._injectedProvider&&(yield this.sendRequest("disconnect",{})),this._popup&&this._popup.close(),this.handleDisconnect()})}sign(a,b){return i(this,void 0,void 0,function*(){if(!(a instanceof Uint8Array))throw Error("Data must be an instance of Uint8Array");let c=yield this.sendRequest("sign",{data:a,display:b}),d=h().decode(c.signature),e=new g.nh(c.publicKey);return{signature:d,publicKey:e}})}signTransaction(a){return i(this,void 0,void 0,function*(){let b=yield this.sendRequest("signTransaction",{message:h().encode(a.serializeMessage())}),c=h().decode(b.signature),d=new g.nh(b.publicKey);return a.addSignature(d,c),a})}signAllTransactions(a){return i(this,void 0,void 0,function*(){let b=yield this.sendRequest("signAllTransactions",{messages:a.map(a=>h().encode(a.serializeMessage()))}),c=b.signatures.map(a=>h().decode(a)),d=new g.nh(b.publicKey);return a=a.map((a,b)=>(a.addSignature(d,c[b]),a))})}diffieHellman(a){return i(this,void 0,void 0,function*(){if(!(a instanceof Uint8Array))throw Error("Data must be an instance of Uint8Array");let b=yield this.sendRequest("diffieHellman",{publicKey:a});return b})}}function k(a){return"object"==typeof a&&null!==a}},4738:function(a,c,b){"use strict";var d=b(9509).Buffer;a.exports=function(a){if(a.length>=255)throw TypeError("Alphabet too long");for(var b=new Uint8Array(256),e=0;e<b.length;e++)b[e]=255;for(var c=0;c<a.length;c++){var f=a.charAt(c),g=f.charCodeAt(0);if(255!==b[g])throw TypeError(f+" is ambiguous");b[g]=c}var h=a.length,j=a.charAt(0),k=Math.log(h)/Math.log(256),l=Math.log(256)/Math.log(h);function i(c){if("string"!=typeof c)throw TypeError("Expected String");if(0===c.length)return d.alloc(0);for(var e=0,i=0,n=0;c[e]===j;)i++,e++;for(var f=(c.length-e)*k+1>>>0,l=new Uint8Array(f);c[e];){var a=b[c.charCodeAt(e)];if(255===a)return;for(var o=0,m=f-1;(0!==a||o<n)&& -1!==m;m--,o++)a+=h*l[m]>>>0,l[m]=a%256>>>0,a=a/256>>>0;if(0!==a)throw Error("Non-zero carry");n=o,e++}for(var g=f-n;g!==f&&0===l[g];)g++;var p=d.allocUnsafe(i+(f-g));p.fill(0,0,i);for(var q=i;g!==f;)p[q++]=l[g++];return p}return{encode:function(b){if((Array.isArray(b)||b instanceof Uint8Array)&&(b=d.from(b)),!d.isBuffer(b))throw TypeError("Expected Buffer");if(0===b.length)return"";for(var p=0,m=0,c=0,n=b.length;c!==n&&0===b[c];)c++,p++;for(var g=(n-c)*l+1>>>0,i=new Uint8Array(g);c!==n;){for(var e=b[c],o=0,k=g-1;(0!==e||o<m)&& -1!==k;k--,o++)e+=256*i[k]>>>0,i[k]=e%h>>>0,e=e/h>>>0;if(0!==e)throw Error("Non-zero carry");m=o,c++}for(var f=g-m;f!==g&&0===i[f];)f++;for(var q=j.repeat(p);f<g;++f)q+=a.charAt(i[f]);return q},decodeUnsafe:i,decode:function(b){var a=i(b);if(a)return a;throw Error("Non-base"+h+" character")}}}},9054:function(a,d,b){var c=b(4738);a.exports=c("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")}}])
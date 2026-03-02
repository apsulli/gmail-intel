(function(){var mo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Gc=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[t++],l=n[t++],u=n[t++],h=((i&7)<<18|(o&63)<<12|(l&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],l=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|l&63)}}return e.join("")},Ea={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],l=i+1<n.length,u=l?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,y=o>>2,A=(o&3)<<4|u>>4;let R=(u&15)<<2|f>>6,C=f&63;h||(C=64,l||(R=64)),r.push(t[y],t[A],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(va(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;const f=i<n.length?t[n.charAt(i)]:64;++i;const A=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||u==null||f==null||A==null)throw new Kc;const R=o<<2|u>>4;if(r.push(R),f!==64){const C=u<<4&240|f>>2;if(r.push(C),A!==64){const k=f<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Kc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wc=function(n){const e=va(n);return Ea.encodeByteArray(e,!0)},hr=function(n){return Wc(n).replace(/\./g,"")},Ia=function(n){try{return Ea.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=()=>Qc().__FIREBASE_DEFAULTS__,Jc=()=>{if(typeof process>"u"||typeof mo>"u")return;const n=mo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Yc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ia(n[1]);return e&&JSON.parse(e)},Cr=()=>{try{return Xc()||Jc()||Yc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ta=n=>{var e,t;return(t=(e=Cr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Zc=n=>{const e=Ta(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},wa=()=>{var n;return(n=Cr())===null||n===void 0?void 0:n.config},Aa=n=>{var e;return(e=Cr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[hr(JSON.stringify(t)),hr(JSON.stringify(l)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function nu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function ru(){var n;const e=(n=Cr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function iu(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function su(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ou(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function au(){const n=me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function lu(){return!ru()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function cu(){try{return typeof indexedDB=="object"}catch{return!1}}function uu(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu="FirebaseError";class He extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=hu,Object.setPrototypeOf(this,He.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,An.prototype.create)}}class An{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],l=o?du(o,r):"Error",u=`${this.serviceName}: ${l} (${i}).`;return new He(i,u,r)}}function du(n,e){return n.replace(fu,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const fu=/\{\$([^}]+)}/g;function pu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function dr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const o=n[i],l=e[i];if(_o(o)&&_o(l)){if(!dr(o,l))return!1}else if(o!==l)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function _o(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function gu(n,e){const t=new mu(n,e);return t.subscribe.bind(t)}class mu{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");_u(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=di),i.error===void 0&&(i.error=di),i.complete===void 0&&(i.complete=di);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _u(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function di(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(n){return n&&n._delegate?n._delegate:n}class gt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new eu;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Eu(e))try{this.getOrInitializeService({instanceIdentifier:ut})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=ut){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ut){return this.instances.has(e)}getOptions(e=ut){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,l]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&l.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const l=this.instances.get(i);return l&&e(l,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vu(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ut){return this.component?this.component.multipleInstances?e:ut:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vu(n){return n===ut?void 0:n}function Eu(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new yu(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(x||(x={}));const Tu={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},wu=x.INFO,Au={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},Ru=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Au[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fi{constructor(e){this.name=e,this._logLevel=wu,this._logHandler=Ru,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Tu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const Pu=(n,e)=>e.some(t=>n instanceof t);let yo,vo;function Su(){return yo||(yo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bu(){return vo||(vo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ra=new WeakMap,Ti=new WeakMap,Pa=new WeakMap,fi=new WeakMap,Bi=new WeakMap;function Cu(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{t(Ze(n.result)),i()},l=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",l)});return e.then(t=>{t instanceof IDBCursor&&Ra.set(t,n)}).catch(()=>{}),Bi.set(e,n),e}function ku(n){if(Ti.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{t(),i()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});Ti.set(n,e)}let wi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ti.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Pa.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ze(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Du(n){wi=n(wi)}function Nu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(pi(this),e,...t);return Pa.set(r,e.sort?e.sort():[e]),Ze(r)}:bu().includes(n)?function(...e){return n.apply(pi(this),e),Ze(Ra.get(this))}:function(...e){return Ze(n.apply(pi(this),e))}}function Ou(n){return typeof n=="function"?Nu(n):(n instanceof IDBTransaction&&ku(n),Pu(n,Su())?new Proxy(n,wi):n)}function Ze(n){if(n instanceof IDBRequest)return Cu(n);if(fi.has(n))return fi.get(n);const e=Ou(n);return e!==n&&(fi.set(n,e),Bi.set(e,n)),e}const pi=n=>Bi.get(n);function Vu(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){const l=indexedDB.open(n,e),u=Ze(l);return r&&l.addEventListener("upgradeneeded",h=>{r(Ze(l.result),h.oldVersion,h.newVersion,Ze(l.transaction),h)}),t&&l.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const Mu=["get","getKey","getAll","getAllKeys","count"],Lu=["put","add","delete","clear"],gi=new Map;function Eo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(gi.get(e))return gi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Lu.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Mu.includes(t)))return;const o=async function(l,...u){const h=this.transaction(l,i?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),i&&h.done]))[0]};return gi.set(e,o),o}Du(n=>({...n,get:(e,t,r)=>Eo(e,t)||n.get(e,t,r),has:(e,t)=>!!Eo(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Uu(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Uu(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ai="@firebase/app",Io="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be=new Fi("@firebase/app"),Fu="@firebase/app-compat",Bu="@firebase/analytics-compat",ju="@firebase/analytics",$u="@firebase/app-check-compat",Hu="@firebase/app-check",qu="@firebase/auth",zu="@firebase/auth-compat",Gu="@firebase/database",Ku="@firebase/data-connect",Wu="@firebase/database-compat",Qu="@firebase/functions",Xu="@firebase/functions-compat",Ju="@firebase/installations",Yu="@firebase/installations-compat",Zu="@firebase/messaging",eh="@firebase/messaging-compat",th="@firebase/performance",nh="@firebase/performance-compat",rh="@firebase/remote-config",ih="@firebase/remote-config-compat",sh="@firebase/storage",oh="@firebase/storage-compat",ah="@firebase/firestore",lh="@firebase/vertexai-preview",ch="@firebase/firestore-compat",uh="firebase",hh="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri="[DEFAULT]",dh={[Ai]:"fire-core",[Fu]:"fire-core-compat",[ju]:"fire-analytics",[Bu]:"fire-analytics-compat",[Hu]:"fire-app-check",[$u]:"fire-app-check-compat",[qu]:"fire-auth",[zu]:"fire-auth-compat",[Gu]:"fire-rtdb",[Ku]:"fire-data-connect",[Wu]:"fire-rtdb-compat",[Qu]:"fire-fn",[Xu]:"fire-fn-compat",[Ju]:"fire-iid",[Yu]:"fire-iid-compat",[Zu]:"fire-fcm",[eh]:"fire-fcm-compat",[th]:"fire-perf",[nh]:"fire-perf-compat",[rh]:"fire-rc",[ih]:"fire-rc-compat",[sh]:"fire-gcs",[oh]:"fire-gcs-compat",[ah]:"fire-fst",[ch]:"fire-fst-compat",[lh]:"fire-vertex","fire-js":"fire-js",[uh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=new Map,fh=new Map,Pi=new Map;function To(n,e){try{n.container.addComponent(e)}catch(t){Be.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Dt(n){const e=n.name;if(Pi.has(e))return Be.debug(`There were multiple attempts to register component ${e}.`),!1;Pi.set(e,n);for(const t of fr.values())To(t,n);for(const t of fh.values())To(t,n);return!0}function ji(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ye(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},et=new An("app","Firebase",ph);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw et.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=hh;function Sa(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ri,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw et.create("bad-app-name",{appName:String(i)});if(t||(t=wa()),!t)throw et.create("no-options");const o=fr.get(i);if(o){if(dr(t,o.options)&&dr(r,o.config))return o;throw et.create("duplicate-app",{appName:i})}const l=new Iu(i);for(const h of Pi.values())l.addComponent(h);const u=new gh(t,r,l);return fr.set(i,u),u}function ba(n=Ri){const e=fr.get(n);if(!e&&n===Ri&&wa())return Sa();if(!e)throw et.create("no-app",{appName:n});return e}function tt(n,e,t){var r;let i=(r=dh[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const o=i.match(/\s|\//),l=e.match(/\s|\//);if(o||l){const u=[`Unable to register library "${i}" with version "${e}":`];o&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&l&&u.push("and"),l&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Be.warn(u.join(" "));return}Dt(new gt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="firebase-heartbeat-database",_h=1,gn="firebase-heartbeat-store";let mi=null;function Ca(){return mi||(mi=Vu(mh,_h,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(gn)}catch(t){console.warn(t)}}}}).catch(n=>{throw et.create("idb-open",{originalErrorMessage:n.message})})),mi}async function yh(n){try{const t=(await Ca()).transaction(gn),r=await t.objectStore(gn).get(ka(n));return await t.done,r}catch(e){if(e instanceof He)Be.warn(e.message);else{const t=et.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Be.warn(t.message)}}}async function wo(n,e){try{const r=(await Ca()).transaction(gn,"readwrite");await r.objectStore(gn).put(e,ka(n)),await r.done}catch(t){if(t instanceof He)Be.warn(t.message);else{const r=et.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Be.warn(r.message)}}}function ka(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh=1024,Eh=30*24*60*60*1e3;class Ih{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new wh(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ao();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(l=>l.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(l=>{const u=new Date(l.date).valueOf();return Date.now()-u<=Eh}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Be.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ao(),{heartbeatsToSend:r,unsentEntries:i}=Th(this._heartbeatsCache.heartbeats),o=hr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Be.warn(t),""}}}function Ao(){return new Date().toISOString().substring(0,10)}function Th(n,e=vh){const t=[];let r=n.slice();for(const i of n){const o=t.find(l=>l.agent===i.agent);if(o){if(o.dates.push(i.date),Ro(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Ro(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class wh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cu()?uu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await yh(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return wo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return wo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ro(n){return hr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(n){Dt(new gt("platform-logger",e=>new xu(e),"PRIVATE")),Dt(new gt("heartbeat",e=>new Ih(e),"PRIVATE")),tt(Ai,Io,n),tt(Ai,Io,"esm2017"),tt("fire-js","")}Ah("");var Rh="firebase",Ph="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tt(Rh,Ph,"app");var Po=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Da;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function m(){}m.prototype=p.prototype,E.D=p.prototype,E.prototype=new m,E.prototype.constructor=E,E.C=function(_,v,T){for(var g=Array(arguments.length-2),De=2;De<arguments.length;De++)g[De-2]=arguments[De];return p.prototype[v].apply(_,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,p,m){m||(m=0);var _=Array(16);if(typeof p=="string")for(var v=0;16>v;++v)_[v]=p.charCodeAt(m++)|p.charCodeAt(m++)<<8|p.charCodeAt(m++)<<16|p.charCodeAt(m++)<<24;else for(v=0;16>v;++v)_[v]=p[m++]|p[m++]<<8|p[m++]<<16|p[m++]<<24;p=E.g[0],m=E.g[1],v=E.g[2];var T=E.g[3],g=p+(T^m&(v^T))+_[0]+3614090360&4294967295;p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+_[1]+3905402710&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+_[2]+606105819&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+_[3]+3250441966&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(T^m&(v^T))+_[4]+4118548399&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+_[5]+1200080426&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+_[6]+2821735955&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+_[7]+4249261313&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(T^m&(v^T))+_[8]+1770035416&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+_[9]+2336552879&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+_[10]+4294925233&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+_[11]+2304563134&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(T^m&(v^T))+_[12]+1804603682&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+_[13]+4254626195&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+_[14]+2792965006&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+_[15]+1236535329&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(v^T&(m^v))+_[1]+4129170786&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+_[6]+3225465664&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+_[11]+643717713&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+_[0]+3921069994&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(v^T&(m^v))+_[5]+3593408605&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+_[10]+38016083&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+_[15]+3634488961&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+_[4]+3889429448&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(v^T&(m^v))+_[9]+568446438&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+_[14]+3275163606&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+_[3]+4107603335&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+_[8]+1163531501&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(v^T&(m^v))+_[13]+2850285829&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+_[2]+4243563512&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+_[7]+1735328473&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+_[12]+2368359562&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(m^v^T)+_[5]+4294588738&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+_[8]+2272392833&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+_[11]+1839030562&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+_[14]+4259657740&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(m^v^T)+_[1]+2763975236&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+_[4]+1272893353&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+_[7]+4139469664&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+_[10]+3200236656&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(m^v^T)+_[13]+681279174&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+_[0]+3936430074&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+_[3]+3572445317&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+_[6]+76029189&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(m^v^T)+_[9]+3654602809&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+_[12]+3873151461&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+_[15]+530742520&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+_[2]+3299628645&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(v^(m|~T))+_[0]+4096336452&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+_[7]+1126891415&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+_[14]+2878612391&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+_[5]+4237533241&4294967295,m=v+(g<<21&4294967295|g>>>11),g=p+(v^(m|~T))+_[12]+1700485571&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+_[3]+2399980690&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+_[10]+4293915773&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+_[1]+2240044497&4294967295,m=v+(g<<21&4294967295|g>>>11),g=p+(v^(m|~T))+_[8]+1873313359&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+_[15]+4264355552&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+_[6]+2734768916&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+_[13]+1309151649&4294967295,m=v+(g<<21&4294967295|g>>>11),g=p+(v^(m|~T))+_[4]+4149444226&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+_[11]+3174756917&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+_[2]+718787259&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+T&4294967295}r.prototype.u=function(E,p){p===void 0&&(p=E.length);for(var m=p-this.blockSize,_=this.B,v=this.h,T=0;T<p;){if(v==0)for(;T<=m;)i(this,E,T),T+=this.blockSize;if(typeof E=="string"){for(;T<p;)if(_[v++]=E.charCodeAt(T++),v==this.blockSize){i(this,_),v=0;break}}else for(;T<p;)if(_[v++]=E[T++],v==this.blockSize){i(this,_),v=0;break}}this.h=v,this.o+=p},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;var m=8*this.o;for(p=E.length-8;p<E.length;++p)E[p]=m&255,m/=256;for(this.u(E),E=Array(16),p=m=0;4>p;++p)for(var _=0;32>_;_+=8)E[m++]=this.g[p]>>>_&255;return E};function o(E,p){var m=u;return Object.prototype.hasOwnProperty.call(m,E)?m[E]:m[E]=p(E)}function l(E,p){this.h=p;for(var m=[],_=!0,v=E.length-1;0<=v;v--){var T=E[v]|0;_&&T==p||(m[v]=T,_=!1)}this.g=m}var u={};function h(E){return-128<=E&&128>E?o(E,function(p){return new l([p|0],0>p?-1:0)}):new l([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return A;if(0>E)return D(f(-E));for(var p=[],m=1,_=0;E>=m;_++)p[_]=E/m|0,m*=4294967296;return new l(p,0)}function y(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return D(y(E.substring(1),p));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=f(Math.pow(p,8)),_=A,v=0;v<E.length;v+=8){var T=Math.min(8,E.length-v),g=parseInt(E.substring(v,v+T),p);8>T?(T=f(Math.pow(p,T)),_=_.j(T).add(f(g))):(_=_.j(m),_=_.add(f(g)))}return _}var A=h(0),R=h(1),C=h(16777216);n=l.prototype,n.m=function(){if(O(this))return-D(this).m();for(var E=0,p=1,m=0;m<this.g.length;m++){var _=this.i(m);E+=(0<=_?_:4294967296+_)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(O(this))return"-"+D(this).toString(E);for(var p=f(Math.pow(E,6)),m=this,_="";;){var v=J(m,p).g;m=H(m,v.j(p));var T=((0<m.g.length?m.g[0]:m.h)>>>0).toString(E);if(m=v,k(m))return T+_;for(;6>T.length;)T="0"+T;_=T+_}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=H(this,E),O(E)?-1:k(E)?0:1};function D(E){for(var p=E.g.length,m=[],_=0;_<p;_++)m[_]=~E.g[_];return new l(m,~E.h).add(R)}n.abs=function(){return O(this)?D(this):this},n.add=function(E){for(var p=Math.max(this.g.length,E.g.length),m=[],_=0,v=0;v<=p;v++){var T=_+(this.i(v)&65535)+(E.i(v)&65535),g=(T>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);_=g>>>16,T&=65535,g&=65535,m[v]=g<<16|T}return new l(m,m[m.length-1]&-2147483648?-1:0)};function H(E,p){return E.add(D(p))}n.j=function(E){if(k(this)||k(E))return A;if(O(this))return O(E)?D(this).j(D(E)):D(D(this).j(E));if(O(E))return D(this.j(D(E)));if(0>this.l(C)&&0>E.l(C))return f(this.m()*E.m());for(var p=this.g.length+E.g.length,m=[],_=0;_<2*p;_++)m[_]=0;for(_=0;_<this.g.length;_++)for(var v=0;v<E.g.length;v++){var T=this.i(_)>>>16,g=this.i(_)&65535,De=E.i(v)>>>16,$t=E.i(v)&65535;m[2*_+2*v]+=g*$t,j(m,2*_+2*v),m[2*_+2*v+1]+=T*$t,j(m,2*_+2*v+1),m[2*_+2*v+1]+=g*De,j(m,2*_+2*v+1),m[2*_+2*v+2]+=T*De,j(m,2*_+2*v+2)}for(_=0;_<p;_++)m[_]=m[2*_+1]<<16|m[2*_];for(_=p;_<2*p;_++)m[_]=0;return new l(m,0)};function j(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function $(E,p){this.g=E,this.h=p}function J(E,p){if(k(p))throw Error("division by zero");if(k(E))return new $(A,A);if(O(E))return p=J(D(E),p),new $(D(p.g),D(p.h));if(O(p))return p=J(E,D(p)),new $(D(p.g),p.h);if(30<E.g.length){if(O(E)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var m=R,_=p;0>=_.l(E);)m=Pe(m),_=Pe(_);var v=ee(m,1),T=ee(_,1);for(_=ee(_,2),m=ee(m,2);!k(_);){var g=T.add(_);0>=g.l(E)&&(v=v.add(m),T=g),_=ee(_,1),m=ee(m,1)}return p=H(E,v.j(p)),new $(v,p)}for(v=A;0<=E.l(p);){for(m=Math.max(1,Math.floor(E.m()/p.m())),_=Math.ceil(Math.log(m)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),T=f(m),g=T.j(p);O(g)||0<g.l(E);)m-=_,T=f(m),g=T.j(p);k(T)&&(T=R),v=v.add(T),E=H(E,g)}return new $(v,E)}n.A=function(E){return J(this,E).h},n.and=function(E){for(var p=Math.max(this.g.length,E.g.length),m=[],_=0;_<p;_++)m[_]=this.i(_)&E.i(_);return new l(m,this.h&E.h)},n.or=function(E){for(var p=Math.max(this.g.length,E.g.length),m=[],_=0;_<p;_++)m[_]=this.i(_)|E.i(_);return new l(m,this.h|E.h)},n.xor=function(E){for(var p=Math.max(this.g.length,E.g.length),m=[],_=0;_<p;_++)m[_]=this.i(_)^E.i(_);return new l(m,this.h^E.h)};function Pe(E){for(var p=E.g.length+1,m=[],_=0;_<p;_++)m[_]=E.i(_)<<1|E.i(_-1)>>>31;return new l(m,E.h)}function ee(E,p){var m=p>>5;p%=32;for(var _=E.g.length-m,v=[],T=0;T<_;T++)v[T]=0<p?E.i(T+m)>>>p|E.i(T+m+1)<<32-p:E.i(T+m);return new l(v,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=f,l.fromString=y,Da=l}).apply(typeof Po<"u"?Po:typeof self<"u"?self:typeof window<"u"?window:{});var Yn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Na,cn,Oa,ir,Si,Va,Ma,La;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,c){return s==Array.prototype||s==Object.prototype||(s[a]=c.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yn=="object"&&Yn];for(var a=0;a<s.length;++a){var c=s[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=t(this);function i(s,a){if(a)e:{var c=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var I=s[d];if(!(I in c))break e;c=c[I]}s=s[s.length-1],d=c[s],a=a(d),a!=d&&a!=null&&e(c,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var c=0,d=!1,I={next:function(){if(!d&&c<s.length){var w=c++;return{value:a(w,s[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},u=this||self;function h(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function f(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function y(s,a,c){return s.call.apply(s.bind,arguments)}function A(s,a,c){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,d),s.apply(a,I)}}return function(){return s.apply(a,arguments)}}function R(s,a,c){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?y:A,R.apply(null,arguments)}function C(s,a){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function k(s,a){function c(){}c.prototype=a.prototype,s.aa=a.prototype,s.prototype=new c,s.prototype.constructor=s,s.Qb=function(d,I,w){for(var b=Array(arguments.length-2),q=2;q<arguments.length;q++)b[q-2]=arguments[q];return a.prototype[I].apply(d,b)}}function O(s){const a=s.length;if(0<a){const c=Array(a);for(let d=0;d<a;d++)c[d]=s[d];return c}return[]}function D(s,a){for(let c=1;c<arguments.length;c++){const d=arguments[c];if(h(d)){const I=s.length||0,w=d.length||0;s.length=I+w;for(let b=0;b<w;b++)s[I+b]=d[b]}else s.push(d)}}class H{constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function j(s){return/^[\s\xa0]*$/.test(s)}function $(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function J(s){return J[" "](s),s}J[" "]=function(){};var Pe=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function ee(s,a,c){for(const d in s)a.call(c,s[d],d,s)}function E(s,a){for(const c in s)a.call(void 0,s[c],c,s)}function p(s){const a={};for(const c in s)a[c]=s[c];return a}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(s,a){let c,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(c in d)s[c]=d[c];for(let w=0;w<m.length;w++)c=m[w],Object.prototype.hasOwnProperty.call(d,c)&&(s[c]=d[c])}}function v(s){var a=1;s=s.split(":");const c=[];for(;0<a&&s.length;)c.push(s.shift()),a--;return s.length&&c.push(s.join(":")),c}function T(s){u.setTimeout(()=>{throw s},0)}function g(){var s=$r;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class De{constructor(){this.h=this.g=null}add(a,c){const d=$t.get();d.set(a,c),this.h?this.h.next=d:this.g=d,this.h=d}}var $t=new H(()=>new hc,s=>s.reset());class hc{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let Ht,qt=!1,$r=new De,gs=()=>{const s=u.Promise.resolve(void 0);Ht=()=>{s.then(dc)}};var dc=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(c){T(c)}var a=$t;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}qt=!1};function qe(){this.s=this.s,this.C=this.C}qe.prototype.s=!1,qe.prototype.ma=function(){this.s||(this.s=!0,this.N())},qe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function le(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}le.prototype.h=function(){this.defaultPrevented=!0};var fc=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const c=()=>{};u.addEventListener("test",c,a),u.removeEventListener("test",c,a)}catch{}return s}();function zt(s,a){if(le.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var c=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(Pe){e:{try{J(a.nodeName);var I=!0;break e}catch{}I=!1}I||(a=null)}}else c=="mouseover"?a=s.fromElement:c=="mouseout"&&(a=s.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:pc[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&zt.aa.h.call(this)}}k(zt,le);var pc={2:"touch",3:"pen",4:"mouse"};zt.prototype.h=function(){zt.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var On="closure_listenable_"+(1e6*Math.random()|0),gc=0;function mc(s,a,c,d,I){this.listener=s,this.proxy=null,this.src=a,this.type=c,this.capture=!!d,this.ha=I,this.key=++gc,this.da=this.fa=!1}function Vn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Mn(s){this.src=s,this.g={},this.h=0}Mn.prototype.add=function(s,a,c,d,I){var w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);var b=qr(s,a,d,I);return-1<b?(a=s[b],c||(a.fa=!1)):(a=new mc(a,this.src,w,!!d,I),a.fa=c,s.push(a)),a};function Hr(s,a){var c=a.type;if(c in s.g){var d=s.g[c],I=Array.prototype.indexOf.call(d,a,void 0),w;(w=0<=I)&&Array.prototype.splice.call(d,I,1),w&&(Vn(a),s.g[c].length==0&&(delete s.g[c],s.h--))}}function qr(s,a,c,d){for(var I=0;I<s.length;++I){var w=s[I];if(!w.da&&w.listener==a&&w.capture==!!c&&w.ha==d)return I}return-1}var zr="closure_lm_"+(1e6*Math.random()|0),Gr={};function ms(s,a,c,d,I){if(Array.isArray(a)){for(var w=0;w<a.length;w++)ms(s,a[w],c,d,I);return null}return c=vs(c),s&&s[On]?s.K(a,c,f(d)?!!d.capture:!1,I):_c(s,a,c,!1,d,I)}function _c(s,a,c,d,I,w){if(!a)throw Error("Invalid event type");var b=f(I)?!!I.capture:!!I,q=Wr(s);if(q||(s[zr]=q=new Mn(s)),c=q.add(a,c,d,b,w),c.proxy)return c;if(d=yc(),c.proxy=d,d.src=s,d.listener=c,s.addEventListener)fc||(I=b),I===void 0&&(I=!1),s.addEventListener(a.toString(),d,I);else if(s.attachEvent)s.attachEvent(ys(a.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function yc(){function s(c){return a.call(s.src,s.listener,c)}const a=vc;return s}function _s(s,a,c,d,I){if(Array.isArray(a))for(var w=0;w<a.length;w++)_s(s,a[w],c,d,I);else d=f(d)?!!d.capture:!!d,c=vs(c),s&&s[On]?(s=s.i,a=String(a).toString(),a in s.g&&(w=s.g[a],c=qr(w,c,d,I),-1<c&&(Vn(w[c]),Array.prototype.splice.call(w,c,1),w.length==0&&(delete s.g[a],s.h--)))):s&&(s=Wr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=qr(a,c,d,I)),(c=-1<s?a[s]:null)&&Kr(c))}function Kr(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[On])Hr(a.i,s);else{var c=s.type,d=s.proxy;a.removeEventListener?a.removeEventListener(c,d,s.capture):a.detachEvent?a.detachEvent(ys(c),d):a.addListener&&a.removeListener&&a.removeListener(d),(c=Wr(a))?(Hr(c,s),c.h==0&&(c.src=null,a[zr]=null)):Vn(s)}}}function ys(s){return s in Gr?Gr[s]:Gr[s]="on"+s}function vc(s,a){if(s.da)s=!0;else{a=new zt(a,this);var c=s.listener,d=s.ha||s.src;s.fa&&Kr(s),s=c.call(d,a)}return s}function Wr(s){return s=s[zr],s instanceof Mn?s:null}var Qr="__closure_events_fn_"+(1e9*Math.random()>>>0);function vs(s){return typeof s=="function"?s:(s[Qr]||(s[Qr]=function(a){return s.handleEvent(a)}),s[Qr])}function ce(){qe.call(this),this.i=new Mn(this),this.M=this,this.F=null}k(ce,qe),ce.prototype[On]=!0,ce.prototype.removeEventListener=function(s,a,c,d){_s(this,s,a,c,d)};function _e(s,a){var c,d=s.F;if(d)for(c=[];d;d=d.F)c.push(d);if(s=s.M,d=a.type||a,typeof a=="string")a=new le(a,s);else if(a instanceof le)a.target=a.target||s;else{var I=a;a=new le(d,s),_(a,I)}if(I=!0,c)for(var w=c.length-1;0<=w;w--){var b=a.g=c[w];I=Ln(b,d,!0,a)&&I}if(b=a.g=s,I=Ln(b,d,!0,a)&&I,I=Ln(b,d,!1,a)&&I,c)for(w=0;w<c.length;w++)b=a.g=c[w],I=Ln(b,d,!1,a)&&I}ce.prototype.N=function(){if(ce.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var c=s.g[a],d=0;d<c.length;d++)Vn(c[d]);delete s.g[a],s.h--}}this.F=null},ce.prototype.K=function(s,a,c,d){return this.i.add(String(s),a,!1,c,d)},ce.prototype.L=function(s,a,c,d){return this.i.add(String(s),a,!0,c,d)};function Ln(s,a,c,d){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var I=!0,w=0;w<a.length;++w){var b=a[w];if(b&&!b.da&&b.capture==c){var q=b.listener,ie=b.ha||b.src;b.fa&&Hr(s.i,b),I=q.call(ie,d)!==!1&&I}}return I&&!d.defaultPrevented}function Es(s,a,c){if(typeof s=="function")c&&(s=R(s,c));else if(s&&typeof s.handleEvent=="function")s=R(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(s,a||0)}function Is(s){s.g=Es(()=>{s.g=null,s.i&&(s.i=!1,Is(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class Ec extends qe{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Is(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Gt(s){qe.call(this),this.h=s,this.g={}}k(Gt,qe);var Ts=[];function ws(s){ee(s.g,function(a,c){this.g.hasOwnProperty(c)&&Kr(a)},s),s.g={}}Gt.prototype.N=function(){Gt.aa.N.call(this),ws(this)},Gt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xr=u.JSON.stringify,Ic=u.JSON.parse,Tc=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function Jr(){}Jr.prototype.h=null;function As(s){return s.h||(s.h=s.i())}function Rs(){}var Kt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Yr(){le.call(this,"d")}k(Yr,le);function Zr(){le.call(this,"c")}k(Zr,le);var ot={},Ps=null;function xn(){return Ps=Ps||new ce}ot.La="serverreachability";function Ss(s){le.call(this,ot.La,s)}k(Ss,le);function Wt(s){const a=xn();_e(a,new Ss(a))}ot.STAT_EVENT="statevent";function bs(s,a){le.call(this,ot.STAT_EVENT,s),this.stat=a}k(bs,le);function ye(s){const a=xn();_e(a,new bs(a,s))}ot.Ma="timingevent";function Cs(s,a){le.call(this,ot.Ma,s),this.size=a}k(Cs,le);function Qt(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},a)}function Xt(){this.g=!0}Xt.prototype.xa=function(){this.g=!1};function wc(s,a,c,d,I,w){s.info(function(){if(s.g)if(w)for(var b="",q=w.split("&"),ie=0;ie<q.length;ie++){var B=q[ie].split("=");if(1<B.length){var ue=B[0];B=B[1];var he=ue.split("_");b=2<=he.length&&he[1]=="type"?b+(ue+"="+B+"&"):b+(ue+"=redacted&")}}else b=null;else b=w;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+a+`
`+c+`
`+b})}function Ac(s,a,c,d,I,w,b){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+a+`
`+c+`
`+w+" "+b})}function It(s,a,c,d){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+Pc(s,c)+(d?" "+d:"")})}function Rc(s,a){s.info(function(){return"TIMEOUT: "+a})}Xt.prototype.info=function(){};function Pc(s,a){if(!s.g)return a;if(!a)return null;try{var c=JSON.parse(a);if(c){for(s=0;s<c.length;s++)if(Array.isArray(c[s])){var d=c[s];if(!(2>d.length)){var I=d[1];if(Array.isArray(I)&&!(1>I.length)){var w=I[0];if(w!="noop"&&w!="stop"&&w!="close")for(var b=1;b<I.length;b++)I[b]=""}}}}return Xr(c)}catch{return a}}var Un={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ks={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ei;function Fn(){}k(Fn,Jr),Fn.prototype.g=function(){return new XMLHttpRequest},Fn.prototype.i=function(){return{}},ei=new Fn;function ze(s,a,c,d){this.j=s,this.i=a,this.l=c,this.R=d||1,this.U=new Gt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ds}function Ds(){this.i=null,this.g="",this.h=!1}var Ns={},ti={};function ni(s,a,c){s.L=1,s.v=Hn(Ne(a)),s.m=c,s.P=!0,Os(s,null)}function Os(s,a){s.F=Date.now(),Bn(s),s.A=Ne(s.v);var c=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Ks(c.i,"t",d),s.C=0,c=s.j.J,s.h=new Ds,s.g=ho(s.j,c?a:null,!s.m),0<s.O&&(s.M=new Ec(R(s.Y,s,s.g),s.O)),a=s.U,c=s.g,d=s.ca;var I="readystatechange";Array.isArray(I)||(I&&(Ts[0]=I.toString()),I=Ts);for(var w=0;w<I.length;w++){var b=ms(c,I[w],d||a.handleEvent,!1,a.h||a);if(!b)break;a.g[b.key]=b}a=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),Wt(),wc(s.i,s.u,s.A,s.l,s.R,s.m)}ze.prototype.ca=function(s){s=s.target;const a=this.M;a&&Oe(s)==3?a.j():this.Y(s)},ze.prototype.Y=function(s){try{if(s==this.g)e:{const he=Oe(this.g);var a=this.g.Ba();const At=this.g.Z();if(!(3>he)&&(he!=3||this.g&&(this.h.h||this.g.oa()||eo(this.g)))){this.J||he!=4||a==7||(a==8||0>=At?Wt(3):Wt(2)),ri(this);var c=this.g.Z();this.X=c;t:if(Vs(this)){var d=eo(this.g);s="";var I=d.length,w=Oe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){at(this),Jt(this);var b="";break t}this.h.i=new u.TextDecoder}for(a=0;a<I;a++)this.h.h=!0,s+=this.h.i.decode(d[a],{stream:!(w&&a==I-1)});d.length=0,this.h.g+=s,this.C=0,b=this.h.g}else b=this.g.oa();if(this.o=c==200,Ac(this.i,this.u,this.A,this.l,this.R,he,c),this.o){if(this.T&&!this.K){t:{if(this.g){var q,ie=this.g;if((q=ie.g?ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(q)){var B=q;break t}}B=null}if(c=B)It(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ii(this,c);else{this.o=!1,this.s=3,ye(12),at(this),Jt(this);break e}}if(this.P){c=!0;let Ie;for(;!this.J&&this.C<b.length;)if(Ie=Sc(this,b),Ie==ti){he==4&&(this.s=4,ye(14),c=!1),It(this.i,this.l,null,"[Incomplete Response]");break}else if(Ie==Ns){this.s=4,ye(15),It(this.i,this.l,b,"[Invalid Chunk]"),c=!1;break}else It(this.i,this.l,Ie,null),ii(this,Ie);if(Vs(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),he!=4||b.length!=0||this.h.h||(this.s=1,ye(16),c=!1),this.o=this.o&&c,!c)It(this.i,this.l,b,"[Invalid Chunked Response]"),at(this),Jt(this);else if(0<b.length&&!this.W){this.W=!0;var ue=this.j;ue.g==this&&ue.ba&&!ue.M&&(ue.j.info("Great, no buffering proxy detected. Bytes received: "+b.length),ui(ue),ue.M=!0,ye(11))}}else It(this.i,this.l,b,null),ii(this,b);he==4&&at(this),this.o&&!this.J&&(he==4?ao(this.j,this):(this.o=!1,Bn(this)))}else qc(this.g),c==400&&0<b.indexOf("Unknown SID")?(this.s=3,ye(12)):(this.s=0,ye(13)),at(this),Jt(this)}}}catch{}finally{}};function Vs(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Sc(s,a){var c=s.C,d=a.indexOf(`
`,c);return d==-1?ti:(c=Number(a.substring(c,d)),isNaN(c)?Ns:(d+=1,d+c>a.length?ti:(a=a.slice(d,d+c),s.C=d+c,a)))}ze.prototype.cancel=function(){this.J=!0,at(this)};function Bn(s){s.S=Date.now()+s.I,Ms(s,s.I)}function Ms(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Qt(R(s.ba,s),a)}function ri(s){s.B&&(u.clearTimeout(s.B),s.B=null)}ze.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Rc(this.i,this.A),this.L!=2&&(Wt(),ye(17)),at(this),this.s=2,Jt(this)):Ms(this,this.S-s)};function Jt(s){s.j.G==0||s.J||ao(s.j,s)}function at(s){ri(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,ws(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function ii(s,a){try{var c=s.j;if(c.G!=0&&(c.g==s||si(c.h,s))){if(!s.K&&si(c.h,s)&&c.G==3){try{var d=c.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<s.F)Qn(c),Kn(c);else break e;ci(c),ye(18)}}else c.za=I[1],0<c.za-c.T&&37500>I[2]&&c.F&&c.v==0&&!c.C&&(c.C=Qt(R(c.Za,c),6e3));if(1>=Us(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else ct(c,11)}else if((s.K||c.g==s)&&Qn(c),!j(a))for(I=c.Da.g.parse(a),a=0;a<I.length;a++){let B=I[a];if(c.T=B[0],B=B[1],c.G==2)if(B[0]=="c"){c.K=B[1],c.ia=B[2];const ue=B[3];ue!=null&&(c.la=ue,c.j.info("VER="+c.la));const he=B[4];he!=null&&(c.Aa=he,c.j.info("SVER="+c.Aa));const At=B[5];At!=null&&typeof At=="number"&&0<At&&(d=1.5*At,c.L=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const Ie=s.g;if(Ie){const Jn=Ie.g?Ie.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Jn){var w=d.h;w.g||Jn.indexOf("spdy")==-1&&Jn.indexOf("quic")==-1&&Jn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(oi(w,w.h),w.h=null))}if(d.D){const hi=Ie.g?Ie.g.getResponseHeader("X-HTTP-Session-Id"):null;hi&&(d.ya=hi,K(d.I,d.D,hi))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-s.F,c.j.info("Handshake RTT: "+c.R+"ms")),d=c;var b=s;if(d.qa=uo(d,d.J?d.ia:null,d.W),b.K){Fs(d.h,b);var q=b,ie=d.L;ie&&(q.I=ie),q.B&&(ri(q),Bn(q)),d.g=b}else so(d);0<c.i.length&&Wn(c)}else B[0]!="stop"&&B[0]!="close"||ct(c,7);else c.G==3&&(B[0]=="stop"||B[0]=="close"?B[0]=="stop"?ct(c,7):li(c):B[0]!="noop"&&c.l&&c.l.ta(B),c.v=0)}}Wt(4)}catch{}}var bc=class{constructor(s,a){this.g=s,this.map=a}};function Ls(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xs(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Us(s){return s.h?1:s.g?s.g.size:0}function si(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function oi(s,a){s.g?s.g.add(a):s.h=a}function Fs(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}Ls.prototype.cancel=function(){if(this.i=Bs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Bs(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const c of s.g.values())a=a.concat(c.D);return a}return O(s.i)}function Cc(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var a=[],c=s.length,d=0;d<c;d++)a.push(s[d]);return a}a=[],c=0;for(d in s)a[c++]=s[d];return a}function kc(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var a=[];s=s.length;for(var c=0;c<s;c++)a.push(c);return a}a=[],c=0;for(const d in s)a[c++]=d;return a}}}function js(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var c=kc(s),d=Cc(s),I=d.length,w=0;w<I;w++)a.call(void 0,d[w],c&&c[w],s)}var $s=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Dc(s,a){if(s){s=s.split("&");for(var c=0;c<s.length;c++){var d=s[c].indexOf("="),I=null;if(0<=d){var w=s[c].substring(0,d);I=s[c].substring(d+1)}else w=s[c];a(w,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function lt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof lt){this.h=s.h,jn(this,s.j),this.o=s.o,this.g=s.g,$n(this,s.s),this.l=s.l;var a=s.i,c=new en;c.i=a.i,a.g&&(c.g=new Map(a.g),c.h=a.h),Hs(this,c),this.m=s.m}else s&&(a=String(s).match($s))?(this.h=!1,jn(this,a[1]||"",!0),this.o=Yt(a[2]||""),this.g=Yt(a[3]||"",!0),$n(this,a[4]),this.l=Yt(a[5]||"",!0),Hs(this,a[6]||"",!0),this.m=Yt(a[7]||"")):(this.h=!1,this.i=new en(null,this.h))}lt.prototype.toString=function(){var s=[],a=this.j;a&&s.push(Zt(a,qs,!0),":");var c=this.g;return(c||a=="file")&&(s.push("//"),(a=this.o)&&s.push(Zt(a,qs,!0),"@"),s.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&s.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&s.push("/"),s.push(Zt(c,c.charAt(0)=="/"?Vc:Oc,!0))),(c=this.i.toString())&&s.push("?",c),(c=this.m)&&s.push("#",Zt(c,Lc)),s.join("")};function Ne(s){return new lt(s)}function jn(s,a,c){s.j=c?Yt(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function $n(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function Hs(s,a,c){a instanceof en?(s.i=a,xc(s.i,s.h)):(c||(a=Zt(a,Mc)),s.i=new en(a,s.h))}function K(s,a,c){s.i.set(a,c)}function Hn(s){return K(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Yt(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Zt(s,a,c){return typeof s=="string"?(s=encodeURI(s).replace(a,Nc),c&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Nc(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var qs=/[#\/\?@]/g,Oc=/[#\?:]/g,Vc=/[#\?]/g,Mc=/[#\?@]/g,Lc=/#/g;function en(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function Ge(s){s.g||(s.g=new Map,s.h=0,s.i&&Dc(s.i,function(a,c){s.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=en.prototype,n.add=function(s,a){Ge(this),this.i=null,s=Tt(this,s);var c=this.g.get(s);return c||this.g.set(s,c=[]),c.push(a),this.h+=1,this};function zs(s,a){Ge(s),a=Tt(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Gs(s,a){return Ge(s),a=Tt(s,a),s.g.has(a)}n.forEach=function(s,a){Ge(this),this.g.forEach(function(c,d){c.forEach(function(I){s.call(a,I,d,this)},this)},this)},n.na=function(){Ge(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),c=[];for(let d=0;d<a.length;d++){const I=s[d];for(let w=0;w<I.length;w++)c.push(a[d])}return c},n.V=function(s){Ge(this);let a=[];if(typeof s=="string")Gs(this,s)&&(a=a.concat(this.g.get(Tt(this,s))));else{s=Array.from(this.g.values());for(let c=0;c<s.length;c++)a=a.concat(s[c])}return a},n.set=function(s,a){return Ge(this),this.i=null,s=Tt(this,s),Gs(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},n.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function Ks(s,a,c){zs(s,a),0<c.length&&(s.i=null,s.g.set(Tt(s,a),O(c)),s.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var c=0;c<a.length;c++){var d=a[c];const w=encodeURIComponent(String(d)),b=this.V(d);for(d=0;d<b.length;d++){var I=w;b[d]!==""&&(I+="="+encodeURIComponent(String(b[d]))),s.push(I)}}return this.i=s.join("&")};function Tt(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function xc(s,a){a&&!s.j&&(Ge(s),s.i=null,s.g.forEach(function(c,d){var I=d.toLowerCase();d!=I&&(zs(this,d),Ks(this,I,c))},s)),s.j=a}function Uc(s,a){const c=new Xt;if(u.Image){const d=new Image;d.onload=C(Ke,c,"TestLoadImage: loaded",!0,a,d),d.onerror=C(Ke,c,"TestLoadImage: error",!1,a,d),d.onabort=C(Ke,c,"TestLoadImage: abort",!1,a,d),d.ontimeout=C(Ke,c,"TestLoadImage: timeout",!1,a,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else a(!1)}function Fc(s,a){const c=new Xt,d=new AbortController,I=setTimeout(()=>{d.abort(),Ke(c,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:d.signal}).then(w=>{clearTimeout(I),w.ok?Ke(c,"TestPingServer: ok",!0,a):Ke(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(I),Ke(c,"TestPingServer: error",!1,a)})}function Ke(s,a,c,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(c)}catch{}}function Bc(){this.g=new Tc}function jc(s,a,c){const d=c||"";try{js(s,function(I,w){let b=I;f(I)&&(b=Xr(I)),a.push(d+w+"="+encodeURIComponent(b))})}catch(I){throw a.push(d+"type="+encodeURIComponent("_badmap")),I}}function qn(s){this.l=s.Ub||null,this.j=s.eb||!1}k(qn,Jr),qn.prototype.g=function(){return new zn(this.l,this.j)},qn.prototype.i=function(s){return function(){return s}}({});function zn(s,a){ce.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(zn,ce),n=zn.prototype,n.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,nn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,tn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,nn(this)),this.g&&(this.readyState=3,nn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ws(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ws(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?tn(this):nn(this),this.readyState==3&&Ws(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,tn(this))},n.Qa=function(s){this.g&&(this.response=s,tn(this))},n.ga=function(){this.g&&tn(this)};function tn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,nn(s)}n.setRequestHeader=function(s,a){this.u.append(s,a)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,s.push(c[0]+": "+c[1]),c=a.next();return s.join(`\r
`)};function nn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(zn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Qs(s){let a="";return ee(s,function(c,d){a+=d,a+=":",a+=c,a+=`\r
`}),a}function ai(s,a,c){e:{for(d in c){var d=!1;break e}d=!0}d||(c=Qs(c),typeof s=="string"?c!=null&&encodeURIComponent(String(c)):K(s,a,c))}function Q(s){ce.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Q,ce);var $c=/^https?$/i,Hc=["POST","PUT"];n=Q.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,a,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ei.g(),this.v=this.o?As(this.o):As(ei),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(w){Xs(this,w);return}if(s=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)c.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())c.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(w=>w.toLowerCase()=="content-type"),I=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Hc,a,void 0))||d||I||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,b]of c)this.g.setRequestHeader(w,b);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Zs(this),this.u=!0,this.g.send(s),this.u=!1}catch(w){Xs(this,w)}};function Xs(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,Js(s),Gn(s)}function Js(s){s.A||(s.A=!0,_e(s,"complete"),_e(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,_e(this,"complete"),_e(this,"abort"),Gn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gn(this,!0)),Q.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ys(this):this.bb())},n.bb=function(){Ys(this)};function Ys(s){if(s.h&&typeof l<"u"&&(!s.v[1]||Oe(s)!=4||s.Z()!=2)){if(s.u&&Oe(s)==4)Es(s.Ea,0,s);else if(_e(s,"readystatechange"),Oe(s)==4){s.h=!1;try{const b=s.Z();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var c;if(!(c=a)){var d;if(d=b===0){var I=String(s.D).match($s)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),d=!$c.test(I?I.toLowerCase():"")}c=d}if(c)_e(s,"complete"),_e(s,"success");else{s.m=6;try{var w=2<Oe(s)?s.g.statusText:""}catch{w=""}s.l=w+" ["+s.Z()+"]",Js(s)}}finally{Gn(s)}}}}function Gn(s,a){if(s.g){Zs(s);const c=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||_e(s,"ready");try{c.onreadystatechange=d}catch{}}}function Zs(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Oe(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Oe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),Ic(a)}};function eo(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function qc(s){const a={};s=(s.g&&2<=Oe(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(j(s[d]))continue;var c=v(s[d]);const I=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const w=a[I]||[];a[I]=w,w.push(c)}E(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function rn(s,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[s]||a}function to(s){this.Aa=0,this.i=[],this.j=new Xt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=rn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=rn("baseRetryDelayMs",5e3,s),this.cb=rn("retryDelaySeedMs",1e4,s),this.Wa=rn("forwardChannelMaxRetries",2,s),this.wa=rn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Ls(s&&s.concurrentRequestLimit),this.Da=new Bc,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=to.prototype,n.la=8,n.G=1,n.connect=function(s,a,c,d){ye(0),this.W=s,this.H=a||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.I=uo(this,null,this.W),Wn(this)};function li(s){if(no(s),s.G==3){var a=s.U++,c=Ne(s.I);if(K(c,"SID",s.K),K(c,"RID",a),K(c,"TYPE","terminate"),sn(s,c),a=new ze(s,s.j,a),a.L=2,a.v=Hn(Ne(c)),c=!1,u.navigator&&u.navigator.sendBeacon)try{c=u.navigator.sendBeacon(a.v.toString(),"")}catch{}!c&&u.Image&&(new Image().src=a.v,c=!0),c||(a.g=ho(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Bn(a)}co(s)}function Kn(s){s.g&&(ui(s),s.g.cancel(),s.g=null)}function no(s){Kn(s),s.u&&(u.clearTimeout(s.u),s.u=null),Qn(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function Wn(s){if(!xs(s.h)&&!s.s){s.s=!0;var a=s.Ga;Ht||gs(),qt||(Ht(),qt=!0),$r.add(a,s),s.B=0}}function zc(s,a){return Us(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Qt(R(s.Ga,s,a),lo(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const I=new ze(this,this.j,s);let w=this.o;if(this.S&&(w?(w=p(w),_(w,this.S)):w=this.S),this.m!==null||this.O||(I.H=w,w=null),this.P)e:{for(var a=0,c=0;c<this.i.length;c++){t:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=c;break e}if(a===4096||c===this.i.length-1){a=c+1;break e}}a=1e3}else a=1e3;a=io(this,I,a),c=Ne(this.I),K(c,"RID",s),K(c,"CVER",22),this.D&&K(c,"X-HTTP-Session-Id",this.D),sn(this,c),w&&(this.O?a="headers="+encodeURIComponent(String(Qs(w)))+"&"+a:this.m&&ai(c,this.m,w)),oi(this.h,I),this.Ua&&K(c,"TYPE","init"),this.P?(K(c,"$req",a),K(c,"SID","null"),I.T=!0,ni(I,c,null)):ni(I,c,a),this.G=2}}else this.G==3&&(s?ro(this,s):this.i.length==0||xs(this.h)||ro(this))};function ro(s,a){var c;a?c=a.l:c=s.U++;const d=Ne(s.I);K(d,"SID",s.K),K(d,"RID",c),K(d,"AID",s.T),sn(s,d),s.m&&s.o&&ai(d,s.m,s.o),c=new ze(s,s.j,c,s.B+1),s.m===null&&(c.H=s.o),a&&(s.i=a.D.concat(s.i)),a=io(s,c,1e3),c.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),oi(s.h,c),ni(c,d,a)}function sn(s,a){s.H&&ee(s.H,function(c,d){K(a,d,c)}),s.l&&js({},function(c,d){K(a,d,c)})}function io(s,a,c){c=Math.min(s.i.length,c);var d=s.l?R(s.l.Na,s.l,s):null;e:{var I=s.i;let w=-1;for(;;){const b=["count="+c];w==-1?0<c?(w=I[0].g,b.push("ofs="+w)):w=0:b.push("ofs="+w);let q=!0;for(let ie=0;ie<c;ie++){let B=I[ie].g;const ue=I[ie].map;if(B-=w,0>B)w=Math.max(0,I[ie].g-100),q=!1;else try{jc(ue,b,"req"+B+"_")}catch{d&&d(ue)}}if(q){d=b.join("&");break e}}}return s=s.i.splice(0,c),a.D=s,d}function so(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;Ht||gs(),qt||(Ht(),qt=!0),$r.add(a,s),s.v=0}}function ci(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Qt(R(s.Fa,s),lo(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,oo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Qt(R(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ye(10),Kn(this),oo(this))};function ui(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function oo(s){s.g=new ze(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=Ne(s.qa);K(a,"RID","rpc"),K(a,"SID",s.K),K(a,"AID",s.T),K(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&K(a,"TO",s.ja),K(a,"TYPE","xmlhttp"),sn(s,a),s.m&&s.o&&ai(a,s.m,s.o),s.L&&(s.g.I=s.L);var c=s.g;s=s.ia,c.L=1,c.v=Hn(Ne(a)),c.m=null,c.P=!0,Os(c,s)}n.Za=function(){this.C!=null&&(this.C=null,Kn(this),ci(this),ye(19))};function Qn(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function ao(s,a){var c=null;if(s.g==a){Qn(s),ui(s),s.g=null;var d=2}else if(si(s.h,a))c=a.D,Fs(s.h,a),d=1;else return;if(s.G!=0){if(a.o)if(d==1){c=a.m?a.m.length:0,a=Date.now()-a.F;var I=s.B;d=xn(),_e(d,new Cs(d,c)),Wn(s)}else so(s);else if(I=a.s,I==3||I==0&&0<a.X||!(d==1&&zc(s,a)||d==2&&ci(s)))switch(c&&0<c.length&&(a=s.h,a.i=a.i.concat(c)),I){case 1:ct(s,5);break;case 4:ct(s,10);break;case 3:ct(s,6);break;default:ct(s,2)}}}function lo(s,a){let c=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(c*=2),c*a}function ct(s,a){if(s.j.info("Error code "+a),a==2){var c=R(s.fb,s),d=s.Xa;const I=!d;d=new lt(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||jn(d,"https"),Hn(d),I?Uc(d.toString(),c):Fc(d.toString(),c)}else ye(2);s.G=0,s.l&&s.l.sa(a),co(s),no(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))};function co(s){if(s.G=0,s.ka=[],s.l){const a=Bs(s.h);(a.length!=0||s.i.length!=0)&&(D(s.ka,a),D(s.ka,s.i),s.h.i.length=0,O(s.i),s.i.length=0),s.l.ra()}}function uo(s,a,c){var d=c instanceof lt?Ne(c):new lt(c);if(d.g!="")a&&(d.g=a+"."+d.g),$n(d,d.s);else{var I=u.location;d=I.protocol,a=a?a+"."+I.hostname:I.hostname,I=+I.port;var w=new lt(null);d&&jn(w,d),a&&(w.g=a),I&&$n(w,I),c&&(w.l=c),d=w}return c=s.D,a=s.ya,c&&a&&K(d,c,a),K(d,"VER",s.la),sn(s,d),d}function ho(s,a,c){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new Q(new qn({eb:c})):new Q(s.pa),a.Ha(s.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function fo(){}n=fo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Xn(){}Xn.prototype.g=function(s,a){return new Ee(s,a)};function Ee(s,a){ce.call(this),this.g=new to(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!j(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!j(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new wt(this)}k(Ee,ce),Ee.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ee.prototype.close=function(){li(this.g)},Ee.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var c={};c.__data__=s,s=c}else this.u&&(c={},c.__data__=Xr(s),s=c);a.i.push(new bc(a.Ya++,s)),a.G==3&&Wn(a)},Ee.prototype.N=function(){this.g.l=null,delete this.j,li(this.g),delete this.g,Ee.aa.N.call(this)};function po(s){Yr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){e:{for(const c in a){s=c;break e}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}k(po,Yr);function go(){Zr.call(this),this.status=1}k(go,Zr);function wt(s){this.g=s}k(wt,fo),wt.prototype.ua=function(){_e(this.g,"a")},wt.prototype.ta=function(s){_e(this.g,new po(s))},wt.prototype.sa=function(s){_e(this.g,new go)},wt.prototype.ra=function(){_e(this.g,"b")},Xn.prototype.createWebChannel=Xn.prototype.g,Ee.prototype.send=Ee.prototype.o,Ee.prototype.open=Ee.prototype.m,Ee.prototype.close=Ee.prototype.close,La=function(){return new Xn},Ma=function(){return xn()},Va=ot,Si={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Un.NO_ERROR=0,Un.TIMEOUT=8,Un.HTTP_ERROR=6,ir=Un,ks.COMPLETE="complete",Oa=ks,Rs.EventType=Kt,Kt.OPEN="a",Kt.CLOSE="b",Kt.ERROR="c",Kt.MESSAGE="d",ce.prototype.listen=ce.prototype.K,cn=Rs,Q.prototype.listenOnce=Q.prototype.L,Q.prototype.getLastError=Q.prototype.Ka,Q.prototype.getLastErrorCode=Q.prototype.Ba,Q.prototype.getStatus=Q.prototype.Z,Q.prototype.getResponseJson=Q.prototype.Oa,Q.prototype.getResponseText=Q.prototype.oa,Q.prototype.send=Q.prototype.ea,Q.prototype.setWithCredentials=Q.prototype.Ha,Na=Q}).apply(typeof Yn<"u"?Yn:typeof self<"u"?self:typeof window<"u"?window:{});const So="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}fe.UNAUTHENTICATED=new fe(null),fe.GOOGLE_CREDENTIALS=new fe("google-credentials-uid"),fe.FIRST_PARTY=new fe("first-party-uid"),fe.MOCK_USER=new fe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ft="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new Fi("@firebase/firestore");function on(){return mt.logLevel}function N(n,...e){if(mt.logLevel<=x.DEBUG){const t=e.map($i);mt.debug(`Firestore (${Ft}): ${n}`,...t)}}function _t(n,...e){if(mt.logLevel<=x.ERROR){const t=e.map($i);mt.error(`Firestore (${Ft}): ${n}`,...t)}}function pr(n,...e){if(mt.logLevel<=x.WARN){const t=e.map($i);mt.warn(`Firestore (${Ft}): ${n}`,...t)}}function $i(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n="Unexpected state"){const e=`FIRESTORE (${Ft}) INTERNAL ASSERTION FAILED: `+n;throw _t(e),new Error(e)}function Y(n,e){n||U()}function G(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends He{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Sh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(fe.UNAUTHENTICATED))}shutdown(){}}class bh{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Ch{constructor(e){this.t=e,this.currentUser=fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0);let r=this.i;const i=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new dt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new dt,e.enqueueRetryable(()=>i(this.currentUser))};const l=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},u=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new dt)}},0),l()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string"),new xa(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new fe(e)}}class kh{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=fe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Dh{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new kh(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(fe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Nh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Oh{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Y(this.o===void 0);const r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.R;return this.R=o.token,N("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const i=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new Nh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=Vh(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%e.length))}return r}}function z(n,e){return n<e?-1:n>e?1:0}function Nt(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return re.fromMillis(Date.now())}static fromDate(e){return re.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new re(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.timestamp=e}static fromTimestamp(e){return new W(e)}static min(){return new W(new re(0,0))}static max(){return new W(new re(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(),r===void 0?r=e.length-t:r>e.length-t&&U(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return mn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof mn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const o=e.get(i),l=t.get(i);if(o<l)return-1;if(o>l)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class X extends mn{construct(e,t,r){return new X(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new X(t)}static emptyPath(){return new X([])}}const Mh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ae extends mn{construct(e,t,r){return new ae(e,t,r)}static isValidIdentifier(e){return Mh.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ae.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ae(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const o=()=>{if(r.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let l=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,i+=2}else u==="`"?(l=!l,i++):u!=="."||l?(r+=u,i++):(o(),i++)}if(o(),l)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ae(t)}static emptyPath(){return new ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(X.fromString(e))}static fromName(e){return new L(X.fromString(e).popFirst(5))}static empty(){return new L(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new X(e.slice()))}}function Lh(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=W.fromTimestamp(r===1e9?new re(t+1,0):new re(t,r));return new rt(i,L.empty(),e)}function xh(n){return new rt(n.readTime,n.key,-1)}class rt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new rt(W.min(),L.empty(),-1)}static max(){return new rt(W.max(),L.empty(),-1)}}function Uh(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:z(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Bh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fa(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==Fh)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let i=0,o=0,l=!1;e.forEach(u=>{++i,u.next(()=>{++o,l&&o===i&&t()},h=>r(h))}),l=!0,o===i&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(i=>i?P.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,o)=>{r.push(t.call(this,i,o))}),this.waitFor(r)}static mapArray(e,t){return new P((r,i)=>{const o=e.length,l=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next(y=>{l[f]=y,++u,u===o&&r(l)},y=>i(y))}})}static doWhile(e,t){return new P((r,i)=>{const o=()=>{e()===!0?t().next(()=>{o()},i):r()};o()})}}function jh(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function kr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Ba.oe=-1;function Hi(n){return n==null}function gr(n){return n===0&&1/n==-1/0}function $h(n){return typeof n=="number"&&Number.isInteger(n)&&!gr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ja(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t){this.comparator=e,this.root=t||se.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,se.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,se.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Zn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Zn(this.root,e,this.comparator,!1)}getReverseIterator(){return new Zn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Zn(this.root,e,this.comparator,!0)}}class Zn{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class se{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r??se.RED,this.left=i??se.EMPTY,this.right=o??se.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new se(e??this.key,t??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return se.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return se.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();const e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}}se.EMPTY=null,se.RED=!0,se.BLACK=!1;se.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,r,i,o){return this}insert(e,t,r){return new se(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Co(this.data.getIterator())}getIteratorFrom(e){return new Co(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ge)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ge(this.comparator);return t.data=e,t}}class Co{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.fields=e,e.sort(ae.comparator)}static empty(){return new Ae([])}unionWith(e){let t=new ge(ae.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ae(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Nt(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Hh("Invalid base64 string: "+o):o}}(e);return new Ce(t)}static fromUint8Array(e){const t=function(i){let o="";for(let l=0;l<i.length;++l)o+=String.fromCharCode(i[l]);return o}(e);return new Ce(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ce.EMPTY_BYTE_STRING=new Ce("");const qh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yt(n){if(Y(!!n),typeof n=="string"){let e=0;const t=qh.exec(n);if(Y(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:oe(n.seconds),nanos:oe(n.nanos)}}function oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function _n(n){return typeof n=="string"?Ce.fromBase64String(n):Ce.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qi(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function $a(n){const e=n.mapValue.fields.__previous_value__;return qi(e)?$a(e):e}function mr(n){const e=yt(n.mapValue.fields.__local_write_time__.timestampValue);return new re(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(e,t,r,i,o,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f}}class _r{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new _r("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof _r&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er={mapValue:{}};function Ot(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?qi(n)?4:Kh(n)?9007199254740991:Gh(n)?10:11:U()}function ke(n,e){if(n===e)return!0;const t=Ot(n);if(t!==Ot(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return mr(n).isEqual(mr(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const l=yt(i.timestampValue),u=yt(o.timestampValue);return l.seconds===u.seconds&&l.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,o){return _n(i.bytesValue).isEqual(_n(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,o){return oe(i.geoPointValue.latitude)===oe(o.geoPointValue.latitude)&&oe(i.geoPointValue.longitude)===oe(o.geoPointValue.longitude)}(n,e);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return oe(i.integerValue)===oe(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const l=oe(i.doubleValue),u=oe(o.doubleValue);return l===u?gr(l)===gr(u):isNaN(l)&&isNaN(u)}return!1}(n,e);case 9:return Nt(n.arrayValue.values||[],e.arrayValue.values||[],ke);case 10:case 11:return function(i,o){const l=i.mapValue.fields||{},u=o.mapValue.fields||{};if(bo(l)!==bo(u))return!1;for(const h in l)if(l.hasOwnProperty(h)&&(u[h]===void 0||!ke(l[h],u[h])))return!1;return!0}(n,e);default:return U()}}function yn(n,e){return(n.values||[]).find(t=>ke(t,e))!==void 0}function Vt(n,e){if(n===e)return 0;const t=Ot(n),r=Ot(e);if(t!==r)return z(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(n.booleanValue,e.booleanValue);case 2:return function(o,l){const u=oe(o.integerValue||o.doubleValue),h=oe(l.integerValue||l.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,e);case 3:return ko(n.timestampValue,e.timestampValue);case 4:return ko(mr(n),mr(e));case 5:return z(n.stringValue,e.stringValue);case 6:return function(o,l){const u=_n(o),h=_n(l);return u.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,l){const u=o.split("/"),h=l.split("/");for(let f=0;f<u.length&&f<h.length;f++){const y=z(u[f],h[f]);if(y!==0)return y}return z(u.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,l){const u=z(oe(o.latitude),oe(l.latitude));return u!==0?u:z(oe(o.longitude),oe(l.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Do(n.arrayValue,e.arrayValue);case 10:return function(o,l){var u,h,f,y;const A=o.fields||{},R=l.fields||{},C=(u=A.value)===null||u===void 0?void 0:u.arrayValue,k=(h=R.value)===null||h===void 0?void 0:h.arrayValue,O=z(((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0,((y=k==null?void 0:k.values)===null||y===void 0?void 0:y.length)||0);return O!==0?O:Do(C,k)}(n.mapValue,e.mapValue);case 11:return function(o,l){if(o===er.mapValue&&l===er.mapValue)return 0;if(o===er.mapValue)return 1;if(l===er.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=l.fields||{},y=Object.keys(f);h.sort(),y.sort();for(let A=0;A<h.length&&A<y.length;++A){const R=z(h[A],y[A]);if(R!==0)return R;const C=Vt(u[h[A]],f[y[A]]);if(C!==0)return C}return z(h.length,y.length)}(n.mapValue,e.mapValue);default:throw U()}}function ko(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return z(n,e);const t=yt(n),r=yt(e),i=z(t.seconds,r.seconds);return i!==0?i:z(t.nanos,r.nanos)}function Do(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const o=Vt(t[i],r[i]);if(o)return o}return z(t.length,r.length)}function Mt(n){return bi(n)}function bi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=yt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return _n(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const o of t.values||[])i?i=!1:r+=",",r+=bi(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",o=!0;for(const l of r)o?o=!1:i+=",",i+=`${l}:${bi(t.fields[l])}`;return i+"}"}(n.mapValue):U()}function Ci(n){return!!n&&"integerValue"in n}function zi(n){return!!n&&"arrayValue"in n}function sr(n){return!!n&&"mapValue"in n}function Gh(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function un(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=un(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=un(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Kh(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.value=e}static empty(){return new we({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!sr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=un(t)}setAll(e){let t=ae.emptyPath(),r={},i=[];e.forEach((l,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,i),r={},i=[],t=u.popLast()}l?r[u.lastSegment()]=un(l):i.push(u.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){const t=this.field(e.popLast());sr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ke(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];sr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Pn(t,(i,o)=>e[i]=o);for(const i of r)delete e[i]}clone(){return new we(un(this.value))}}function Ha(n){const e=[];return Pn(n.fields,(t,r)=>{const i=new ae([t]);if(sr(r)){const o=Ha(r.mapValue).fields;if(o.length===0)e.push(i);else for(const l of o)e.push(i.child(l))}else e.push(i)}),new Ae(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t,r,i,o,l,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=l,this.documentState=u}static newInvalidDocument(e){return new Te(e,0,W.min(),W.min(),W.min(),we.empty(),0)}static newFoundDocument(e,t,r,i){return new Te(e,1,t,W.min(),r,i,0)}static newNoDocument(e,t){return new Te(e,2,t,W.min(),W.min(),we.empty(),0)}static newUnknownDocument(e,t){return new Te(e,3,t,W.min(),W.min(),we.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=we.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=we.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Te&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Te(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t){this.position=e,this.inclusive=t}}function No(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const o=e[i],l=n.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(l.referenceValue),t.key):r=Vt(l,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Oo(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ke(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Wh(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{}class ne extends qa{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Xh(e,t,r):t==="array-contains"?new Zh(e,r):t==="in"?new ed(e,r):t==="not-in"?new td(e,r):t==="array-contains-any"?new nd(e,r):new ne(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Jh(e,r):new Yh(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Vt(t,this.value)):t!==null&&Ot(this.value)===Ot(t)&&this.matchesComparison(Vt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class it extends qa{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new it(e,t)}matches(e){return za(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function za(n){return n.op==="and"}function Ga(n){return Qh(n)&&za(n)}function Qh(n){for(const e of n.filters)if(e instanceof it)return!1;return!0}function ki(n){if(n instanceof ne)return n.field.canonicalString()+n.op.toString()+Mt(n.value);if(Ga(n))return n.filters.map(e=>ki(e)).join(",");{const e=n.filters.map(t=>ki(t)).join(",");return`${n.op}(${e})`}}function Ka(n,e){return n instanceof ne?function(r,i){return i instanceof ne&&r.op===i.op&&r.field.isEqual(i.field)&&ke(r.value,i.value)}(n,e):n instanceof it?function(r,i){return i instanceof it&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,l,u)=>o&&Ka(l,i.filters[u]),!0):!1}(n,e):void U()}function Wa(n){return n instanceof ne?function(t){return`${t.field.canonicalString()} ${t.op} ${Mt(t.value)}`}(n):n instanceof it?function(t){return t.op.toString()+" {"+t.getFilters().map(Wa).join(" ,")+"}"}(n):"Filter"}class Xh extends ne{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class Jh extends ne{constructor(e,t){super(e,"in",t),this.keys=Qa("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Yh extends ne{constructor(e,t){super(e,"not-in",t),this.keys=Qa("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Qa(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class Zh extends ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return zi(t)&&yn(t.arrayValue,this.value)}}class ed extends ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&yn(this.value.arrayValue,t)}}class td extends ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(yn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!yn(this.value.arrayValue,t)}}class nd extends ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!zi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>yn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t=null,r=[],i=[],o=null,l=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=l,this.endAt=u,this.ue=null}}function Vo(n,e=null,t=[],r=[],i=null,o=null,l=null){return new rd(n,e,t,r,i,o,l)}function Gi(n){const e=G(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ki(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Hi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Mt(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Mt(r)).join(",")),e.ue=t}return e.ue}function Ki(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Wh(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ka(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Oo(n.startAt,e.startAt)&&Oo(n.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,t=null,r=[],i=[],o=null,l="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=l,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function id(n,e,t,r,i,o,l,u){return new Dr(n,e,t,r,i,o,l,u)}function sd(n){return new Dr(n)}function Mo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function od(n){return n.collectionGroup!==null}function hn(n){const e=G(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(l){let u=new ge(ae.comparator);return l.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new vr(o,r))}),t.has(ae.keyField().canonicalString())||e.ce.push(new vr(ae.keyField(),r))}return e.ce}function ft(n){const e=G(n);return e.le||(e.le=ad(e,hn(n))),e.le}function ad(n,e){if(n.limitType==="F")return Vo(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new vr(i.field,o)});const t=n.endAt?new yr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new yr(n.startAt.position,n.startAt.inclusive):null;return Vo(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Di(n,e,t){return new Dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Xa(n,e){return Ki(ft(n),ft(e))&&n.limitType===e.limitType}function Ja(n){return`${Gi(ft(n))}|lt:${n.limitType}`}function an(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Wa(i)).join(", ")}]`),Hi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(l){return`${l.field.canonicalString()} (${l.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Mt(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Mt(i)).join(",")),`Target(${r})`}(ft(n))}; limitType=${n.limitType})`}function Wi(n,e){return e.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,i){for(const o of hn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(l,u,h){const f=No(l,u,h);return l.inclusive?f<=0:f<0}(r.startAt,hn(r),i)||r.endAt&&!function(l,u,h){const f=No(l,u,h);return l.inclusive?f>=0:f>0}(r.endAt,hn(r),i))}(n,e)}function ld(n){return(e,t)=>{let r=!1;for(const i of hn(n)){const o=cd(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function cd(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(o,l,u){const h=l.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Vt(h,f):U()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Pn(this.inner,(t,r)=>{for(const[i,o]of r)e(i,o)})}isEmpty(){return ja(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud=new ve(L.comparator);function Er(){return ud}const Ya=new ve(L.comparator);function tr(...n){let e=Ya;for(const t of n)e=e.insert(t.key,t);return e}function Za(n){let e=Ya;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function ht(){return dn()}function el(){return dn()}function dn(){return new Bt(n=>n.toString(),(n,e)=>n.isEqual(e))}const hd=new ve(L.comparator),dd=new ge(L.comparator);function pe(...n){let e=dd;for(const t of n)e=e.add(t);return e}const fd=new ge(z);function pd(){return fd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gr(e)?"-0":e}}function tl(n){return{integerValue:""+n}}function gd(n,e){return $h(e)?tl(e):Qi(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(){this._=void 0}}function md(n,e,t){return n instanceof vn?function(i,o){const l={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&qi(o)&&(o=$a(o)),o&&(l.fields.__previous_value__=o),{mapValue:l}}(t,e):n instanceof En?rl(n,e):n instanceof In?il(n,e):function(i,o){const l=nl(i,o),u=Lo(l)+Lo(i.Pe);return Ci(l)&&Ci(i.Pe)?tl(u):Qi(i.serializer,u)}(n,e)}function _d(n,e,t){return n instanceof En?rl(n,e):n instanceof In?il(n,e):t}function nl(n,e){return n instanceof Ir?function(r){return Ci(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class vn extends Nr{}class En extends Nr{constructor(e){super(),this.elements=e}}function rl(n,e){const t=sl(e);for(const r of n.elements)t.some(i=>ke(i,r))||t.push(r);return{arrayValue:{values:t}}}class In extends Nr{constructor(e){super(),this.elements=e}}function il(n,e){let t=sl(e);for(const r of n.elements)t=t.filter(i=>!ke(i,r));return{arrayValue:{values:t}}}class Ir extends Nr{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Lo(n){return oe(n.integerValue||n.doubleValue)}function sl(n){return zi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e,t){this.field=e,this.transform=t}}function vd(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof En&&i instanceof En||r instanceof In&&i instanceof In?Nt(r.elements,i.elements,ke):r instanceof Ir&&i instanceof Ir?ke(r.Pe,i.Pe):r instanceof vn&&i instanceof vn}(n.transform,e.transform)}class Ed{constructor(e,t){this.version=e,this.transformResults=t}}class Ue{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ue}static exists(e){return new Ue(void 0,e)}static updateTime(e){return new Ue(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function or(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Or{}function ol(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ll(n.key,Ue.none()):new Sn(n.key,n.data,Ue.none());{const t=n.data,r=we.empty();let i=new ge(ae.comparator);for(let o of e.fields)if(!i.has(o)){let l=t.field(o);l===null&&o.length>1&&(o=o.popLast(),l=t.field(o)),l===null?r.delete(o):r.set(o,l),i=i.add(o)}return new Et(n.key,r,new Ae(i.toArray()),Ue.none())}}function Id(n,e,t){n instanceof Sn?function(i,o,l){const u=i.value.clone(),h=Uo(i.fieldTransforms,o,l.transformResults);u.setAll(h),o.convertToFoundDocument(l.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Et?function(i,o,l){if(!or(i.precondition,o))return void o.convertToUnknownDocument(l.version);const u=Uo(i.fieldTransforms,o,l.transformResults),h=o.data;h.setAll(al(i)),h.setAll(u),o.convertToFoundDocument(l.version,h).setHasCommittedMutations()}(n,e,t):function(i,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()}(0,e,t)}function fn(n,e,t,r){return n instanceof Sn?function(o,l,u,h){if(!or(o.precondition,l))return u;const f=o.value.clone(),y=Fo(o.fieldTransforms,h,l);return f.setAll(y),l.convertToFoundDocument(l.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof Et?function(o,l,u,h){if(!or(o.precondition,l))return u;const f=Fo(o.fieldTransforms,h,l),y=l.data;return y.setAll(al(o)),y.setAll(f),l.convertToFoundDocument(l.version,y).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(A=>A.field))}(n,e,t,r):function(o,l,u){return or(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):u}(n,e,t)}function Td(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),o=nl(r.transform,i||null);o!=null&&(t===null&&(t=we.empty()),t.set(r.field,o))}return t||null}function xo(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Nt(r,i,(o,l)=>vd(o,l))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Sn extends Or{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Et extends Or{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function al(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Uo(n,e,t){const r=new Map;Y(n.length===t.length);for(let i=0;i<t.length;i++){const o=n[i],l=o.transform,u=e.data.field(o.field);r.set(o.field,_d(l,u,t[i]))}return r}function Fo(n,e,t){const r=new Map;for(const i of n){const o=i.transform,l=t.data.field(i.field);r.set(i.field,md(o,l,e))}return r}class ll extends Or{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class wd extends Or{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(e.key)&&Id(o,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=fn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=fn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=el();return this.mutations.forEach(i=>{const o=e.get(i.key),l=o.overlayedDocument;let u=this.applyToLocalView(l,o.mutatedFields);u=t.has(i.key)?null:u;const h=ol(l,u);h!==null&&r.set(i.key,h),l.isValidDocument()||l.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),pe())}isEqual(e){return this.batchId===e.batchId&&Nt(this.mutations,e.mutations,(t,r)=>xo(t,r))&&Nt(this.baseMutations,e.baseMutations,(t,r)=>xo(t,r))}}class Xi{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Y(e.mutations.length===r.length);let i=function(){return hd}();const o=e.mutations;for(let l=0;l<o.length;l++)i=i.insert(o[l].key,r[l].version);return new Xi(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z,F;function Pd(n){switch(n){default:return U();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function Sd(n){if(n===void 0)return _t("GRPC error has no .code"),S.UNKNOWN;switch(n){case Z.OK:return S.OK;case Z.CANCELLED:return S.CANCELLED;case Z.UNKNOWN:return S.UNKNOWN;case Z.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case Z.INTERNAL:return S.INTERNAL;case Z.UNAVAILABLE:return S.UNAVAILABLE;case Z.UNAUTHENTICATED:return S.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case Z.NOT_FOUND:return S.NOT_FOUND;case Z.ALREADY_EXISTS:return S.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return S.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case Z.ABORTED:return S.ABORTED;case Z.OUT_OF_RANGE:return S.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return S.UNIMPLEMENTED;case Z.DATA_LOSS:return S.DATA_LOSS;default:return U()}}(F=Z||(Z={}))[F.OK=0]="OK",F[F.CANCELLED=1]="CANCELLED",F[F.UNKNOWN=2]="UNKNOWN",F[F.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",F[F.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",F[F.NOT_FOUND=5]="NOT_FOUND",F[F.ALREADY_EXISTS=6]="ALREADY_EXISTS",F[F.PERMISSION_DENIED=7]="PERMISSION_DENIED",F[F.UNAUTHENTICATED=16]="UNAUTHENTICATED",F[F.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",F[F.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",F[F.ABORTED=10]="ABORTED",F[F.OUT_OF_RANGE=11]="OUT_OF_RANGE",F[F.UNIMPLEMENTED=12]="UNIMPLEMENTED",F[F.INTERNAL=13]="INTERNAL",F[F.UNAVAILABLE=14]="UNAVAILABLE",F[F.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Da([4294967295,4294967295],0);class bd{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ni(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Cd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function kd(n,e){return Ni(n,e.toTimestamp())}function St(n){return Y(!!n),W.fromTimestamp(function(t){const r=yt(t);return new re(r.seconds,r.nanos)}(n))}function cl(n,e){return Oi(n,e).canonicalString()}function Oi(n,e){const t=function(i){return new X(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Dd(n){const e=X.fromString(n);return Y(Fd(e)),e}function Vi(n,e){return cl(n.databaseId,e.path)}function Nd(n){const e=Dd(n);return e.length===4?X.emptyPath():Vd(e)}function Od(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Vd(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Bo(n,e,t){return{name:Vi(n,e),fields:t.value.mapValue.fields}}function Md(n,e){let t;if(e instanceof Sn)t={update:Bo(n,e.key,e.value)};else if(e instanceof ll)t={delete:Vi(n,e.key)};else if(e instanceof Et)t={update:Bo(n,e.key,e.data),updateMask:Ud(e.fieldMask)};else{if(!(e instanceof wd))return U();t={verify:Vi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,l){const u=l.transform;if(u instanceof vn)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof En)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof In)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ir)return{fieldPath:l.field.canonicalString(),increment:u.Pe};throw U()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:kd(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:U()}(n,e.precondition)),t}function Ld(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(i,o){let l=i.updateTime?St(i.updateTime):St(o);return l.isEqual(W.min())&&(l=St(o)),new Ed(l,i.transformResults||[])}(t,e))):[]}function xd(n){let e=Nd(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Y(r===1);const y=t.from[0];y.allDescendants?i=y.collectionId:e=e.child(y.collectionId)}let o=[];t.where&&(o=function(A){const R=ul(A);return R instanceof it&&Ga(R)?R.getFilters():[R]}(t.where));let l=[];t.orderBy&&(l=function(A){return A.map(R=>function(k){return new vr(Rt(k.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(R))}(t.orderBy));let u=null;t.limit&&(u=function(A){let R;return R=typeof A=="object"?A.value:A,Hi(R)?null:R}(t.limit));let h=null;t.startAt&&(h=function(A){const R=!!A.before,C=A.values||[];return new yr(C,R)}(t.startAt));let f=null;return t.endAt&&(f=function(A){const R=!A.before,C=A.values||[];return new yr(C,R)}(t.endAt)),id(e,i,l,o,u,"F",h,f)}function ul(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Rt(t.unaryFilter.field);return ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Rt(t.unaryFilter.field);return ne.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Rt(t.unaryFilter.field);return ne.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=Rt(t.unaryFilter.field);return ne.create(l,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return ne.create(Rt(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return it.create(t.compositeFilter.filters.map(r=>ul(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function Rt(n){return ae.fromServerFormat(n.fieldPath)}function Ud(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Fd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(e){this.ct=e}}function jd(n){const e=xd({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Di(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(){this.un=new Hd}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(rt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(rt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class Hd{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ge(X.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ge(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Lt(0)}static kn(){return new Lt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(){this.changes=new Bt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Te.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&fn(r.mutation,i,Ae.empty(),re.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,pe()).next(()=>r))}getLocalViewOfDocuments(e,t,r=pe()){const i=ht();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(o=>{let l=tr();return o.forEach((u,h)=>{l=l.insert(u,h.overlayedDocument)}),l}))}getOverlayedDocuments(e,t){const r=ht();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,pe()))}populateOverlays(e,t,r){const i=[];return r.forEach(o=>{t.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(e,i).next(o=>{o.forEach((l,u)=>{t.set(l,u)})})}computeViews(e,t,r,i){let o=Er();const l=dn(),u=function(){return dn()}();return t.forEach((h,f)=>{const y=r.get(f.key);i.has(f.key)&&(y===void 0||y.mutation instanceof Et)?o=o.insert(f.key,f):y!==void 0?(l.set(f.key,y.mutation.getFieldMask()),fn(y.mutation,f,y.mutation.getFieldMask(),re.now())):l.set(f.key,Ae.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((f,y)=>l.set(f,y)),t.forEach((f,y)=>{var A;return u.set(f,new zd(y,(A=l.get(f))!==null&&A!==void 0?A:null))}),u))}recalculateAndSaveOverlays(e,t){const r=dn();let i=new ve((l,u)=>l-u),o=pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(l=>{for(const u of l)u.keys().forEach(h=>{const f=t.get(h);if(f===null)return;let y=r.get(h)||Ae.empty();y=u.applyToLocalView(f,y),r.set(h,y);const A=(i.get(u.batchId)||pe()).add(h);i=i.insert(u.batchId,A)})}).next(()=>{const l=[],u=i.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,y=h.value,A=el();y.forEach(R=>{if(!o.has(R)){const C=ol(t.get(R),r.get(R));C!==null&&A.set(R,C),o=o.add(R)}}),l.push(this.documentOverlayCache.saveOverlays(e,f,A))}return P.waitFor(l)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(l){return L.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):od(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(o=>{const l=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):P.resolve(ht());let u=-1,h=o;return l.next(f=>P.forEach(f,(y,A)=>(u<A.largestBatchId&&(u=A.largestBatchId),o.get(y)?P.resolve():this.remoteDocumentCache.getEntry(e,y).next(R=>{h=h.insert(y,R)}))).next(()=>this.populateOverlays(e,f,o)).next(()=>this.computeViews(e,h,f,pe())).next(y=>({batchId:u,changes:Za(y)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let i=tr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const o=t.collectionGroup;let l=tr();return this.indexManager.getCollectionParents(e,o).next(u=>P.forEach(u,h=>{const f=function(A,R){return new Dr(R,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,i).next(y=>{y.forEach((A,R)=>{l=l.insert(A,R)})})}).next(()=>l))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i))).next(l=>{o.forEach((h,f)=>{const y=f.getKey();l.get(y)===null&&(l=l.insert(y,Te.newInvalidDocument(y)))});let u=tr();return l.forEach((h,f)=>{const y=o.get(h);y!==void 0&&fn(y.mutation,f,Ae.empty(),re.now()),Wi(t,f)&&(u=u.insert(h,f))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:St(i.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:jd(i.bundledQuery),readTime:St(i.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(){this.overlays=new ve(L.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=ht();return P.forEach(t,i=>this.getOverlay(e,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,o)=>{this.ht(e,t,o)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const i=ht(),o=t.length+1,l=new L(t.child("")),u=this.overlays.getIteratorFrom(l);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return P.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new ve((f,y)=>f-y);const l=this.overlays.getIterator();for(;l.hasNext();){const f=l.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let y=o.get(f.largestBatchId);y===null&&(y=ht(),o=o.insert(f.largestBatchId,y)),y.set(f.getKey(),f)}}const u=ht(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,y)=>u.set(f,y)),!(u.size()>=i)););return P.resolve(u)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const l=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,l)}this.overlays=this.overlays.insert(r.key,new Rd(t,r));let o=this.Ir.get(t);o===void 0&&(o=pe(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(){this.sessionToken=Ce.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(){this.Tr=new ge(te.Er),this.dr=new ge(te.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new te(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new te(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new L(new X([])),r=new te(t,e),i=new te(t,e+1),o=[];return this.dr.forEachInRange([r,i],l=>{this.Vr(l),o.push(l.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new X([])),r=new te(t,e),i=new te(t,e+1);let o=pe();return this.dr.forEachInRange([r,i],l=>{o=o.add(l.key)}),o}containsKey(e){const t=new te(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class te{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||z(e.wr,t.wr)}static Ar(e,t){return z(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ge(te.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new Ad(o,t,r,i);this.mutationQueue.push(l);for(const u of i)this.br=this.br.add(new te(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return P.resolve(l)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),o=i<0?0:i;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new te(t,0),i=new te(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,i],l=>{const u=this.Dr(l.wr);o.push(u)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ge(z);return t.forEach(i=>{const o=new te(i,0),l=new te(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,l],u=>{r=r.add(u.wr)})}),P.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const l=new te(new L(o),0);let u=new ge(z);return this.br.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(u=u.add(h.wr)),!0)},l),P.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Y(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return P.forEach(t.mutations,i=>{const o=new te(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new te(t,0),i=this.br.firstAfterOrEqual(r);return P.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e){this.Mr=e,this.docs=function(){return new ve(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),o=i?i.size:0,l=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Te.newInvalidDocument(t))}getEntries(e,t){let r=Er();return t.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Te.newInvalidDocument(i))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=Er();const l=t.path,u=new L(l.child("")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:y}}=h.getNext();if(!l.isPrefixOf(f.path))break;f.path.length>l.length+1||Uh(xh(y),r)<=0||(i.has(y.key)||Wi(t,y))&&(o=o.insert(y.key,y.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(e,t,r,i){U()}Or(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Yd(this)}getSize(e){return P.resolve(this.size)}}class Yd extends qd{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e){this.persistence=e,this.Nr=new Bt(t=>Gi(t),Ki),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Ji,this.targetCount=0,this.kr=Lt.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Lt(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let i=0;const o=[];return this.Nr.forEach((l,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Nr.delete(l),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),P.waitFor(o).next(()=>i)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,o=[];return i&&t.forEach(l=>{o.push(i.markPotentiallyOrphaned(e,l))}),P.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Ba(0),this.Kr=!1,this.Kr=!0,this.$r=new Qd,this.referenceDelegate=e(this),this.Ur=new Zd(this),this.indexManager=new $d,this.remoteDocumentCache=function(i){return new Jd(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Bd(t),this.Gr=new Kd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Wd,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Xd(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const i=new tf(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(o=>this.referenceDelegate.jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Hr(e,t){return P.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class tf extends Bh{constructor(e){super(),this.currentSequenceNumber=e}}class Yi{constructor(e){this.persistence=e,this.Jr=new Ji,this.Yr=null}static Zr(e){return new Yi(e)}get Xr(){if(this.Yr)return this.Yr;throw U()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,r=>{const i=L.fromPath(r);return this.ei(e,i).next(o=>{o||t.removeEntry(i,W.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=pe(),i=pe();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Zi(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return lu()?8:jh(me())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const o={result:null};return this.Yi(e,t).next(l=>{o.result=l}).next(()=>{if(!o.result)return this.Zi(e,t,i,r).next(l=>{o.result=l})}).next(()=>{if(o.result)return;const l=new nf;return this.Xi(e,t,l).next(u=>{if(o.result=u,this.zi)return this.es(e,t,l,u.size)})}).next(()=>o.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(on()<=x.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",an(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(on()<=x.DEBUG&&N("QueryEngine","Query:",an(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(on()<=x.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",an(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):P.resolve())}Yi(e,t){if(Mo(t))return P.resolve(null);let r=ft(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Di(t,null,"F"),r=ft(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const l=pe(...o);return this.Ji.getDocuments(e,l).next(u=>this.indexManager.getMinOffset(e,r).next(h=>{const f=this.ts(t,u);return this.ns(t,f,l,h.readTime)?this.Yi(e,Di(t,null,"F")):this.rs(e,f,t,h)}))})))}Zi(e,t,r,i){return Mo(t)||i.isEqual(W.min())?P.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const l=this.ts(t,o);return this.ns(t,l,r,i)?P.resolve(null):(on()<=x.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),an(t)),this.rs(e,l,t,Lh(i,-1)).next(u=>u))})}ts(e,t){let r=new ge(ld(e));return t.forEach((i,o)=>{Wi(e,o)&&(r=r.add(o))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(e,t,r){return on()<=x.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",an(t)),this.Ji.getDocumentsMatchingQuery(e,t,rt.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(o=>(t.forEach(l=>{o=o.insert(l.key,l)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ve(z),this._s=new Bt(o=>Gi(o),Ki),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Gd(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function of(n,e,t,r){return new sf(n,e,t,r)}async function hl(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const l=[],u=[];let h=pe();for(const f of i){l.push(f.batchId);for(const y of f.mutations)h=h.add(y.key)}for(const f of o){u.push(f.batchId);for(const y of f.mutations)h=h.add(y.key)}return t.localDocuments.getDocuments(r,h).next(f=>({hs:f,removedBatchIds:l,addedBatchIds:u}))})})}function af(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(u,h,f,y){const A=f.batch,R=A.keys();let C=P.resolve();return R.forEach(k=>{C=C.next(()=>y.getEntry(h,k)).next(O=>{const D=f.docVersions.get(k);Y(D!==null),O.version.compareTo(D)<0&&(A.applyToRemoteDocument(O,f),O.isValidDocument()&&(O.setReadTime(f.commitVersion),y.addEntry(O)))})}),C.next(()=>u.mutationQueue.removeMutationBatch(h,A))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=pe();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function lf(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function cf(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}class jo{constructor(){this.activeTargetIds=pd()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class uf{constructor(){this.so=new jo,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new jo,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nr=null;function _i(){return nr===null?nr=function(){return 268435456+Math.round(2147483648*Math.random())}():nr++,"0x"+nr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de="WebChannelConnection";class pf extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get Fo(){return!1}Mo(t,r,i,o,l){const u=_i(),h=this.xo(t,r.toUriEncodedString());N("RestConnection",`Sending RPC '${t}' ${u}:`,h,i);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,l),this.No(t,h,f,i).then(y=>(N("RestConnection",`Received RPC '${t}' ${u}: `,y),y),y=>{throw pr("RestConnection",`RPC '${t}' ${u} failed with error: `,y,"url: ",h,"request:",i),y})}Lo(t,r,i,o,l,u){return this.Mo(t,r,i,o,l)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ft}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,l)=>t[l]=o),i&&i.headers.forEach((o,l)=>t[l]=o)}xo(t,r){const i=df[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const o=_i();return new Promise((l,u)=>{const h=new Na;h.setWithCredentials(!0),h.listenOnce(Oa.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case ir.NO_ERROR:const y=h.getResponseJson();N(de,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(y)),l(y);break;case ir.TIMEOUT:N(de,`RPC '${e}' ${o} timed out`),u(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case ir.HTTP_ERROR:const A=h.getStatus();if(N(de,`RPC '${e}' ${o} failed with status:`,A,"response text:",h.getResponseText()),A>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R==null?void 0:R.error;if(C&&C.status&&C.message){const k=function(D){const H=D.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(H)>=0?H:S.UNKNOWN}(C.status);u(new V(k,C.message))}else u(new V(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new V(S.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{N(de,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);N(de,`RPC '${e}' ${o} sending request:`,i),h.send(t,"POST",f,r,15)})}Bo(e,t,r){const i=_i(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],l=La(),u=Ma(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const y=o.join("");N(de,`Creating RPC '${e}' stream ${i}: ${y}`,h);const A=l.createWebChannel(y,h);let R=!1,C=!1;const k=new ff({Io:D=>{C?N(de,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(R||(N(de,`Opening RPC '${e}' stream ${i} transport.`),A.open(),R=!0),N(de,`RPC '${e}' stream ${i} sending:`,D),A.send(D))},To:()=>A.close()}),O=(D,H,j)=>{D.listen(H,$=>{try{j($)}catch(J){setTimeout(()=>{throw J},0)}})};return O(A,cn.EventType.OPEN,()=>{C||(N(de,`RPC '${e}' stream ${i} transport opened.`),k.yo())}),O(A,cn.EventType.CLOSE,()=>{C||(C=!0,N(de,`RPC '${e}' stream ${i} transport closed`),k.So())}),O(A,cn.EventType.ERROR,D=>{C||(C=!0,pr(de,`RPC '${e}' stream ${i} transport errored:`,D),k.So(new V(S.UNAVAILABLE,"The operation could not be completed")))}),O(A,cn.EventType.MESSAGE,D=>{var H;if(!C){const j=D.data[0];Y(!!j);const $=j,J=$.error||((H=$[0])===null||H===void 0?void 0:H.error);if(J){N(de,`RPC '${e}' stream ${i} received error:`,J);const Pe=J.status;let ee=function(m){const _=Z[m];if(_!==void 0)return Sd(_)}(Pe),E=J.message;ee===void 0&&(ee=S.INTERNAL,E="Unknown error status: "+Pe+" with message "+J.message),C=!0,k.So(new V(ee,E)),A.close()}else N(de,`RPC '${e}' stream ${i} received:`,j),k.bo(j)}}),O(u,Va.STAT_EVENT,D=>{D.stat===Si.PROXY?N(de,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===Si.NOPROXY&&N(de,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function yi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){return new bd(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(e,t,r=1e3,i=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,t,r,i,o,l,u,h){this.ui=e,this.Ho=r,this.Jo=i,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new dl(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(_t(t.toString()),_t("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new V(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return N("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class mf extends gf{constructor(e,t,r,i,o,l){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,l),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Y(!!e.streamToken),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Ld(e.writeResults,e.commitTime),r=St(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Od(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Md(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Mo(e,Oi(t,r),i,o,l)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(S.UNKNOWN,o.toString())})}Lo(e,t,r,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([l,u])=>this.connection.Lo(e,Oi(t,r),i,l,u,o)).catch(l=>{throw l.name==="FirebaseError"?(l.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new V(S.UNKNOWN,l.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class yf{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(_t(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(l=>{r.enqueueAndForget(async()=>{Cn(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=G(h);f.L_.add(4),await bn(f),f.q_.set("Unknown"),f.L_.delete(4),await Mr(f)}(this))})}),this.q_=new yf(r,i)}}async function Mr(n){if(Cn(n))for(const e of n.B_)await e(!0)}async function bn(n){for(const e of n.B_)await e(!1)}function Cn(n){return G(n).L_.size===0}async function fl(n,e,t){if(!kr(e))throw e;n.L_.add(1),await bn(n),n.q_.set("Offline"),t||(t=()=>lf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Mr(n)})}function pl(n,e){return e().catch(t=>fl(n,t,e))}async function Lr(n){const e=G(n),t=st(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Ef(e);)try{const i=await cf(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,If(e,i)}catch(i){await fl(e,i)}gl(e)&&ml(e)}function Ef(n){return Cn(n)&&n.O_.length<10}function If(n,e){n.O_.push(e);const t=st(n);t.r_()&&t.V_&&t.m_(e.mutations)}function gl(n){return Cn(n)&&!st(n).n_()&&n.O_.length>0}function ml(n){st(n).start()}async function Tf(n){st(n).p_()}async function wf(n){const e=st(n);for(const t of n.O_)e.m_(t.mutations)}async function Af(n,e,t){const r=n.O_.shift(),i=Xi.from(r,e,t);await pl(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Lr(n)}async function Rf(n,e){e&&st(n).V_&&await async function(r,i){if(function(l){return Pd(l)&&l!==S.ABORTED}(i.code)){const o=r.O_.shift();st(r).s_(),await pl(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Lr(r)}}(n,e),gl(n)&&ml(n)}async function Ho(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");const r=Cn(t);t.L_.add(3),await bn(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Mr(t)}async function Pf(n,e){const t=G(n);e?(t.L_.delete(2),await Mr(t)):e||(t.L_.add(2),await bn(t),t.q_.set("Unknown"))}function st(n){return n.U_||(n.U_=function(t,r,i){const o=G(t);return o.w_(),new mf(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Tf.bind(null,n),mo:Rf.bind(null,n),f_:wf.bind(null,n),g_:Af.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Lr(n)):(await n.U_.stop(),n.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new dt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){const l=Date.now()+r,u=new es(e,t,l,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function _l(n,e){if(_t("AsyncQueue",`${e}: ${n}`),kr(n))return new V(S.UNAVAILABLE,`${e}: ${n}`);throw n}class Sf{constructor(){this.queries=qo(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=G(t),o=i.queries;i.queries=qo(),o.forEach((l,u)=>{for(const h of u.j_)h.onError(r)})})(this,new V(S.ABORTED,"Firestore shutting down"))}}function qo(){return new Bt(n=>Ja(n),Xa)}function bf(n){n.Y_.forEach(e=>{e.next()})}var zo,Go;(Go=zo||(zo={})).ea="default",Go.Cache="cache";class Cf{constructor(e,t,r,i,o,l){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Ca={},this.Fa=new Bt(u=>Ja(u),Xa),this.Ma=new Map,this.xa=new Set,this.Oa=new ve(L.comparator),this.Na=new Map,this.La=new Ji,this.Ba={},this.ka=new Map,this.qa=Lt.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function kf(n,e,t){const r=Vf(n);try{const i=await function(l,u){const h=G(l),f=re.now(),y=u.reduce((C,k)=>C.add(k.key),pe());let A,R;return h.persistence.runTransaction("Locally write mutations","readwrite",C=>{let k=Er(),O=pe();return h.cs.getEntries(C,y).next(D=>{k=D,k.forEach((H,j)=>{j.isValidDocument()||(O=O.add(H))})}).next(()=>h.localDocuments.getOverlayedDocuments(C,k)).next(D=>{A=D;const H=[];for(const j of u){const $=Td(j,A.get(j.key).overlayedDocument);$!=null&&H.push(new Et(j.key,$,Ha($.value.mapValue),Ue.exists(!0)))}return h.mutationQueue.addMutationBatch(C,f,H,u)}).next(D=>{R=D;const H=D.applyToLocalDocumentSet(A,O);return h.documentOverlayCache.saveOverlays(C,D.batchId,H)})}).then(()=>({batchId:R.batchId,changes:Za(A)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(l,u,h){let f=l.Ba[l.currentUser.toKey()];f||(f=new ve(z)),f=f.insert(u,h),l.Ba[l.currentUser.toKey()]=f}(r,i.batchId,t),await xr(r,i.changes),await Lr(r.remoteStore)}catch(i){const o=_l(i,"Failed to persist write");t.reject(o)}}function Ko(n,e,t){const r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((o,l)=>{const u=l.view.Z_(e);u.snapshot&&i.push(u.snapshot)}),function(l,u){const h=G(l);h.onlineState=u;let f=!1;h.queries.forEach((y,A)=>{for(const R of A.j_)R.Z_(u)&&(f=!0)}),f&&bf(h)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Df(n,e){const t=G(n),r=e.batch.batchId;try{const i=await af(t.localStore,e);vl(t,r,null),yl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await xr(t,i)}catch(i){await Fa(i)}}async function Nf(n,e,t){const r=G(n);try{const i=await function(l,u){const h=G(l);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let y;return h.mutationQueue.lookupMutationBatch(f,u).next(A=>(Y(A!==null),y=A.keys(),h.mutationQueue.removeMutationBatch(f,A))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,y,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,y)).next(()=>h.localDocuments.getDocuments(f,y))})}(r.localStore,e);vl(r,e,t),yl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await xr(r,i)}catch(i){await Fa(i)}}function yl(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function vl(n,e,t){const r=G(n);let i=r.Ba[r.currentUser.toKey()];if(i){const o=i.get(e);o&&(t?o.reject(t):o.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}async function xr(n,e,t){const r=G(n),i=[],o=[],l=[];r.Fa.isEmpty()||(r.Fa.forEach((u,h)=>{l.push(r.Ka(h,e,t).then(f=>{var y;if((f||t)&&r.isPrimaryClient){const A=f?!f.fromCache:(y=void 0)===null||y===void 0?void 0:y.current;r.sharedClientState.updateQueryState(h.targetId,A?"current":"not-current")}if(f){i.push(f);const A=Zi.Wi(h.targetId,f);o.push(A)}}))}),await Promise.all(l),r.Ca.d_(i),await async function(h,f){const y=G(h);try{await y.persistence.runTransaction("notifyLocalViewChanges","readwrite",A=>P.forEach(f,R=>P.forEach(R.$i,C=>y.persistence.referenceDelegate.addReference(A,R.targetId,C)).next(()=>P.forEach(R.Ui,C=>y.persistence.referenceDelegate.removeReference(A,R.targetId,C)))))}catch(A){if(!kr(A))throw A;N("LocalStore","Failed to update sequence numbers: "+A)}for(const A of f){const R=A.targetId;if(!A.fromCache){const C=y.os.get(R),k=C.snapshotVersion,O=C.withLastLimboFreeSnapshotVersion(k);y.os=y.os.insert(R,O)}}}(r.localStore,o))}async function Of(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){N("SyncEngine","User change. New user:",e.toKey());const r=await hl(t.localStore,e);t.currentUser=e,function(o,l){o.ka.forEach(u=>{u.forEach(h=>{h.reject(new V(S.CANCELLED,l))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await xr(t,r.hs)}}function Vf(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Df.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Nf.bind(null,e),e}class Tr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Vr(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return of(this.persistence,new rf,e.initialUser,this.serializer)}Ga(e){return new ef(Yi.Zr,this.serializer)}Wa(e){return new uf}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Tr.provider={build:()=>new Tr};class Mi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ko(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Of.bind(null,this.syncEngine),await Pf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Sf}()}createDatastore(e){const t=Vr(e.databaseInfo.databaseId),r=function(o){return new pf(o)}(e.databaseInfo);return function(o,l,u,h){return new _f(o,l,u,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,o,l,u){return new vf(r,i,o,l,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Ko(this.syncEngine,t,0),function(){return $o.D()?new $o:new hf}())}createSyncEngine(e,t){return function(i,o,l,u,h,f,y){const A=new Cf(i,o,l,u,h,f);return y&&(A.Qa=!0),A}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const o=G(i);N("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await bn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Mi.provider={build:()=>new Mi};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=fe.UNAUTHENTICATED,this.clientId=Ua.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async l=>{N("FirestoreClient","Received user=",l.uid),await this.authCredentialListener(l),this.user=l}),this.appCheckCredentials.start(r,l=>(N("FirestoreClient","Received new app check token=",l),this.appCheckCredentialListener(l,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new dt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=_l(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function vi(n,e){n.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await hl(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Wo(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Lf(n);N("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Ho(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Ho(e.remoteStore,i)),n._onlineComponents=e}async function Lf(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await vi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;pr("Error using user provided cache. Falling back to memory cache: "+t),await vi(n,new Tr)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await vi(n,new Tr);return n._offlineComponents}async function xf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await Wo(n,n._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await Wo(n,new Mi))),n._onlineComponents}function Uf(n){return xf(n).then(e=>e.syncEngine)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(n,e,t){if(!t)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ff(n,e,t,r){if(e===!0&&r===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Xo(n){if(!L.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Jo(n){if(L.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ts(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Tl(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ts(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ff("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=El((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ur{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Yo({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Yo(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Sh;switch(r.type){case"firstParty":return new Dh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Qo.get(t);r&&(N("ComponentProvider","Removing Datastore"),Qo.delete(t),r.terminate())}(this),Promise.resolve()}}function Bf(n,e,t,r={}){var i;const o=(n=Tl(n,Ur))._getSettings(),l=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==l&&pr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:l,ssl:!1})),r.mockUserToken){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=fe.MOCK_USER;else{u=tu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new fe(f)}n._authCredentials=new bh(new xa(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ns(this.firestore,e,this._query)}}class Fe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Fe(this.firestore,e,this._key)}}class nt extends ns{constructor(e,t,r){super(e,t,sd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Fe(this.firestore,null,new L(e))}withConverter(e){return new nt(this.firestore,e,this._path)}}function jf(n,e,...t){if(n=Re(n),Il("collection","path",e),n instanceof Ur){const r=X.fromString(e,...t);return Jo(r),new nt(n,null,r)}{if(!(n instanceof Fe||n instanceof nt))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Jo(r),new nt(n.firestore,null,r)}}function $f(n,e,...t){if(n=Re(n),arguments.length===1&&(e=Ua.newId()),Il("doc","path",e),n instanceof Ur){const r=X.fromString(e,...t);return Xo(r),new Fe(n,null,new L(r))}{if(!(n instanceof Fe||n instanceof nt))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Xo(r),new Fe(n.firestore,n instanceof nt?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new dl(this,"async_queue_retry"),this.Vu=()=>{const r=yi();r&&N("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=yi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=yi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new dt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!kr(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(l){let u=l.message||"";return l.stack&&(u=l.stack.includes(l.message)?l.stack:l.message+`
`+l.stack),u}(r);throw _t("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=es.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(i),i}fu(){this.Eu&&U()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class wl extends Ur{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Zo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Zo(e),this._firestoreClient=void 0,await e}}}function Hf(n,e){const t=typeof n=="object"?n:ba(),r=typeof n=="string"?n:"(default)",i=ji(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=Zc("firestore");o&&Bf(i,...o)}return i}function qf(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||zf(n),n._firestoreClient}function zf(n){var e,t,r;const i=n._freezeSettings(),o=function(u,h,f,y){return new zh(u,h,f,y.host,y.ssl,y.experimentalForceLongPolling,y.experimentalAutoDetectLongPolling,El(y.experimentalLongPollingOptions),y.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Mf(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Tn(Ce.fromBase64String(e))}catch(t){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Tn(Ce.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=/^__.*__$/;class Kf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Et(e,this.data,this.fieldMask,t,this.fieldTransforms):new Sn(e,this.data,t,this.fieldTransforms)}}function Sl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}class is{constructor(e,t,r,i,o,l){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new is(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return wr(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Sl(this.Cu)&&Gf.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Wf{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Vr(e)}Qu(e,t,r,i=!1){return new is({Cu:e,methodName:t,qu:r,path:ae.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qf(n){const e=n._freezeSettings(),t=Vr(n._databaseId);return new Wf(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Xf(n,e,t,r,i,o={}){const l=n.Qu(o.merge||o.mergeFields?2:0,e,t,i);Dl("Data must be an object, but it was:",l,r);const u=Cl(r,l);let h,f;if(o.merge)h=new Ae(l.fieldMask),f=l.fieldTransforms;else if(o.mergeFields){const y=[];for(const A of o.mergeFields){const R=Jf(e,A,t);if(!l.contains(R))throw new V(S.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);ep(y,R)||y.push(R)}h=new Ae(y),f=l.fieldTransforms.filter(A=>h.covers(A.field))}else h=null,f=l.fieldTransforms;return new Kf(new we(u),h,f)}class ss extends rs{_toFieldTransform(e){return new yd(e.path,new vn)}isEqual(e){return e instanceof ss}}function bl(n,e){if(kl(n=Re(n)))return Dl("Unsupported field value:",e,n),Cl(n,e);if(n instanceof rs)return function(r,i){if(!Sl(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const o=[];let l=0;for(const u of r){let h=bl(u,i.Lu(l));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),l++}return{arrayValue:{values:o}}}(n,e)}return function(r,i){if((r=Re(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return gd(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=re.fromDate(r);return{timestampValue:Ni(i.serializer,o)}}if(r instanceof re){const o=new re(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ni(i.serializer,o)}}if(r instanceof Rl)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Tn)return{bytesValue:Cd(i.serializer,r._byteString)};if(r instanceof Fe){const o=i.databaseId,l=r.firestore._databaseId;if(!l.isEqual(o))throw i.Bu(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:cl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Pl)return function(l,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:l.toArray().map(h=>{if(typeof h!="number")throw u.Bu("VectorValues must only contain numeric values.");return Qi(u.serializer,h)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${ts(r)}`)}(n,e)}function Cl(n,e){const t={};return ja(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pn(n,(r,i)=>{const o=bl(i,e.Mu(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function kl(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof re||n instanceof Rl||n instanceof Tn||n instanceof Fe||n instanceof rs||n instanceof Pl)}function Dl(n,e,t){if(!kl(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=ts(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Jf(n,e,t){if((e=Re(e))instanceof Al)return e._internalPath;if(typeof e=="string")return Zf(n,e);throw wr("Field path arguments must be of type string or ",n,!1,void 0,t)}const Yf=new RegExp("[~\\*/\\[\\]]");function Zf(n,e,t){if(e.search(Yf)>=0)throw wr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Al(...e.split("."))._internalPath}catch{throw wr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function wr(n,e,t,r,i){const o=r&&!r.isEmpty(),l=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||l)&&(h+=" (found",o&&(h+=` in field ${r}`),l&&(h+=` in document ${i}`),h+=")"),new V(S.INVALID_ARGUMENT,u+n+h)}function ep(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(n,e,t){let r;return r=n?n.toFirestore(e):e,r}function np(n,e){const t=Tl(n.firestore,wl),r=$f(n),i=tp(n.converter,e);return rp(t,[Xf(Qf(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Ue.exists(!1))]).then(()=>r)}function rp(n,e){return function(r,i){const o=new dt;return r.asyncQueue.enqueueAndForget(async()=>kf(await Uf(r),i,o)),o.promise}(qf(n),e)}function ip(){return new ss("serverTimestamp")}(function(e,t=!0){(function(i){Ft=i})(Ut),Dt(new gt("firestore",(r,{instanceIdentifier:i,options:o})=>{const l=r.getProvider("app").getImmediate(),u=new wl(new Ch(r.getProvider("auth-internal")),new Oh(r.getProvider("app-check-internal")),function(f,y){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _r(f.options.projectId,y)}(l,i),l);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),tt(So,"4.7.3",e),tt(So,"4.7.3","esm2017")})();const sp={apiKey:"REDACTED",authDomain:"gm-intel.firebaseapp.com",projectId:"gm-intel",storageBucket:"gm-intel.firebasestorage.app",messagingSenderId:"649396916340",appId:"1:649396916340:web:ac7acb69c71bccf0844121"},op=Sa(sp),ap=Hf(op);async function lp(n){try{return(await np(jf(ap,"emails"),{...n,sentAt:ip()})).id}catch(e){throw console.error("Error adding document: ",e),e}}async function cp(n,{to:e,subject:t,body:r,trackingPixelHtml:i}){const o="gmail_intel_boundary",l=[`To: ${e}`,`Subject: ${t}`,"Content-Type: multipart/alternative; boundary="+o,"","--"+o,"Content-Type: text/plain; charset=UTF-8","","Please view this email in a client that supports HTML.","","--"+o,"Content-Type: text/html; charset=UTF-8","",r+i,"","--"+o+"--"].join(`\r
`),u=btoa(unescape(encodeURIComponent(l))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");return new Promise((h,f)=>{chrome.runtime.sendMessage({type:"SEND_EMAIL",token:n,payload:u},y=>{if(chrome.runtime.lastError)return f(new Error(chrome.runtime.lastError.message));if(y.error)return f(new Error(y.error));h(y.data)})})}function os(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Nl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const up=Nl,Ol=new An("auth","Firebase",Nl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=new Fi("@firebase/auth");function hp(n,...e){Ar.logLevel<=x.WARN&&Ar.warn(`Auth (${Ut}): ${n}`,...e)}function ar(n,...e){Ar.logLevel<=x.ERROR&&Ar.error(`Auth (${Ut}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(n,...e){throw as(n,...e)}function Se(n,...e){return as(n,...e)}function Vl(n,e,t){const r=Object.assign(Object.assign({},up()),{[e]:t});return new An("auth","Firebase",r).create(e,{appName:n.name})}function pt(n){return Vl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function as(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ol.create(n,...e)}function M(n,e,...t){if(!n)throw as(e,...t)}function Me(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ar(e),new Error(e)}function $e(n,e){n||Me(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function dp(){return ea()==="http:"||ea()==="https:"}function ea(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dp()||su()||"connection"in navigator)?navigator.onLine:!0}function pp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t){this.shortDelay=e,this.longDelay=t,$e(t>e,"Short delay should be less than long delay!"),this.isMobile=nu()||ou()}get(){return fp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ls(n,e){$e(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Me("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Me("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Me("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=new kn(3e4,6e4);function cs(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function jt(n,e,t,r,i={}){return Ll(n,i,async()=>{let o={},l={};r&&(e==="GET"?l=r:o={body:JSON.stringify(r)});const u=Rn(Object.assign({key:n.config.apiKey},l)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return iu()||(f.referrerPolicy="no-referrer"),Ml.fetch()(xl(n,n.config.apiHost,t,u),f)})}async function Ll(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},gp),e);try{const i=new yp(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const l=await o.json();if("needConfirmation"in l)throw rr(n,"account-exists-with-different-credential",l);if(o.ok&&!("errorMessage"in l))return l;{const u=o.ok?l.errorMessage:l.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw rr(n,"credential-already-in-use",l);if(h==="EMAIL_EXISTS")throw rr(n,"email-already-in-use",l);if(h==="USER_DISABLED")throw rr(n,"user-disabled",l);const y=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Vl(n,y,f);je(n,y)}}catch(i){if(i instanceof He)throw i;je(n,"network-request-failed",{message:String(i)})}}async function _p(n,e,t,r,i={}){const o=await jt(n,e,t,r,i);return"mfaPendingCredential"in o&&je(n,"multi-factor-auth-required",{_serverResponse:o}),o}function xl(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?ls(n.config,i):`${n.config.apiScheme}://${i}`}class yp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Se(this.auth,"network-request-failed")),mp.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function rr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Se(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vp(n,e){return jt(n,"POST","/v1/accounts:delete",e)}async function Ul(n,e){return jt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ep(n,e=!1){const t=Re(n),r=await t.getIdToken(e),i=us(r);M(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,l=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:pn(Ei(i.auth_time)),issuedAtTime:pn(Ei(i.iat)),expirationTime:pn(Ei(i.exp)),signInProvider:l||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Ei(n){return Number(n)*1e3}function us(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ar("JWT malformed, contained fewer than 3 sections"),null;try{const i=Ia(t);return i?JSON.parse(i):(ar("Failed to decode base64 JWT payload"),null)}catch(i){return ar("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ta(n){const e=us(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof He&&Ip(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ip({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=pn(this.lastLoginAt),this.creationTime=pn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rr(n){var e;const t=n.auth,r=await n.getIdToken(),i=await wn(n,Ul(t,{idToken:r}));M(i==null?void 0:i.users.length,t,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const l=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Fl(o.providerUserInfo):[],u=Ap(n.providerData,l),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),y=h?f:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new xi(o.createdAt,o.lastLoginAt),isAnonymous:y};Object.assign(n,A)}async function wp(n){const e=Re(n);await Rr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ap(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Fl(n){return n.map(e=>{var{providerId:t}=e,r=os(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rp(n,e){const t=await Ll(n,{},async()=>{const r=Rn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,l=xl(n,i,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Ml.fetch()(l,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Pp(n,e){return jt(n,"POST","/v2/accounts:revokeToken",cs(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ta(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=ta(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:o}=await Rp(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:o}=t,l=new bt;return r&&(M(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),l.accessToken=i),o&&(M(typeof o=="number","internal-error",{appName:e}),l.expirationTime=o),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new bt,this.toJSON())}_performRefresh(){return Me("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Le{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,o=os(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Tp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new xi(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await wn(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ep(this,e)}reload(){return wp(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Le(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Rr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ye(this.auth.app))return Promise.reject(pt(this.auth));const e=await this.getIdToken();return await wn(this,vp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,o,l,u,h,f,y;const A=(r=t.displayName)!==null&&r!==void 0?r:void 0,R=(i=t.email)!==null&&i!==void 0?i:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(l=t.photoURL)!==null&&l!==void 0?l:void 0,O=(u=t.tenantId)!==null&&u!==void 0?u:void 0,D=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,H=(f=t.createdAt)!==null&&f!==void 0?f:void 0,j=(y=t.lastLoginAt)!==null&&y!==void 0?y:void 0,{uid:$,emailVerified:J,isAnonymous:Pe,providerData:ee,stsTokenManager:E}=t;M($&&E,e,"internal-error");const p=bt.fromJSON(this.name,E);M(typeof $=="string",e,"internal-error"),We(A,e.name),We(R,e.name),M(typeof J=="boolean",e,"internal-error"),M(typeof Pe=="boolean",e,"internal-error"),We(C,e.name),We(k,e.name),We(O,e.name),We(D,e.name),We(H,e.name),We(j,e.name);const m=new Le({uid:$,auth:e,email:R,emailVerified:J,displayName:A,isAnonymous:Pe,photoURL:k,phoneNumber:C,tenantId:O,stsTokenManager:p,createdAt:H,lastLoginAt:j});return ee&&Array.isArray(ee)&&(m.providerData=ee.map(_=>Object.assign({},_))),D&&(m._redirectEventId=D),m}static async _fromIdTokenResponse(e,t,r=!1){const i=new bt;i.updateFromServerResponse(t);const o=new Le({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Rr(o),o}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];M(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Fl(i.providerUserInfo):[],l=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),u=new bt;u.updateFromIdToken(r);const h=new Le({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:l}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new xi(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na=new Map;function xe(n){$e(n instanceof Function,"Expected a class definition");let e=na.get(n);return e?($e(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,na.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Bl.type="NONE";const ra=Bl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(n,e,t){return`firebase:${n}:${e}:${t}`}class Ct{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=lr(this.userKey,i.apiKey,o),this.fullPersistenceKey=lr("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Le._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Ct(xe(ra),e,r);const i=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=i[0]||xe(ra);const l=lr(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const y=await f._get(l);if(y){const A=Le._fromJSON(e,y);f!==o&&(u=A),o=f;break}}catch{}const h=i.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Ct(o,e,r):(o=h[0],u&&await o._set(l,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(l)}catch{}})),new Ct(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ia(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ql(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Gl(e))return"Blackberry";if(Kl(e))return"Webos";if($l(e))return"Safari";if((e.includes("chrome/")||Hl(e))&&!e.includes("edge/"))return"Chrome";if(zl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function jl(n=me()){return/firefox\//i.test(n)}function $l(n=me()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hl(n=me()){return/crios\//i.test(n)}function ql(n=me()){return/iemobile/i.test(n)}function zl(n=me()){return/android/i.test(n)}function Gl(n=me()){return/blackberry/i.test(n)}function Kl(n=me()){return/webos/i.test(n)}function hs(n=me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Sp(n=me()){var e;return hs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function bp(){return au()&&document.documentMode===10}function Wl(n=me()){return hs(n)||zl(n)||Kl(n)||Gl(n)||/windows phone/i.test(n)||ql(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(n,e=[]){let t;switch(n){case"Browser":t=ia(me());break;case"Worker":t=`${ia(me())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ut}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((l,u)=>{try{const h=e(o);l(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kp(n,e={}){return jt(n,"GET","/v2/passwordPolicy",cs(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp=6;class Np{constructor(e){var t,r,i,o;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=l.minPasswordLength)!==null&&t!==void 0?t:Dp,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,o,l,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(i=h.containsLowercaseLetter)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(l=h.containsNumericCharacter)!==null&&l!==void 0?l:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new sa(this),this.idTokenSubscription=new sa(this),this.beforeStateQueue=new Cp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ol,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=xe(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ct.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ul(this,{idToken:e}),r=await Le._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ye(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,h=await this.tryRedirectSignIn(e);(!l||l===u)&&(h!=null&&h.user)&&(i=h.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(l){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Rr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=pp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ye(this.app))return Promise.reject(pt(this));const t=e?Re(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ye(this.app)?Promise.reject(pt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ye(this.app)?Promise.reject(pt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(xe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kp(this),t=new Np(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new An("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Pp(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&xe(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await Ct.create(this,[xe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let l=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(u,this,"internal-error"),u.then(()=>{l||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,i);return()=>{l=!0,h()}}else{const h=e.addObserver(t);return()=>{l=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ql(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&hp(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Fr(n){return Re(n)}class sa{constructor(e){this.auth=e,this.observer=null,this.addObserver=gu(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ds={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Vp(n){ds=n}function Mp(n){return ds.loadJS(n)}function Lp(){return ds.gapiScript}function xp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(n,e){const t=ji(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),o=t.getOptions();if(dr(o,e??{}))return i;je(i,"already-initialized")}return t.initialize({options:e})}function Fp(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(xe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Bp(n,e,t){const r=Fr(n);M(r._canInitEmulator,r,"emulator-config-failed"),M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=Xl(e),{host:l,port:u}=jp(e),h=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${l}${h}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:l,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),$p()}function Xl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function jp(n){const e=Xl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:oa(r.substr(o.length+1))}}else{const[o,l]=r.split(":");return{host:o,port:oa(l)}}}function oa(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function $p(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Me("not implemented")}_getIdTokenResponse(e){return Me("not implemented")}_linkToIdToken(e,t){return Me("not implemented")}_getReauthenticationResolver(e){return Me("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kt(n,e){return _p(n,"POST","/v1/accounts:signInWithIdp",cs(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp="http://localhost";class vt extends Jl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new vt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,o=os(t,["providerId","signInMethod"]);if(!r||!i)return null;const l=new vt(r,i);return l.idToken=o.idToken||void 0,l.accessToken=o.accessToken||void 0,l.secret=o.secret,l.nonce=o.nonce,l.pendingToken=o.pendingToken||null,l}_getIdTokenResponse(e){const t=this.buildRequest();return kt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,kt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,kt(e,t)}buildRequest(){const e={requestUri:Hp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Rn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends Yl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe extends Dn{constructor(){super("facebook.com")}static credential(e){return vt._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qe.credential(e.oauthAccessToken)}catch{return null}}}Qe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends Dn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return vt._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ve.credential(t,r)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends Dn{constructor(){super("github.com")}static credential(e){return vt._fromParams({providerId:Xe.PROVIDER_ID,signInMethod:Xe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xe.credentialFromTaggedObject(e)}static credentialFromError(e){return Xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xe.credential(e.oauthAccessToken)}catch{return null}}}Xe.GITHUB_SIGN_IN_METHOD="github.com";Xe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends Dn{constructor(){super("twitter.com")}static credential(e,t){return vt._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Je.credential(t,r)}catch{return null}}}Je.TWITTER_SIGN_IN_METHOD="twitter.com";Je.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const o=await Le._fromIdTokenResponse(e,r,i),l=aa(r);return new xt({user:o,providerId:l,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=aa(r);return new xt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function aa(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr extends He{constructor(e,t,r,i){var o;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Pr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Pr(e,t,r,i)}}function Zl(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Pr._fromErrorAndOperation(n,o,e,r):o})}async function qp(n,e,t=!1){const r=await wn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zp(n,e,t=!1){const{auth:r}=n;if(Ye(r.app))return Promise.reject(pt(r));const i="reauthenticate";try{const o=await wn(n,Zl(r,i,e,n),t);M(o.idToken,r,"internal-error");const l=us(o.idToken);M(l,r,"internal-error");const{sub:u}=l;return M(n.uid===u,r,"user-mismatch"),xt._forOperation(n,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&je(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ec(n,e,t=!1){if(Ye(n.app))return Promise.reject(pt(n));const r="signIn",i=await Zl(n,r,e),o=await xt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}async function Gp(n,e){return ec(Fr(n),e)}function Kp(n,e,t,r){return Re(n).onIdTokenChanged(e,t,r)}function Wp(n,e,t){return Re(n).beforeAuthStateChanged(e,t)}const Sr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Sr,"1"),this.storage.removeItem(Sr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp=1e3,Xp=10;class nc extends tc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Wl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((l,u,h)=>{this.notifyListeners(l,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const l=this.storage.getItem(r);!t&&this.localCache[r]===l||this.notifyListeners(r,l)},o=this.storage.getItem(r);bp()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Xp):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Qp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}nc.type="LOCAL";const Jp=nc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc extends tc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rc.type="SESSION";const ic=rc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Br(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:o}=t.data,l=this.handlersMap[i];if(!(l!=null&&l.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(l).map(async f=>f(t.origin,o)),h=await Yp(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Br.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,l;return new Promise((u,h)=>{const f=fs("",20);i.port1.start();const y=setTimeout(()=>{h(new Error("unsupported_event"))},r);l={messageChannel:i,onMessage(A){const R=A;if(R.data.eventId===f)switch(R.data.status){case"ack":clearTimeout(y),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(R.data.response);break;default:clearTimeout(y),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(l),i.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[i.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return window}function eg(n){be().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(){return typeof be().WorkerGlobalScope<"u"&&typeof be().importScripts=="function"}async function tg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ng(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function rg(){return sc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc="firebaseLocalStorageDb",ig=1,br="firebaseLocalStorage",ac="fbase_key";class Nn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function jr(n,e){return n.transaction([br],e?"readwrite":"readonly").objectStore(br)}function sg(){const n=indexedDB.deleteDatabase(oc);return new Nn(n).toPromise()}function Ui(){const n=indexedDB.open(oc,ig);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(br,{keyPath:ac})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(br)?e(r):(r.close(),await sg(),e(await Ui()))})})}async function la(n,e,t){const r=jr(n,!0).put({[ac]:e,value:t});return new Nn(r).toPromise()}async function og(n,e){const t=jr(n,!1).get(e),r=await new Nn(t).toPromise();return r===void 0?null:r.value}function ca(n,e){const t=jr(n,!0).delete(e);return new Nn(t).toPromise()}const ag=800,lg=3;class lc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ui(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>lg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return sc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Br._getInstance(rg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tg(),!this.activeServiceWorker)return;this.sender=new Zp(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ng()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ui();return await la(e,Sr,"1"),await ca(e,Sr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>la(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>og(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ca(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=jr(i,!1).getAll();return new Nn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ag)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lc.type="LOCAL";const cg=lc;new kn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ug(n,e){return e?xe(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps extends Jl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return kt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return kt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hg(n){return ec(n.auth,new ps(n),n.bypassAuthState)}function dg(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),zp(t,new ps(n),n.bypassAuthState)}async function fg(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),qp(t,new ps(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:l,type:u}=e;if(l){this.reject(l);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hg;case"linkViaPopup":case"linkViaRedirect":return fg;case"reauthViaPopup":case"reauthViaRedirect":return dg;default:je(this.auth,"internal-error")}}resolve(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg=new kn(2e3,1e4);class Pt extends cc{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Pt.currentPopupAction&&Pt.currentPopupAction.cancel(),Pt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){$e(this.filter.length===1,"Popup operations only handle one event");const e=fs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Se(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Se(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Se(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pg.get())};e()}}Pt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gg="pendingRedirect",cr=new Map;class mg extends cc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=cr.get(this.auth._key());if(!e){try{const r=await _g(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}cr.set(this.auth._key(),e)}return this.bypassAuthState||cr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _g(n,e){const t=Eg(e),r=vg(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function yg(n,e){cr.set(n._key(),e)}function vg(n){return xe(n._redirectPersistence)}function Eg(n){return lr(gg,n.config.apiKey,n.name)}async function Ig(n,e,t=!1){if(Ye(n.app))return Promise.reject(pt(n));const r=Fr(n),i=ug(r,e),l=await new mg(r,i,t).execute();return l&&!t&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tg=10*60*1e3;class wg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ag(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!uc(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Se(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Tg&&this.cachedEventUids.clear(),this.cachedEventUids.has(ua(e))}saveEventToCache(e){this.cachedEventUids.add(ua(e)),this.lastProcessedEventTime=Date.now()}}function ua(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function uc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Ag(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return uc(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rg(n,e={}){return jt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sg=/^https?/;async function bg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Rg(n);for(const t of e)try{if(Cg(t))return}catch{}je(n,"unauthorized-domain")}function Cg(n){const e=Li(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const l=new URL(n);return l.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&l.hostname===r}if(!Sg.test(t))return!1;if(Pg.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg=new kn(3e4,6e4);function ha(){const n=be().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Dg(n){return new Promise((e,t)=>{var r,i,o;function l(){ha(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ha(),t(Se(n,"network-request-failed"))},timeout:kg.get()})}if(!((i=(r=be().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=be().gapi)===null||o===void 0)&&o.load)l();else{const u=xp("iframefcb");return be()[u]=()=>{gapi.load?l():t(Se(n,"network-request-failed"))},Mp(`${Lp()}?onload=${u}`).catch(h=>t(h))}}).catch(e=>{throw ur=null,e})}let ur=null;function Ng(n){return ur=ur||Dg(n),ur}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og=new kn(5e3,15e3),Vg="__/auth/iframe",Mg="emulator/auth/iframe",Lg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},xg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ug(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ls(e,Mg):`https://${n.config.authDomain}/${Vg}`,r={apiKey:e.apiKey,appName:n.name,v:Ut},i=xg.get(n.config.apiHost);i&&(r.eid=i);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Rn(r).slice(1)}`}async function Fg(n){const e=await Ng(n),t=be().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:Ug(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Lg,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const l=Se(n,"network-request-failed"),u=be().setTimeout(()=>{o(l)},Og.get());function h(){be().clearTimeout(u),i(r)}r.ping(h).then(h,()=>{o(l)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jg=500,$g=600,Hg="_blank",qg="http://localhost";class da{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zg(n,e,t,r=jg,i=$g){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h=Object.assign(Object.assign({},Bg),{width:r.toString(),height:i.toString(),top:o,left:l}),f=me().toLowerCase();t&&(u=Hl(f)?Hg:t),jl(f)&&(e=e||qg,h.scrollbars="yes");const y=Object.entries(h).reduce((R,[C,k])=>`${R}${C}=${k},`,"");if(Sp(f)&&u!=="_self")return Gg(e||"",u),new da(null);const A=window.open(e||"",u,y);M(A,n,"popup-blocked");try{A.focus()}catch{}return new da(A)}function Gg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg="__/auth/handler",Wg="emulator/auth/handler",Qg=encodeURIComponent("fac");async function fa(n,e,t,r,i,o){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const l={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ut,eventId:i};if(e instanceof Yl){e.setDefaultLanguage(n.languageCode),l.providerId=e.providerId||"",pu(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[y,A]of Object.entries({}))l[y]=A}if(e instanceof Dn){const y=e.getScopes().filter(A=>A!=="");y.length>0&&(l.scopes=y.join(","))}n.tenantId&&(l.tid=n.tenantId);const u=l;for(const y of Object.keys(u))u[y]===void 0&&delete u[y];const h=await n._getAppCheckToken(),f=h?`#${Qg}=${encodeURIComponent(h)}`:"";return`${Xg(n)}?${Rn(u).slice(1)}${f}`}function Xg({config:n}){return n.emulator?ls(n,Wg):`https://${n.authDomain}/${Kg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii="webStorageSupport";class Jg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ic,this._completeRedirectFn=Ig,this._overrideRedirectResult=yg}async _openPopup(e,t,r,i){var o;$e((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const l=await fa(e,t,r,Li(),i);return zg(e,l,fs())}async _openRedirect(e,t,r,i){await this._originValidation(e);const o=await fa(e,t,r,Li(),i);return eg(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):($e(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Fg(e),r=new wg(e);return t.register("authEvent",i=>(M(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ii,{type:Ii},i=>{var o;const l=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[Ii];l!==void 0&&t(!!l),je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=bg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Wl()||$l()||hs()}}const Yg=Jg;var pa="@firebase/auth",ga="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tm(n){Dt(new gt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:l,authDomain:u}=r.options;M(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:l,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ql(n)},f=new Op(r,i,o,h);return Fp(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Dt(new gt("auth-internal",e=>{const t=Fr(e.getProvider("auth").getImmediate());return(r=>new Zg(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),tt(pa,ga,em(n)),tt(pa,ga,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm=5*60,rm=Aa("authIdTokenMaxAge")||nm;let ma=null;const im=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>rm)return;const i=t==null?void 0:t.token;ma!==i&&(ma=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function sm(n=ba()){const e=ji(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Up(n,{popupRedirectResolver:Yg,persistence:[cg,Jp,ic]}),r=Aa("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const l=im(o.toString());Wp(t,l,()=>l(t.currentUser)),Kp(t,u=>l(u))}}const i=Ta("auth");return i&&Bp(t,`http://${i}`),t}function om(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Vp({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const o=Se("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",om().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tm("Browser");console.log("Gmail Intel Content Script Loaded.");const ln=new WeakMap,am="https://us-central1-gm-intel.cloudfunctions.net/trackPixel",lm="https://us-central1-gm-intel.cloudfunctions.net/trackClick";function _a(){return crypto.randomUUID()}async function cm(){return new Promise((n,e)=>{chrome.runtime.sendMessage({type:"GET_AUTH_TOKEN"},t=>{chrome.runtime.lastError||t!=null&&t.error?e(chrome.runtime.lastError||(t==null?void 0:t.error)):n(t.token)})})}async function um(n){const e=sm();if(!e.currentUser){const t=Ve.credential(null,n);await Gp(e,t)}return e.currentUser}async function ya(n,e){try{console.log("Interceptor activated! Sending tracked email payload..."),e.innerText="Sending...";const t=await cm(),r=await um(t),i=n.querySelector('div[aria-label="Message Body"]');let o=i||n,l=[],u="(No Subject)";console.log("🔍 Starting recipient search. Initial container:",o);let h=0;for(;o&&o!==document.body;){h++;const C=Array.from(o.querySelectorAll('input[name="to"], input[name="cc"], input[name="bcc"]'));console.log(`🔍 [Depth ${h}] Checked for inputs. Found ${C.length} to/cc/bcc inputs.`);const k=o.querySelector('input[name="subjectbox"]');if(k&&(u=k.value),C.length>0){l=C.map(O=>O.value).filter(O=>O&&O.includes("@")),console.log(`🔍 [Depth ${h}] Extracted from inputs:`,l),l.length===0&&(l=Array.from(o.querySelectorAll("[data-hovercard-id]")).map(D=>D.getAttribute("data-hovercard-id")).filter(D=>D&&D.includes("@")),console.log(`🔍 [Depth ${h}] Extracted from chips (fallback 1):`,l));break}o=o.parentElement}if(l.length===0){console.log("🔍 Fallback 2: Loop found nothing. Scanning the highest level composeWindow for chips.");const C=Array.from(n.querySelectorAll("[email], [data-hovercard-id]"));console.log(`🔍 Found ${C.length} elements with 'email' or 'data-hovercard-id' attributes.`),l=C.map(k=>k.getAttribute("email")||k.getAttribute("data-hovercard-id")).filter(k=>k&&k.includes("@")),console.log("🔍 Extracted from fallback 2:",l)}if(l=[...new Set(l)],console.log("🔍 Final deduplicated recipients array:",l),l.length===0){alert("Please add at least one recipient."),e.innerText="Send";return}const f=_a(),y=i?i.innerHTML:"",A=[];for(const C of l){const k=_a(),O=document.createElement("div");O.innerHTML=y,O.querySelectorAll("a").forEach($=>{const J=$.href;$.href=`${lm}?emailId=${f}&recipientId=${k}&targetUrl=${encodeURIComponent(J)}`});const H=O.innerHTML,j=`<img src="${am}?emailId=${f}&recipientId=${k}" width="1" height="1" style="display:none" />`;await cp(t,{to:C,subject:u,body:H,trackingPixelHtml:j}),A.push({email:C,id:k})}await lp({emailId:f,userId:r.uid,subject:u,recipients:A});const R=n.querySelector('div[data-tooltip="Discard draft"]');R?R.click():n.remove()}catch(t){console.error("Tracking Error:",t),alert("Failed to send tracked email. See console."),e.innerText="Send"}}function hm(n,e){if(ln.has(n)||(ln.set(n,!0),!e))return;const t=e.parentElement,r=document.createElement("div");r.style.display="inline-flex",r.style.alignItems="center",r.style.marginLeft="15px",r.style.cursor="pointer",r.style.padding="5px 10px",r.style.borderRadius="4px",r.style.backgroundColor="#e8f0fe",r.style.border="1px solid #1a73e8";const i=document.createElement("input");i.type="checkbox",i.id="gmail-intel-track-"+Date.now(),i.style.marginRight="8px",i.checked=!0;const o=document.createElement("label");o.innerText="Track Email",o.htmlFor=i.id,o.style.fontSize="12px",o.style.fontWeight="bold",o.style.color="#1a73e8",o.style.cursor="pointer",r.appendChild(i),r.appendChild(o),r.addEventListener("click",u=>{u.target!==i&&(i.checked=!i.checked);const h=i.checked;ln.set(n,h),r.style.backgroundColor=h?"#e8f0fe":"#f1f3f4",r.style.borderColor=h?"#1a73e8":"transparent",o.style.color=h?"#1a73e8":"#5f6368"}),t.parentNode.insertBefore(r,t.nextSibling),["click","mousedown","mouseup","pointerdown","pointerup"].forEach(u=>{e.addEventListener(u,h=>{ln.get(n)&&(h.preventDefault(),h.stopPropagation(),h.stopImmediatePropagation(),u==="click"&&ya(n,e))},!0)}),n.addEventListener("keydown",u=>{ln.get(n)&&(u.ctrlKey||u.metaKey)&&u.key==="Enter"&&(u.preventDefault(),u.stopPropagation(),u.stopImmediatePropagation(),ya(n,e))},!0)}const dm=new MutationObserver(()=>{document.querySelectorAll('div[aria-label="Message Body"]').forEach(e=>{let t=e,r=null;for(let i=0;i<15&&!(!t||(r=t.querySelector('div[role="button"][data-tooltip^="Send"]'),r));i++)t=t.parentElement;t&&r&&hm(t,r)})});dm.observe(document.body,{childList:!0,subtree:!0});
})()

(function(e){function t(t){for(var o,c,u=t[0],i=t[1],l=t[2],d=0,f=[];d<u.length;d++)c=u[d],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&f.push(r[c][0]),r[c]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);s&&s(t);while(f.length)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,u=1;u<n.length;u++){var i=n[u];0!==r[i]&&(o=!1)}o&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={app:0},a=[];function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var s=i;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"019e":function(e,t,n){"use strict";n.r(t);var o=n("83a7"),r=n("5a15");for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("f700");r["default"].render=o["a"],r["default"].__scopeId="data-v-31d019ec",t["default"]=r["default"]},"02b2":function(e,t,n){"use strict";n.r(t);var o=n("28eb"),r=n.n(o);for(var a in n.d(t,"default",(function(){return r.a})),o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a)},"230a":function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n("7a23"),a=o(n("6c47"));t.default=(0,r.defineComponent)({components:{CardPicker:a.default},props:{hand:{type:Array,required:!0},colorScheme:{type:String,required:!0}},emits:{handUpdated({id:e,value:t}){return e>=0&&e<4&&t>=1&&t<=13}},methods:{updateHand(e,t){this.$emit("handUpdated",{id:e,value:t})}}})},"27d3":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n("7a23");function r(e,t,n,r,a,c){const u=Object(o["resolveComponent"])("hand"),i=Object(o["resolveComponent"])("solutions");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createVNode"])(u,{onHandUpdated:e.updateHand,hand:e.hand,colorScheme:e.colorScheme},null,8,["onHandUpdated","hand","colorScheme"]),Object(o["createVNode"])(i,{onRedraw:e.redraw,solutions:e.solutions},null,8,["onRedraw","solutions"])],64)}},"28eb":function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n("7a23"),a=o(n("3477")),c=o(n("019e")),u=n("5cde");t.default=(0,r.defineComponent)({components:{Hand:a.default,Solutions:c.default},data(){const e=this.generateHand(),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return{hand:e,solutions:this.solve(e),colorScheme:t}},methods:{generateHand(){return[this.getRandomValue(),this.getRandomValue(),this.getRandomValue(),this.getRandomValue()]},solve(e){return u.Solver.print(u.Solver.solve(e))},updateHand({id:e,value:t}){this.hand[e]=t},redraw(){this.hand=this.generateHand()},getRandomValue(){return 1+Math.floor(13*Math.random())}},watch:{hand:{handler(e){this.solutions=this.solve(e)},deep:!0}},mounted(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{this.colorScheme=e.matches?"dark":"light"})}})},3477:function(e,t,n){"use strict";n.r(t);var o=n("4010"),r=n("a5c1");for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);r["default"].render=o["a"],t["default"]=r["default"]},"3dfd":function(e,t,n){"use strict";n.r(t);var o=n("27d3"),r=n("02b2");for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);r["default"].render=o["a"],t["default"]=r["default"]},"3eb0":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n("7a23");t.default=(0,o.defineComponent)({props:{solutions:{type:Array,required:!0}},data(){return{showSolutions:!1}},methods:{toggleSolutions(){this.showSolutions=!this.showSolutions}},emits:{redraw:null},computed:{hasSolutions(){return 0!==this.solutions.length}},watch:{solutions(){this.showSolutions=!1}}})},4010:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n("7a23");const r={class:"row justify-content-around"};function a(e,t,n,a,c,u){const i=Object(o["resolveComponent"])("card-picker");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",r,[(Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])([1,2,3,4],t=>Object(o["createVNode"])(i,{id:t,key:t,value:e.hand[t-1],colorScheme:e.colorScheme,onSelect:n=>e.updateHand(t-1,n)},null,8,["id","value","colorScheme","onSelect"])),64))])}},"4b23":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n("7a23"),r=[{text:"Ace",value:1},{text:"2",value:2},{text:"3",value:3},{text:"4",value:4},{text:"5",value:5},{text:"6",value:6},{text:"7",value:7},{text:"8",value:8},{text:"9",value:9},{text:"10",value:10},{text:"Jack",value:11},{text:"Queen",value:12},{text:"King",value:13}],a=["Clubs","Diamonds","Hearts","Spades"];t.default=(0,o.defineComponent)({props:{id:{type:Number,required:!0},value:{type:Number,required:!0},colorScheme:{type:String,required:!0}},data(){return{cards:r,selected:this.value}},watch:{selected(e){this.$emit("select",e)},value(e){this.selected=e}},computed:{image(){const e=a[Math.floor(4*Math.random())];return{src:`images/${this.colorScheme}/${this.selected}${e[0]}.svg`,alt:`${r[this.selected-1].text} of ${e}`,title:`${r[this.selected-1].text} of ${e}`}}},emits:{select(e){return e>=1&&e<=13}}})},"5a15":function(e,t,n){"use strict";n.r(t);var o=n("3eb0"),r=n.n(o);for(var a in n.d(t,"default",(function(){return r.a})),o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a)},"5cde":function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e["default"]=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Solver=void 0;const c=n("d279"),u=a(n("b0b9"));class i{static solve(e){const t=[],n=[];for(let o=0;o<2**e.filter(e=>e>10).length;o++){const t=[];let r=1;for(const n of e)n>10?(o/r%2===0?t.push(n):t.push(10),r*=2):t.push(n);n.push(t)}for(const o of n)for(const e of new c.Permutation(o))for(const n of new c.BaseN(i.ops,3)){let o=n[0].operate(e[0],e[1]),r=n[1].operate(e[2],e[3]),a=n[2].operate(o,r);24===a&&t.push({operations:n,parentheses:0,solution:e}),o=n[0].operate(e[0],e[1]),r=n[1].operate(o,e[2]),a=n[2].operate(r,e[3]),24===a&&t.push({operations:n,parentheses:1,solution:e}),o=n[0].operate(e[1],e[2]),r=n[1].operate(e[0],o),a=n[2].operate(r,e[3]),24===a&&t.push({operations:n,parentheses:2,solution:e}),o=n[0].operate(e[1],e[2]),r=n[1].operate(o,e[3]),a=n[2].operate(e[0],r),24==a&&t.push({operations:n,parentheses:3,solution:e}),o=n[0].operate(e[2],e[3]),r=n[1].operate(e[1],o),a=n[2].operate(e[0],r),24===a&&t.push({operations:n,parentheses:4,solution:e})}return t}static print(e){const t=[];for(const{operations:n,parentheses:o,solution:r}of e)if(0===o){const e=`(${n[0].toString(r[0],r[1])})`,o=`(${n[1].toString(r[2],r[3])})`;t.push(n[2].toString(e,o))}else if(1===o){const e=`(${n[0].toString(r[0],r[1])})`,o=`(${n[1].toString(e,r[2])})`;t.push(n[2].toString(o,r[3]))}else if(2===o){const e=`(${n[0].toString(r[1],r[2])})`,o=`(${n[1].toString(r[0],e)})`;t.push(n[2].toString(o,r[3]))}else if(3===o){const e=`(${n[0].toString(r[1],r[2])})`,o=`(${n[1].toString(e,r[3])})`;t.push(n[2].toString(r[0],o))}else if(4===o){const e=`(${n[0].toString(r[2],r[3])})`,o=`(${n[1].toString(r[1],e)})`;t.push(n[2].toString(r[0],o))}return t}}t.Solver=i,i.ops=[u.Add,u.Subtract,u.Multiply,u.Divide,u.Exponent,u.Log]},"6c47":function(e,t,n){"use strict";n.r(t);var o=n("c6cf"),r=n("cea6");for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("ddaa");r["default"].render=o["a"],r["default"].__scopeId="data-v-3f4711de",t["default"]=r["default"]},"83a7":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n("7a23");Object(o["pushScopeId"])("data-v-31d019ec");const r={class:"my-3"},a={class:"text-center"},c={class:"fw-light"},u=["disabled"],i={key:0,class:"row my-3"};function l(e,t,n,l,s,d){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",r,[Object(o["createElementVNode"])("div",a,[Object(o["createElementVNode"])("h1",c,Object(o["toDisplayString"])(e.hasSolutions?"Solutions found!":"No solutions"),1),Object(o["createElementVNode"])("button",{class:"btn btn-primary mx-1",disabled:!e.hasSolutions,onClick:t[0]||(t[0]=(...t)=>e.toggleSolutions&&e.toggleSolutions(...t))},Object(o["toDisplayString"])(e.showSolutions?"Hide":"Show")+" solutions ",9,u),Object(o["createElementVNode"])("button",{class:"btn btn-secondary mx-1",onClick:t[1]||(t[1]=t=>e.$emit("redraw"))}," Draw again ")]),e.showSolutions?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",i,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.solutions,(e,t)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("pre",{key:t,class:"text-center col-12 col-sm-4 col-md-3 col-lg-2"},"        "+Object(o["toDisplayString"])(e)+"\n      ",1))),128))])):Object(o["createCommentVNode"])("",!0)])}Object(o["popScopeId"])()},"9d42":function(e,t,n){},a5c1:function(e,t,n){"use strict";n.r(t);var o=n("230a"),r=n.n(o);for(var a in n.d(t,"default",(function(){return r.a})),o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a)},b0b9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Log=t.Exponent=t.Divide=t.Multiply=t.Subtract=t.Add=void 0,t.Add={operate(e,t){return e+t},toString(e,t){return`${e} + ${t}`}},t.Subtract={operate(e,t){return e-t},toString(e,t){return`${e} - ${t}`}},t.Multiply={operate(e,t){return e*t},toString(e,t){return`${e} * ${t}`}},t.Divide={operate(e,t){return e/t},toString(e,t){return`${e} / ${t}`}},t.Exponent={operate(e,t){return e**t},toString(e,t){return`${e} ^ ${t}`}},t.Log={operate(e,t){return Math.log(t)/Math.log(e)},toString(e,t){return`log_${e}(${t})`}}},b1aa:function(e,t,n){},c6cf:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var o=n("7a23");Object(o["pushScopeId"])("data-v-3f4711de");const r={class:"col-auto card-responsive"},a={class:"card-select"},c=["for"],u=["name","id"],i=["value"],l=["src","alt","title"];function s(e,t,n,s,d,f){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",r,[Object(o["createElementVNode"])("div",a,[Object(o["createElementVNode"])("label",{for:"card"+e.id,class:"form-label"},"Card "+Object(o["toDisplayString"])(e.id),9,c),Object(o["withDirectives"])(Object(o["createElementVNode"])("select",{name:"card"+e.id,id:"card"+e.id,"onUpdate:modelValue":t[0]||(t[0]=t=>e.selected=t),class:"form-select",required:""},[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.cards,e=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("option",{value:e.value,key:e.value},Object(o["toDisplayString"])(e.text),9,i))),128))],8,u),[[o["vModelSelect"],e.selected]])]),Object(o["createElementVNode"])("img",{class:"img-fluid py-3",src:e.image.src,alt:e.image.alt,title:e.image.title},null,8,l)])}Object(o["popScopeId"])()},cd49:function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e["default"]=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t},c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const u=a(n("7a23")),i=c(n("3dfd"));n("d8ba"),n("b1aa");const l=u.createApp(i.default);l.mount("#app")},ce19:function(e,t,n){},cea6:function(e,t,n){"use strict";n.r(t);var o=n("4b23"),r=n.n(o);for(var a in n.d(t,"default",(function(){return r.a})),o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a)},d8ba:function(e,t,n){},ddaa:function(e,t,n){"use strict";n("9d42")},f700:function(e,t,n){"use strict";n("ce19")}});
//# sourceMappingURL=app.cf90194c.js.map
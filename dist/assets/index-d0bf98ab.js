import{r as w,o as _,c as T,w as b,v as P,a as l,b as u,d as x,u as v,T as oe,C as ie,F as $,e as le,B as G,f as ce,g as de,h as ue,i as S,j as me,k as pe,l as he,m as fe,n as ge,I as ve,p as F,S as ye,q as we,s as _e,t as be,x as xe,y as De,z as ke,A as Ee}from"./vendor-3879db28.js";let J,D,L,Te=(async()=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(a){if(a.ep)return;a.ep=!0;const t=r(a);fetch(a.href,t)}})();let M,z,k,h,R,A,O,V,C,I,m,B,H,N;M="modulepreload",z=function(e){return"/"+e},k={},h=function(e,r,o){if(!r||r.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(r.map(t=>{if(t=z(t),t in k)return;k[t]=!0;const s=t.endsWith(".css"),g=s?'[rel="stylesheet"]':"";if(o)for(let f=a.length-1;f>=0;f--){const p=a[f];if(p.href===t&&(!s||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${g}`))return;const n=document.createElement("link");if(n.rel=s?"stylesheet":M,s||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),s)return new Promise((f,p)=>{n.addEventListener("load",f),n.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>e()).catch(t=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=t,window.dispatchEvent(s),!s.defaultPrevented)throw t})},R={class:"fixed right-1 w-40 h-40 rounded-full bottom-10"},A={class:"w-auto max-w-800 bg-zinc-800 mx-auto p-10 rounded-2xl whitespace-nowrap overflow-hidden fixed bottom-3 right-3"},O={class:"pt-25"},V={class:"z-10 flex absolute right-1 top-1 h-25 w-25 items-center justify-center bg-zinc-900 rounded-full"},C={__name:"TerminalBtn",setup(e){const r=le(()=>h(()=>import("./SerialPortReader-62d6796e.js"),["assets/SerialPortReader-62d6796e.js","assets/vendor-3879db28.js","assets/vendor-84dbe159.css","assets/SerialPortReader-e4fafbde.css"])),o=w(!1),a=t=>{o.value=t};return(t,s)=>{const g=G;return _(),T($,null,[b(l("div",R,[u(g,{shape:"circle",onClick:s[0]||(s[0]=n=>a(!0))},{default:x(()=>[u(v(oe),{size:"20"})]),_:1})],512),[[P,!o.value]]),b(l("div",A,[l("div",O,[l("div",V,[u(g,{onClick:s[1]||(s[1]=n=>a(!1)),shape:"circle",theme:"danger",variant:"text",class:"text-zinc-50"},{default:x(()=>[u(v(ie),{size:"18"})]),_:1})]),u(v(r))])],512),[[P,o.value]])],64)}}},I="theme-mode",m={Dark:"dark",Light:"light"},J={UpdatePose:"UpdatePose",Rotate:"Rotate",Disappear:"Disappear"},B={loss:"loss",acc:"accuracy",epochs:"epochs",collecting:"Collecting",gestureTypes:"Gesture Types",learnRate:"Learning rate",accuracyThreshold:"Accuracy Threshold",noData:"No data available",successSaveModel:"Success to save model",noModel:"No available model",dataSize:"Data Size",trainDataSize:"Traning data size",train:"train",training:"Training",stopTraining:"Stop Training",startToTrain:"Start to train",exportModel:"Export model",modelSummary:"Model Summary",trainPerform:"Training Performance",startGesture:"Start to capture gesture",exportData:"Export datasets",getDatasets:"Get Datasets",mockPredict:"Make {d} data to predict",showData:"Show Datasets",hideData:"Hide Datasets",makePredict:"Make Prediction",noDeviceMotionEvent:"Device motion event is not supported for this environent",Validate:"Validate",baudRate:"Baud Rate",selectBaudRate:"Select Baud Rate",connectSerial:"Connect to a serial port",disconnect:"Disconnect",connectBaudSuccess:"Success to connect, baud rate: {rate}"},H={},N={cn:H,en:B},D=ce({globalInjection:!0,locale:"en",fallbackLocale:"en",messages:N,legacy:!1}),D.global;const j=[{path:"/",redirect:{name:"Home"},children:[{path:"/",name:"Home",component:async()=>await h(()=>import("./Main-94c430b1.js"),["assets/Main-94c430b1.js","assets/vendor-3879db28.js","assets/vendor-84dbe159.css","assets/BufferGeometryUtils-de005f4b.js","assets/_commonjsHelpers-de833af9.js","assets/Main-2437397c.css"]),meta:{title:"home"}},{path:"p1",name:"Particles Mask",component:async()=>await h(()=>import("./Index-c027c624.js"),["assets/Index-c027c624.js","assets/vendor-3879db28.js","assets/vendor-84dbe159.css"]),meta:{title:"Particles Mask"}},{path:"p2",name:"Particles Mask By Proton",component:async()=>await h(()=>import("./Proton-de74091e.js"),["assets/Proton-de74091e.js","assets/_commonjsHelpers-de833af9.js","assets/vendor-3879db28.js","assets/vendor-84dbe159.css"]),meta:{title:"Proto"}},{path:"p3",name:"Fireworks",component:async()=>await h(()=>import("./Particles-a477d524.js"),["assets/Particles-a477d524.js","assets/vendor-3879db28.js","assets/vendor-84dbe159.css"]),meta:{title:"Particles"}},{path:"p5",name:"Drop3D ",component:async()=>await h(()=>import("./Drop3D-afa58192.js"),["assets/Drop3D-afa58192.js","assets/BufferGeometryUtils-de005f4b.js","assets/_commonjsHelpers-de833af9.js","assets/vendor-3879db28.js","assets/vendor-84dbe159.css"]),meta:{title:"Drop3D"}}]}],U=de({history:ue(),routes:j});U.beforeEach((e,r,o)=>{const a=e.meta.title;a&&(document.title=a),e.query.reference&&(e.meta.backPage={name:e.query.reference}),o()});let q;q=S("theme",{state:()=>({themeMode:m.Dark}),actions:{setThemeMode(e){e&&(this.themeMode=e);let r=document.documentElement;r.setAttribute(I,this.themeMode),this.themeMode===m.Dark?r.classList.add(m.Dark):r.classList.remove(m.Dark)},toggleThemeMode(){this.setThemeMode(this.themeMode===m.Dark?m.Light:m.Dark)}}}),L=S("messages",{state:()=>({ws:"",messages:[]}),getters:{LATEST_MSG(){return this.messages[0]||null}},actions:{receiveMsg(e){e.date=new Date().getTime(),e.img&&(e.img=`data:image/jpeg;base64,${e.img}`),this.messages.unshift(e)},setHistoryWs(e){this.ws=e}},persist:{paths:["messages","ws"]}}),S("handpose",{state:()=>({handposes:[]}),getters:{LATEST_POSE(){return this.handposes[0]||null}},actions:{receiveHandPose(e){res.date=new Date().getTime(),this.handposes.unshift({date,type:e.type,value:e.value})}},persist:!1});const K={class:"sticky top-0 left-0 font-mst z-10 w-full shrink-0 bg-zinc-950"},Q={class:"max1080:flex-wrap py-10 flex justify-between px-10 relative max1080:pr-45 mb-10"},X={class:"hidden max1080:flex items-center absolute top-3 right-2"},Y={class:"h-auto flex-wrap flex items-center justify-ceneter grow rounded-md"},Z={class:"focus-within:border-active grow max-w-600 overflow-hidden pl-10 box-border flex items-center pr-10 border border-zinc-600 rounded-full"},ee={class:"flex items-center"},te={__name:"App",setup(e){const r=me();q().setThemeMode("dark");const o=L(),a=w(!1);let t=null,s=w(!1);const g=["http://192.168.127.102:3000","http://192.168.117.105:10887","https://moon.oupp.site/ws","http://10.10.43.42:10887"],n=w(o.ws||(location.hostname==="moon.oupp.site"?"":g[1])),f=y=>{const i=new WebSocket(y);return i.addEventListener("open",()=>{s.value=!0,console.log(n.value),o.setHistoryWs(n.value)}),i.addEventListener("error",c=>{s.value=!1}),i.addEventListener("close",()=>{s.value=!1}),i.onmessage=c=>{try{c=JSON.parse(c.data),c=c.content.events,console.log(c),c.img&&o.receiveMsg(c)}catch(E){console.log(E);return}},i},p=y=>{if(t&&!y){t.close();return}n.value&&(t=f(n.value))};return pe(()=>{p()}),(y,i)=>{const c=ve,E=G,ae=F("router-link"),se=ye,ne=F("router-view"),re=C;return _(),T("div",null,[l("div",K,[l("div",Q,[l("div",X,[u(E,{class:"t-demo-collapse-btn",variant:"text",shape:"circle",onClick:i[0]||(i[0]=d=>a.value=!a.value)},{icon:x(()=>[u(c,{name:a.value?"view-list":"close",size:"22px"},null,8,["name"])]),_:1})]),b(l("div",Y,[(_(!0),T($,null,he(v(j)[0].children,d=>(_(),we(ae,{class:xe(["px-8 min-h-35 mx-10 max1080:mb-10 max1080:w-full rounded-md text-16 flex items-center",{" text-lime-300 bg-lime-950":v(r).name===d.name}]),to:d.path},{default:x(()=>[_e(be(d.name),1)]),_:2},1032,["class","to"]))),256))],512),[[P,!a.value]]),l("div",Z,[b(l("input",{clearable:"",class:"block w-full outline-none border-none px-10 h-40 bg-transparent","onUpdate:modelValue":i[1]||(i[1]=d=>n.value=d),placeholder:"WebSocket URL",onChange:i[2]||(i[2]=d=>p(!1))},null,544),[[fe,n.value]]),l("div",ee,[u(se,{modelValue:v(s),"onUpdate:modelValue":i[3]||(i[3]=d=>ge(s)?s.value=d:s=d),onChange:p},null,8,["modelValue"])])])])]),u(ne,{class:"p-10"}),u(re)])}}},W=De();W.use(ke({key:e=>`${e}`})),Ee(te).use(W).use(D).use(U).mount("#app")})();export{J as H,Te as __tla,D as i,L as s};
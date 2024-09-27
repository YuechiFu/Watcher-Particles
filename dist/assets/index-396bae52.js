import{r as E,o as y,c as w,w as q,v as U,a as h,b as d,d as b,u as v,T as ae,C as se,F as $,e as ne,B as oe,f as re,g as ie,h as le,i as T,j as ce,k as de,l as me,m as ue,n as G,I as pe,S as he,p as fe,q as ge,t as ve,s as ye,x as we,y as _e}from"./vendor-7c9f84d2.js";let W,_,S,De=(async()=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(a){if(a.ep)return;a.ep=!0;const e=n(a);fetch(a.href,e)}})();let x,P,D,g,L,M,O,V,R,z,f,A,I,C;x="modulepreload",P=function(t){return"/"+t},D={},g=function(t,n,o){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(e=>{if(e=P(e),e in D)return;D[e]=!0;const s=e.endsWith(".css"),i=s?'[rel="stylesheet"]':"";if(o)for(let m=a.length-1;m>=0;m--){const u=a[m];if(u.href===e&&(!s||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${i}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":x,s||(l.as="script",l.crossOrigin=""),l.href=e,document.head.appendChild(l),s)return new Promise((m,u)=>{l.addEventListener("load",m),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>t()).catch(e=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=e,window.dispatchEvent(s),!s.defaultPrevented)throw e})},L={class:"fixed right-1 w-40 h-40 rounded-full bottom-10"},M={class:"w-auto max-w-800 bg-zinc-800 mx-auto p-10 rounded-2xl whitespace-nowrap overflow-hidden fixed bottom-3 right-3"},O={class:"pt-25"},V={class:"z-10 flex absolute right-1 top-1 h-25 w-25 items-center justify-center bg-zinc-900 rounded-full"},R={__name:"TerminalBtn",setup(t){const n=ne(()=>g(()=>import("./SerialPortReader-fd448522.js"),["assets/SerialPortReader-fd448522.js","assets/vendor-7c9f84d2.js","assets/vendor-84dbe159.css","assets/SerialPortReader-e4fafbde.css"])),o=E(!1),a=e=>{o.value=e};return(e,s)=>{const i=oe;return y(),w($,null,[q(h("div",L,[d(i,{shape:"circle",onClick:s[0]||(s[0]=l=>a(!0))},{default:b(()=>[d(v(ae),{size:"20"})]),_:1})],512),[[U,!o.value]]),q(h("div",M,[h("div",O,[h("div",V,[d(i,{onClick:s[1]||(s[1]=l=>a(!1)),shape:"circle",theme:"danger",variant:"text",class:"text-zinc-50"},{default:b(()=>[d(v(se),{size:"18"})]),_:1})]),d(v(n))])],512),[[U,o.value]])],64)}}},z="theme-mode",f={Dark:"dark",Light:"light"},W={ZoomOut:"ZoomOut",ZoomIn:"ZoomIn",Scale:"Scale",Left:"Left",Right:"Right",Up:"Up",Down:"Down",Disappear:"Disappear"},A={loss:"loss",acc:"accuracy",epochs:"epochs",collecting:"Collecting",gestureTypes:"Gesture Types",learnRate:"Learning rate",accuracyThreshold:"Accuracy Threshold",noData:"No data available",successSaveModel:"Success to save model",noModel:"No available model",dataSize:"Data Size",trainDataSize:"Traning data size",train:"train",training:"Training",stopTraining:"Stop Training",startToTrain:"Start to train",exportModel:"Export model",modelSummary:"Model Summary",trainPerform:"Training Performance",startGesture:"Start to capture gesture",exportData:"Export datasets",getDatasets:"Get Datasets",mockPredict:"Make {d} data to predict",showData:"Show Datasets",hideData:"Hide Datasets",makePredict:"Make Prediction",noDeviceMotionEvent:"Device motion event is not supported for this environent",Validate:"Validate",baudRate:"Baud Rate",selectBaudRate:"Select Baud Rate",connectSerial:"Connect to a serial port",disconnect:"Disconnect",connectBaudSuccess:"Success to connect, baud rate: {rate}"},I={},C={cn:I,en:A},_=re({globalInjection:!0,locale:"en",fallbackLocale:"en",messages:C,legacy:!1}),_.global;const B=[{path:"/",redirect:{name:"Home"},children:[{path:"/",name:"Home",component:async()=>await g(()=>import("./Main-071e998d.js"),["assets/Main-071e998d.js","assets/vendor-7c9f84d2.js","assets/vendor-84dbe159.css","assets/BufferGeometryUtils-de005f4b.js","assets/_commonjsHelpers-de833af9.js","assets/Main-4060f00b.css"]),meta:{title:"home"}},{path:"p1",name:"Particles Mask",component:async()=>await g(()=>import("./Index-3e1137d7.js"),["assets/Index-3e1137d7.js","assets/vendor-7c9f84d2.js","assets/vendor-84dbe159.css"]),meta:{title:"Particles Mask"}},{path:"p2",name:"Particles Mask By Proton",component:async()=>await g(()=>import("./Proton-f709df4e.js"),["assets/Proton-f709df4e.js","assets/_commonjsHelpers-de833af9.js","assets/vendor-7c9f84d2.js","assets/vendor-84dbe159.css"]),meta:{title:"Proto"}},{path:"p3",name:"Fireworks",component:async()=>await g(()=>import("./Particles-2a6c8f17.js"),["assets/Particles-2a6c8f17.js","assets/vendor-7c9f84d2.js","assets/vendor-84dbe159.css"]),meta:{title:"Particles"}},{path:"p5",name:"Drop3D ",component:async()=>await g(()=>import("./Drop3D-2edc2159.js"),["assets/Drop3D-2edc2159.js","assets/BufferGeometryUtils-de005f4b.js","assets/_commonjsHelpers-de833af9.js","assets/vendor-7c9f84d2.js","assets/vendor-84dbe159.css"]),meta:{title:"Drop3D"}}]}],H=ie({history:le(),routes:B});H.beforeEach((t,n,o)=>{const a=t.meta.title;a&&(document.title=a),t.query.reference&&(t.meta.backPage={name:t.query.reference}),o()});let N;N=T("theme",{state:()=>({themeMode:f.Dark}),actions:{setThemeMode(t){t&&(this.themeMode=t);let n=document.documentElement;n.setAttribute(z,this.themeMode),this.themeMode===f.Dark?n.classList.add(f.Dark):n.classList.remove(f.Dark)},toggleThemeMode(){this.setThemeMode(this.themeMode===f.Dark?f.Light:f.Dark)}}}),S=T("messages",{state:()=>({ws:"",messages:[]}),getters:{LATEST_MSG(){return this.messages[0]||null}},actions:{receiveMsg(t){t.date=new Date().getTime(),t.img&&(t.img=`data:image/jpeg;base64,${t.img}`),this.messages.unshift(t)},setHistoryWs(t){this.ws=t}},persist:{paths:["messages","ws"]}}),T("handpose",{state:()=>({handposes:[]}),getters:{LATEST_POSE(){return this.handposes[0]||null}},actions:{receiveHandPose(t){res.date=new Date().getTime(),this.handposes.unshift({date,type:t.type,value:t.value})}},persist:!1});const Z={class:"sticky top-0 left-0 font-mst z-10 w-full shrink-0 bg-zinc-950"},F={class:"max768:flex-wrap py-10 flex justify-between"},J={class:"h-auto flex-wrap flex items-center justify-ceneter w-full rounded-md"},K={class:"w-350 px-20 box-border flex items-center pr-10"},Q={class:"ml-10 w-100"},X={__name:"App",setup(t){const n=ce();N().setThemeMode("dark");const o=S();let a=null,e=E(!1);const s=["http://192.168.127.102:3000","http://192.168.117.105:10887","https://moon.oupp.site/ws","http://10.10.43.42:10887"],i=E(o.ws||(location.hostname==="moon.oupp.site"?"":s[1])),l=u=>{const r=new WebSocket(u);return r.addEventListener("open",()=>{e.value=!0,console.log(i.value),o.setHistoryWs(i.value)}),r.addEventListener("error",c=>{e.value=!1}),r.addEventListener("close",()=>{e.value=!1}),r.onmessage=c=>{try{c=JSON.parse(c.data),c=c.content.events,console.log(c),c.img&&o.receiveMsg(c)}catch(k){console.log(k);return}},r},m=u=>{if(a&&!u){a.close();return}i.value&&(a=l(i.value))};return de(()=>{m()}),(u,r)=>{const c=G("router-link"),k=pe,Y=he,ee=G("router-view"),te=R;return y(),w("div",null,[h("div",Z,[h("div",F,[h("div",J,[(y(!0),w($,null,me(v(B)[0].children,p=>(y(),w("div",{class:fe(["px-8 min-h-35 mx-10 max768:mb-10 rounded-md text-16 flex items-center",{" text-sky-300 bg-sky-950":v(n).name===p.name}])},[d(c,{to:p.path},{default:b(()=>[ge(ve(p.name),1)]),_:2},1032,["to"])],2))),256))]),h("div",K,[d(k,{clearable:"",class:"w-200",modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=p=>i.value=p),onChange:r[1]||(r[1]=p=>m(!1))},null,8,["modelValue"]),h("div",Q,[d(Y,{modelValue:v(e),"onUpdate:modelValue":r[2]||(r[2]=p=>ue(e)?e.value=p:e=p),onChange:m},null,8,["modelValue"])])])])]),d(ee),d(te)])}}},j=ye();j.use(we({key:t=>`${t}`})),_e(X).use(j).use(_).use(H).mount("#app")})();export{W as H,De as __tla,_ as i,S as s};
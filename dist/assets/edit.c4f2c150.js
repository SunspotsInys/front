import{d as e,r as a,q as t,Q as n,u as l,i as s,o,b as d,e as i,g as c,F as m,f as r,t as u,aa as p,ab as f,j as v,ac as b,R as h,p as g,a as k,l as _}from"./vendor.21b6d693.js";import{A as x,i as j}from"./index.5fc77090.js";import{g as w,u as y}from"./index.f1dbb307.js";import{f as C,A as I,a as F,b as U,m as E,c as R}from"./index.fc105546.js";import{A}from"./index.6b4eed05.js";/* empty css              */import{V as z}from"./index.4288891d.js";import{b as M}from"./tag.3b015e19.js";const q=h();g("data-v-6b893178");const B={id:"edit"},K=v("公开"),N=v("置顶"),Q={class:"tags"},T=i("div",{class:"postcontent"},null,-1),V=v("提交");k();var $=e({setup(e){let h=a(new Map),g=a({id:"",title:"",public:!1,top:!1,tags:[],content:""}),k=a({id:"",name:""}),$=a([]);M().then((({data:e})=>{e.forEach((e=>{$.push({id:e.id,name:e.name})}))}));const D=document.createElement("div");t((()=>g.content),((e,a)=>{z.preview(D,g.content)}));const G=e=>{h.has(e.name)?_.warn(`已经存在 ${e.name} 的标签`):(""===e.id&&(e.id="0"),""!==e.name&&(h.set(e.name,e.id),e.name=""))},H=n().params.pid;w(H).then((({data:e})=>{g.id=e.id,g.title=e.title,g.public=e.public,g.content=e.content,g.top=!1,0!==e.top&&(g.top=!0);for(const a of e.tags)h.set(a.name,a.id)}));const J=l(),L=()=>{if(""!==g.title&&""!==g.content){for(const[e,a]of h)g.tags.push({id:a,name:e});y(g).then((e=>{J.push("/admin")}))}else _.error("请输入博文内容！！！")};return s((()=>{const e=document.getElementsByClassName("postcontent");e.length>0&&e[0].appendChild(D),z.preview(D,g.content)})),(e,a)=>(o(),d("div",B,[i(c(R),null,{default:q((()=>[i(c(C.FormItem),{label:"标题"},{default:q((()=>[i(c(x),{value:c(g).title,"onUpdate:value":a[1]||(a[1]=e=>c(g).title=e)},null,8,["value"])])),_:1}),i(c(C.FormItem),{label:""},{default:q((()=>[i(c(I),{checked:c(g).public,"onUpdate:checked":a[2]||(a[2]=e=>c(g).public=e)},{default:q((()=>[K])),_:1},8,["checked"]),i(c(I),{checked:c(g).top,"onUpdate:checked":a[3]||(a[3]=e=>c(g).top=e)},{default:q((()=>[N])),_:1},8,["checked"])])),_:1}),i(c(C.FormItem),{label:"标签"},{default:q((()=>[i("div",Q,[(o(!0),d(m,null,r(c(h),((e,a)=>(o(),d("span",{key:a,class:"tag",onClick:a=>{return t=e[0],console.log(h),h.delete(t),void console.log(h);var t}},u(e[0]),9,["onClick"])))),128)),i(c(F),{trigger:["hover","click"]},{overlay:q((()=>[i(c(U),null,{default:q((()=>[(o(!0),d(m,null,r(c($),((e,a)=>{return p((o(),d(c(E.MenuItem),{key:a,onClick:a=>G(e)},{default:q((()=>[v(u(e.name),1)])),_:2},1032,["onClick"])),[[f,(t=e.name,new RegExp(k.name,"i").test(t))]]);var t})),128))])),_:1})])),default:q((()=>[i(c(x),{type:"text",size:"small",style:{width:"78px"},value:c(k).name,"onUpdate:value":a[4]||(a[4]=e=>c(k).name=e),onKeyup:a[5]||(a[5]=b((e=>G(c(k))),["enter"]))},null,8,["value"])])),_:1})])])),_:1}),i(c(C.FormItem),{label:"内容"},{default:q((()=>[i(c(j.Textarea),{value:c(g).content,"onUpdate:value":a[6]||(a[6]=e=>c(g).content=e),placeholder:"输入博文内容","auto-size":{minRows:5,maxRows:20}},null,8,["value"]),T])),_:1}),i(c(C.FormItem),{label:""},{default:q((()=>[i(c(A),{onClick:L},{default:q((()=>[V])),_:1})])),_:1})])),_:1})]))}});$.__scopeId="data-v-6b893178";export default $;

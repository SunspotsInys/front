import{W as e}from"./index.7cb132f0.js";import{d as a,u as t,j as d,o,b as n,e as s,p as i,a as c}from"./vendor.6b6d97e7.js";import{g as l}from"./tag.1f1c752c.js";import{_ as r}from"./index.7b55a6f3.js";i("data-v-eda9f376");const m={id:"tag",class:"mainpage"},p=s("div",{id:"wordcloud"},null,-1);c();var u=a({setup(a){const i=t(),c=document.createElement("div");return l().then((({data:a})=>{const t=new e(c,{data:a,wordField:"name",weightField:"num",color:"#122c6a",wordStyle:{fontFamily:"Verdana",fontSize:[24,80]},interactions:[{type:"element-active"}],state:{active:{style:{lineWidth:3}}}});t.render(),t.on("element:click",((...e)=>{console.log(),console.log(`${e[0]}`),i.push({path:`/tag/${e[0].data.data.datum.num}`})}))})),d((()=>{const e=document.getElementById("wordcloud");e&&e.appendChild(c)})),(e,a)=>(o(),n("div",m,[s(r,{text:"标签页"}),p]))}});u.__scopeId="data-v-eda9f376";export default u;
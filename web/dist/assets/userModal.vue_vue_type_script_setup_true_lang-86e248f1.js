import{d as C,h as D,O as F,r as M,a as o,o as r,k as p,w as c,e as f,c as x,H as B,u as l,G as N,au as S,an as U}from"./index-c1672c39.js";const L=C({__name:"userModal",props:{visible:null,title:null,formData:null},emits:["closeModal","refresh"],setup(s,{emit:m}){const u=s;u.formData;const e=D({username:"",nickname:"",password:"123456",confirmPassword:"123456"});F(()=>u.formData,a=>{if(a){const t=JSON.parse(JSON.stringify(a));e.username=t.username,e.nickname=t.nickname}});const d=M([{type:"input",label:"用户名",placeholder:"请输入用户名",value:"username"},{type:"input",label:"用户昵称",placeholder:"请输入用户昵称",value:"nickname"},{type:"input",label:"密码",placeholder:"请输入密码",value:"password"},{type:"input",label:"确认密码",placeholder:"请再次输入密码",value:"confirmPassword"}]),_=()=>{S(e).then(a=>{U.success(a.message||a),i(),m("refresh",!1)})},i=()=>{e.username="",e.nickname="",m("closeModal",!1)},v=a=>{},h=a=>{};return(a,t)=>{const b=o("a-input"),k=o("a-form-item"),w=o("a-form"),y=o("a-modal");return r(),p(y,{visible:s.visible,title:s.title,onOk:_,onCancel:i},{default:c(()=>[f(w,{model:l(e),name:"basic","label-col":{span:6},"wrapper-col":{span:14},autocomplete:"off",onFinish:v,onFinishFailed:h},{default:c(()=>[(r(!0),x(N,null,B(l(d),(n,g)=>(r(),p(k,{key:g,label:n.label,name:n.value},{default:c(()=>[f(b,{value:l(e)[`${n.value}`],"onUpdate:value":O=>l(e)[`${n.value}`]=O},null,8,["value","onUpdate:value"])]),_:2},1032,["label","name"]))),128))]),_:1},8,["model"])]),_:1},8,["visible","title"])}}});export{L as _};
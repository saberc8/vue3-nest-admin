import{d as g,a as p,o as i,k,w as e,e as t,l as n,b as l,t as a,c as b,H as x,G as j}from"./index-7b1c4b91.js";const w=l("blockquote",null,"后端部署",-1),q=l("blockquote",null,"前端部署",-1),V=g({__name:"index",setup(C){const r={title:"运行环境",frontend:{title:"前端环境",content:`nodejs 16.17.0
pnpm 7.11`},backend:{title:"后端环境",content:`nestjs 9.1.3
nodejs 16.17.0
pnpm 7.11
mysql v5.7+
pm2 5.2.2(服务端部署)`}},m=[{name:"nestjs文档",url:"https://www.nestjs.com.cn/"},{name:"vue3文档",url:"https://v3.cn.vuejs.org/"},{name:"ant-design-vue文档",url:"https://www.antdv.com/components/overview-cn"},{name:"vben",url:"https://doc.vvbin.cn"}],f=`本介绍基于阿里云linux服务器, Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-169-generic x86_64)
  
scp -r 项目目录 root@服务器ip:/root/项目名
ssh root@服务器ip, 输入密码
  
新建mysql数据库，命名为application.prod.yml里面的datasource.datebase字段名
  
cd 项目名
pnpm install
pnpm run build
cp .application.prod.yml ./dist
pm2 start main.js
  
nginx配置location ^~/nest/{proxy_pass http://127.0.0.1:2023/;}
  
此时就可以域名访问了, 可以通过访问配置域名+/docs查看接口文档来验证是否成功`,y=`
本地修改env.production里面的VITE_APP_API_URL为后端域名, 打包部署
  
scp -r 项目目录 root@服务器ip:/root/前端项目域名文件夹
  
访问域名即可
  `;return(B,L)=>{const s=p("a-typography-title"),c=p("a-typography-text"),o=p("a-typography-paragraph"),d=p("a-typography-link"),u=p("a-divider"),h=p("a-typography"),v=p("a-card");return i(),k(v,null,{default:e(()=>[t(h,null,{default:e(()=>[t(s,null,{default:e(()=>[n("介绍")]),_:1}),t(o,null,{default:e(()=>[n(" 这是一个"),t(c,{mark:""},{default:e(()=>[n(" vue3 + nestjs")]),_:1}),n(" 的一个后台管理系统，继承了鉴权，权限管理，接口黑白名单，前后端部署教程等，适合前端学后端入门学习，快速部署开发上线，同时仓库也有移动端的快速启动模板，最终的目标是开发一套能够快速上产线需求的通用开发模板。 ")]),_:1}),t(s,{level:3},{default:e(()=>[n("项目介绍")]),_:1}),t(o,null,{default:e(()=>[n(" 项目基于我改造后的 "),t(c,{code:""},{default:e(()=>[n("vben(优化启动速度/升级vite/精简代码/基于vxe-table的表格封装等)")]),_:1}),n(" 和 "),t(c,{code:""},{default:e(()=>[n("nestjs")]),_:1}),n(" ） ")]),_:1}),t(o,null,{default:e(()=>[l("ul",null,[l("li",null,[t(d,{href:""},{default:e(()=>[n(a(r.title),1)]),_:1})])])]),_:1}),t(o,null,{default:e(()=>[l("blockquote",null,a(r.frontend.title),1),l("pre",null,a(r.frontend.content),1)]),_:1}),t(o,null,{default:e(()=>[l("blockquote",null,a(r.backend.title),1),l("pre",null,a(r.backend.content),1)]),_:1}),t(u),t(s,{level:3},{default:e(()=>[n("部署")]),_:1}),t(o,null,{default:e(()=>[w,l("pre",null,a(f))]),_:1}),t(o,null,{default:e(()=>[q,l("pre",null,a(y))]),_:1})]),_:1}),t(u),t(s,{level:3},{default:e(()=>[n("相关文档")]),_:1}),t(o,null,{default:e(()=>[l("ul",null,[(i(),b(j,null,x(m,_=>l("li",{key:_.name},[t(d,{href:_.url},{default:e(()=>[n(a(_.name),1)]),_:2},1032,["href"])])),64))])]),_:1}),t(u)]),_:1})}}});export{V as default};

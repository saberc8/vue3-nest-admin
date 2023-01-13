## 基于 vue3+nestjs 实现的 rbac 后台管理系统

这是一个 vue3 + nestjs 的一个后台管理系统，继承了鉴权，权限管理，接口黑白名单，前后端部署教程等，适合前端学后端入门学习，快速部署开发上线，同时仓库也有移动端的快速启动模板，最终的目标是开发一套能够快速上产线需求的通用开发模板。

### 项目运行

cd server  
pnpm i  
pnpm run start:dev

cd web  
pnpm i  
pnpm run dev
#### 项目介绍

项目基于我改造后的 vben(优化启动速度/升级 vite/精简代码/基于 vxe-table 的表格封装等)和 nestjs

const envContent = {
title: '运行环境',
frontend: {
title: '前端环境',
content: 'nodejs 16.17.0pnpm 7.11',
},
backend: {
title: '后端环境',
content: 'nestjs 9.1.3nodejs 16.17.0pnpm 7.11mysql v5.7+pm2 5.2.2(服务端部署)',
},
}

#### 部署

后端部署

前端部署

#### 相关文档

const envContent = {
title: '运行环境',
frontend: {
title: '前端环境',
content: 'nodejs 16.17.0pnpm 7.11',
},
backend: {
title: '后端环境',
content: 'nestjs 9.1.3nodejs 16.17.0pnpm 7.11mysql v5.7+pm2 5.2.2(服务端部署)',
},
}
const docs = [
{
name: 'nestjs 文档',
url: 'https://www.nestjs.com.cn/',
},
{
name: 'vue3 文档',
url: 'https://v3.cn.vuejs.org/',
},
{
name: 'ant-design-vue 文档',
url: 'https://www.antdv.com/components/overview-cn',
},
{
name: 'vben',
url: 'https://doc.vvbin.cn',
},
]
本介绍基于阿里云linux服务器, Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-169-generic x86_64)
scp -r 项目目录 root@服务器ip:/root/项目名ssh root@服务器ip, 输入密码
新建mysql数据库，命名为application.prod.yml里面的datasource.datebase字段名
cd 项目名pnpm install pnpm run build cp .\application.prod.yml ./distpm2 start main.js
nginx配置location ^~/nest/{proxy_pass http://127.0.0.1:2023/;}
此时就可以域名访问了, 可以通过访问配置域名+/docs查看接口文档来验证是否成功`
const preContentFront = `本地修改env.production里面的VITE_APP_API_URL为后端域名, 打包部署
scp -r 项目目录 root@服务器ip:/root/前端项目域名文件夹
访问域名即可


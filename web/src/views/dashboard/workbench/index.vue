<template>
  <a-card>
    <a-typography>
      <a-typography-title>介绍</a-typography-title>
      <a-typography-paragraph>
        这是一个<a-typography-text mark> vue3 + nestjs</a-typography-text>
        的一个后台管理系统，继承了鉴权，权限管理，接口黑白名单，前后端部署教程等，适合前端学后端入门学习，快速部署开发上线，同时仓库也有移动端的快速启动模板，最终的目标是开发一套能够快速上产线需求的通用开发模板。
      </a-typography-paragraph>
      <a-typography-title :level="3">项目介绍</a-typography-title>
      <a-typography-paragraph>
        项目基于我改造后的
        <a-typography-text code
          >vben(优化启动速度/升级vite/精简代码/基于vxe-table的表格封装等)</a-typography-text
        >
        和
        <a-typography-text code>nestjs</a-typography-text>
        ）
      </a-typography-paragraph>

      <a-typography-paragraph>
        <ul>
          <li>
            <a-typography-link href="">{{ envContent.title }}</a-typography-link>
          </li>
        </ul>
      </a-typography-paragraph>

      <a-typography-paragraph>
        <blockquote>{{ envContent.frontend.title }}</blockquote>
        <pre>{{ envContent.frontend.content }}</pre>
      </a-typography-paragraph>

      <a-typography-paragraph>
        <blockquote>{{ envContent.backend.title }}</blockquote>
        <pre>{{ envContent.backend.content }}</pre>
      </a-typography-paragraph>
      <a-divider />

      <a-typography-title :level="3">部署</a-typography-title>
      <a-typography-paragraph>
        <blockquote>后端部署</blockquote>
        <pre>{{ preContentBack }}</pre>
      </a-typography-paragraph>
      <a-typography-paragraph>
        <blockquote>前端部署</blockquote>
        <pre>{{ preContentFront }}</pre>
      </a-typography-paragraph>
    </a-typography>
    <a-divider />
    <a-typography-title :level="3">相关文档</a-typography-title>
    <a-typography-paragraph>
      <ul>
        <li v-for="item in docs" :key="item.name">
          <a-typography-link :href="item.url">{{ item.name }}</a-typography-link>
        </li>
      </ul>
    </a-typography-paragraph>
    <a-divider />
  </a-card>
</template>
<script lang="ts" setup>
  const envContent = {
    title: '运行环境',
    frontend: {
      title: '前端环境',
      content: 'nodejs 16.17.0\npnpm 7.11',
    },
    backend: {
      title: '后端环境',
      content: 'nestjs 9.1.3\nnodejs 16.17.0\npnpm 7.11\nmysql v5.7+\npm2 5.2.2(服务端部署)',
    },
  }

  const docs = [
    {
      name: 'nestjs文档',
      url: 'https://www.nestjs.com.cn/',
    },
    {
      name: 'vue3文档',
      url: 'https://v3.cn.vuejs.org/',
    },
    {
      name: 'ant-design-vue文档',
      url: 'https://www.antdv.com/components/overview-cn',
    },
    {
      name: 'vben',
      url: 'https://doc.vvbin.cn',
    },
  ]
  const preContentBack = `本介绍基于阿里云linux服务器, Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-169-generic x86_64)
  \nscp -r 项目目录 root@服务器ip:/root/项目名\nssh root@服务器ip, 输入密码
  \n新建mysql数据库，命名为application.prod.yml里面的datasource.datebase字段名
  \ncd 项目名\npnpm install\npnpm run build\ncp .\application.prod.yml ./dist\npm2 start main.js
  \nnginx配置location ^~/nest/{proxy_pass http://127.0.0.1:2023/;}
  \n此时就可以域名访问了, 可以通过访问配置域名+/docs查看接口文档来验证是否成功`

  const preContentFront = `\n本地修改env.production里面的VITE_APP_API_URL为后端域名, 打包部署
  \nscp -r 项目目录 root@服务器ip:/root/前端项目域名文件夹
  \n访问域名即可
  `
</script>

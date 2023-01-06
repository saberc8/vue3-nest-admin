<template>
  <a-card>
    <a-typography>
      <a-typography-title>介绍</a-typography-title>
      <a-typography-paragraph>
        这是一个<a-typography-text mark> vue3 + nestjs</a-typography-text>
        的一个后台管理系统，继承了鉴权，权限管理，接口黑白名单，前后端部署教程等，适合前端学后端入门学习，快速部署开发上线，同时仓库也有移动端的快速启动模板，最终的目标是开发一套能够快速上产线需求的通用开发模板。
      </a-typography-paragraph>
      <a-typography-title :level="2">项目简介</a-typography-title>
      <a-typography-paragraph>
        项目基于
        <a-typography-text code>vben</a-typography-text>
        和
        <a-typography-text code>nestjs</a-typography-text>
        ）
      </a-typography-paragraph>

      <a-typography-paragraph>
        <ul>
          <li>
            <a-typography-link href="/docs/resources-cn">部署</a-typography-link>
          </li>
        </ul>
      </a-typography-paragraph>
      <a-divider />

      <a-typography-paragraph>
        <blockquote>{{ blockContent }}</blockquote>
        <pre>{{ preContent }}</pre>
      </a-typography-paragraph>
    </a-typography>
  </a-card>
</template>
<script lang="ts" setup>
  const blockContent = `本介绍基于阿里云服务器，如果你有自己的服务器，可以自行修改配置文件，如果你没有服务器，可以使用阿里云的免费服务器，具体教程可以参考：https://www.aliyun.com`
  const preContent = `scp -r dist root@服务器ip:/root/项目名`
</script>

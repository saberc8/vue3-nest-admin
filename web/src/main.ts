import 'virtual:svg-icons-register'
import App from './App.vue'
import { createApp } from 'vue'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@/store'
import { setupGlobDirectives } from '@/directives'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
import {
  // 全局对象
  VXETable,

  // 表格功能
  // Filter,
  // Edit,
  // Menu,
  // Export,
  // Keyboard,
  // Validator,

  // 可选组件
  Icon,
  Column,
  // Colgroup,
  Grid,
  // Tooltip,
  Toolbar,
  // Pager,
  // Form,
  // FormItem,
  // FormGather,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Switch,
  // Input,
  // Select,
  // Optgroup,
  // Option,
  // Textarea,
  // Button,
  // Modal,
  // List,
  // Pulldown,

  // 表格
  Table,
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
})

async function bootstrap() {
  const app = createApp(App)
  app.use(Antd)
  // 引入vxe-table
  // app.use(VXETable)
  //可选组件
  app
    .use(Icon)
    .use(Column)
    // .use(Colgroup)
    .use(Grid)
    // .use(Tooltip)
    .use(Toolbar)
    // .use(Pager)
    // .use(Form)
    // .use(FormItem)
    // .use(FormGather)
    // .use(Checkbox)
    // .use(CheckboxGroup)
    // .use(Radio)
    // .use(RadioGroup)
    // .use(RadioButton)
    // .use(Switch)
    // .use(Input)
    // .use(Select)
    // .use(Optgroup)
    // .use(Option)
    // .use(Textarea)
    // .use(Button)
    // .use(Modal)
    // .use(List)
    // .use(Pulldown)

    // 安装表格
    .use(Table)
  // Configure store
  // 配置 store
  setupStore(app)
  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore()

  // Configure routing
  // 配置路由
  setupRouter(app)

  // router-guard
  // 路由守卫
  setupRouterGuard(router)

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app)
  // Configure global error handling

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app')
}

bootstrap()

import type { App } from 'vue'
import { Input, Layout, Button } from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout)
}

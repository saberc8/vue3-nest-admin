export interface MenuState {
  // 默认选中的列表
  defaultSelectedKeys: string[]
  // 展开数组
  openKeys: string[]
  // 当前选中的菜单项 key 数组
  selectedKeys: string[]
}

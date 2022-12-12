## ProTable 封装使用

### 思路

将 columns 和 searchForm 分开，因为实际上有时候需要混合字段搜索，并不是一一对应的 table，分开后也清晰一点。

// 配置项 | 参数 | 说明 | 类型 | 默认值 | | --- | --- | --- | --- | | columns | 表格列的配置描述，具体项见下表 | Array<ColumnProps> | - | | searchForm | 搜索表单的配置描述，具体项见下表 | Array<SearchFormProps> | - |

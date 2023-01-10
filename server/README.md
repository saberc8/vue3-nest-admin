rbac服务端
### 目录
Server  
├─ README.md  
├─ src  
│  ├── api  
│  │   ├──── menu  
│  │   ├──── role  
│  │   ├──── user  
│  │   ├──── menu  
│  │   ├──── menu  
│  ├── enums  
│  ├── fliters  
│  ├── guard  
│  ├── interceptors  
│  ├── pipe  
│  ├── shared  
│  ├── utils  
│  ├── validators  

### 主要功能
角色管理
菜单管理
api管理


### 文档相关地址
[DTO/entity](https://zhuanlan.zhihu.com/p/296492029)

[实体装饰器](https://www.bookstack.cn/read/TypeORM-0.2.20-zh/spilt.1.decorator-reference.md)

#### tips
nest g resource [接口前缀名] [所在目录]  
nest g resource interface api  
nest g resource role api --no-spec  
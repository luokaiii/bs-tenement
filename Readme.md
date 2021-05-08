## 一、项目界面及功能

### 登录流程

包含用户注册、登录、找回密码等功能，区分前台用户与后台管理员。并预留一个超级管理员。

![login.png](https://i.loli.net/2021/05/08/HJ7q8feax1lPZER.png)

### 项目首页

包含轮播广告、按二手房、整租房等分类展示，进入分类的入口及发布入口。

![home.png](https://i.loli.net/2021/05/08/qAb2jCdRNnDUWFu.png)

### 分类详情页

能够按各种类型区分、名称小区模糊搜索、价格面积排序、分页加载等功能。

![tags.png](https://i.loli.net/2021/05/08/9mnOhLtxJz8C5Sk.png)

### 商品详情页

包含商品详细信息、相关推荐、地址地图等功能。

![details.png](https://i.loli.net/2021/05/08/T5Lf4NDn8cQSx3p.png)

### 后台管理

后台管理需要具有超级管理员或管理员权限。包含二手房、出租房、用户、后台账户管理等功能。

![back.png](https://i.loli.net/2021/05/08/8Hx7GYqWLb2PjQV.png)

## 二、项目部署

本系统分前后两端，分别位于 `frontend(前端)` 与 `backend(后端)` 目录下。

分别在前后端执行运行代码：

### 启动前端

```sh
# 安装依赖
npm intall
# 启动项目
npm run start
```

### 启动后端

```sh
# 重新编译打包
mvn clean package
# 进入打包目录
cd target
# 运行jar包
java -jar tenement-api-1.0-SNAPSHOT.jar
```


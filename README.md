# sell-app

基于vue.js，仿饿了么外卖实战。

## 后台数据模拟

根目录下新增一个文件，命名为`data.json`，代码内容模拟后台数据，[data.json文件](https://github.com/luyaJ/sell-app/blob/master/sell/data.json)

基于vue2.0，在`webpack.dev.conf.js`中加入如下代码：
```js
// 在const portfinder = require('portfinder')下新增
// 使用 npm i express --save 安装express
const express = require('express');
const app = express();
const appData = require('../data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;
const apiRoutes = express.Router();
app.use('/api', apiRoutes);
```

找到`devServer`，并写入如下代码：
```js
before(app) {
  app.get('/api/seller', (req, res) => {
    res.json({
      errno: 0,
      data: seller
    });
    //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
  }),
  app.get('/api/goods', (req, res) => {
    res.json({
      errno: 0,
      data: goods
    });
  }),
  app.get('/api/ratings', (req, res) => {
    res.json({
      errno: 0,
      data: ratings
    });
  })
}
```

使用`localhost:8080/api/seller`查看json数据。
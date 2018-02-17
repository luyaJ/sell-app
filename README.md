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

## 安装使用stylus-loader

```
npm i stylus --save
npm i stylus-loader --save
```

## 页面布局

分为头部和内容区域，头部使用组件：
```bash
<template>
  <div id="app">
    <v-header></v-header>
  </div>
</template>

<script>
import header from './components/header/header';
export default {
  components: {
    'v-header': header
  }
};
</script>
```

内容区域使用`flex`布局三等分，style部分如下：
```css
#app
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    .tab-item
      flex 1
      text-align center
```

使用`vue-router`创建单页应用：
```html
<div class="tab">
  <div class="tab-item active">
    <router-link to="/goods">商品</router-link>
  </div>
  <div class="tab-item">
    <router-link to="/ratings">评论</router-link>
  </div>
  <div class="tab-item">
    <router-link to="/seller">商家</router-link>
  </div>
</div>
<router-view></router-view>
```

在`main.js`引入：
```js
// import goods from '../src/components/goods/goods';
// 为了让自己写的更少，在webpack.base.conf.js中加入下面这行代码
'components': resolve(__dirname, '../src/components')

// 在main.js中可以简写为：
import goods from 'components/goods/goods';
```

## 设置被点击文字高亮

我们知道，点击的router-link，vue会自动给它增加`class: router-link-active`，为了写的更少，我们在`main.js`中配置：
```js
linkActiveClass: 'active'
```
这样我们在写样式时，直接用`.active`就可以了！
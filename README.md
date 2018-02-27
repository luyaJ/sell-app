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

## Sticky footers

概括如下:如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。具体介绍看这篇文章：[https://www.w3cplus.com/css3/css-secrets/sticky-footers.html](https://www.w3cplus.com/css3/css-secrets/sticky-footers.html)

## better-scroll

[better-scroll](https://github.com/ustbhuangyi/better-scroll) is a plugin which is aimed at solving scrolling circumstances on the mobile side (PC supported already). 

* 先安装：`npm i better-scroll --save`
* 引入：`import BScroll from 'better-scroll';`
* 在`menu-wrapper`中加入`ref="menuWrapper"`
```js
methods: {
  _initScroll() {
    this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
    this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
  }
}
```

## vue-migration-helper

CLI tool to aid in migration from Vue 1.x to 2.0. It scans files for Vue-specific code and provides detailed warnings when deprecated patterns are found. It cannot reliably catch every deprecation, but should get you 80% of the way there.

[vue-migration-helper](https://github.com/vuejs/vue-migration-helper)

这个工具可以很好的解决Vue 1.x to 2.0之间的问题，下面是我遇到的问题：
```js
1. Replace "vue-router": "^3.0.1" with "vue-router": "^2.0.0", then run: npm install
  Line 20: package.json
  Reason: If you are using pre-2.0
Vue Router through NPM, you have to update it in your package.json file
  More info: http://vuejs.org/guide/migration-vue-router.html#

2. Replace this.$dispatch('cart.add', event.target) to use a global event bus or vuex (see link below for implementation details)
  Line 34: src/components/cartcontrol/cartcontrol.vue
  Reason: $dispatch and $broadcast
have been removed because the pattern doesn't scale well
  More info: http://vuejs.org/guide/migration.html#dispatch-and-broadcast
```

我们可以看到，它很好的告诉了我们解决方案。

## 父子组件间的通信

在子组件`ratingselect.vue`中使用了`@click="select(2, $event)"`和`@click="toggleContent"`这两个点击事件。使用`vue.$emit`通知父组件。

```js
methods: {
  select(type, event) {
    if (!event._constructed) {
      return;
    }
    // 通知父组件
    this.$emit('select', type);
  },
  toggleContent(event) {
    if (!event._constructed) {
      return;
    }
    this.image = !this.image;
    this.$emit('toggle');
  }
},
```

在父组件中我们使用这样的方式绑定：
```html
<ratingselect @select="selectRating" @toggle="toggleContent"></ratingselect>
```

```js
selectRating(type) {
  this.selectType = type;
  this.$nextTick(() => {
    this.scroll.refresh();
  });
},
toggleContent() {
  this.onlyContent = !this.onlyContent;
  this.image = !this.image;
  this.$nextTick(() => {
    this.scroll.refresh();
  });
}
```

这样就实现了父子组件间的通信。
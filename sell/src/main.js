import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import App from './App';
import goods from '../src/components/goods/goods';
import ratings from '../src/components/ratings/ratings';
import seller from '../src/components/seller/seller';

import '../src/common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

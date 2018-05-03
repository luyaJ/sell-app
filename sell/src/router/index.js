import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods'
import Sellers from '../components/sellers/sellers'
import Comments from '../components/comments/comments'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Goods,
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/sellers',
      component: Sellers,
    },
    {
      path: '/comments',
      component: Comments
    }
  ]
})

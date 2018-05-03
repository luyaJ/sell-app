<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comments">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import vHeader from './components/header/header'

export default {
  components: {
    vHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  created() {
    this.$axios.get('static/data.json')
      .then(res => {
        this.seller = res.data.seller
      })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin'

#app
  .tab
    display flex
    height 40px
    line-height 40px
    width 100%
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      a
        display block
        font-size 14px
        color rgb(77, 85, 93)
      .router-link-active
        display block
        color rgb(240, 20, 20)
</style>

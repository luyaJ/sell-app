<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-del" v-show="food.count>0" @click.stop.prevent="delfood">
        <span class="iconfont iconfont_del">&#xe74b;</span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addfood">
      <span class="iconfont iconfont_add">&#xe621;</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    // 增加删除是都需要关联 一种食物 所以传一个food(从goods中传过来的)
    food: {
      type: Object
    }
  },
  methods: {
    addfood(event) {
      if (!event._constructed) {  // PC端
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)  // 添加属性
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)  // 事件监听
    },
    delfood(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  .cart-del
    display inline-block
    padding 6px
    transition all 0.4s linear
    &.move-enter-active
      opacity 1
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      opacity 0
      transform translate3d(20px, 0, 0)
  .cart-count
    display inline-block
    font-size 12px
    vertical-align top
    width 10px
    padding-top 3px
    line-height 24px
    text-align center
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    padding 6px
</style>

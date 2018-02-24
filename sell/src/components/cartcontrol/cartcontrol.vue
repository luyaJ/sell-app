<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <img src="./del.png" alt="del" height="24px" width="24px">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <img src="./add.png" alt="addicon" width="24px" height="24px">
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) { // pc端
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1); // 添加属性
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylysheet/stylus">
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    transition all 0.4s linear
    &.move-transition
      opacity 1
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      opacity 0
      transform translate3d(24px, 0, 0)
  .cart-count
    display inline-block
    font-size 10px
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    padding 6px
</style>

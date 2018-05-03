<template>
  <div class="shopcart">
    <div class="content">
      <div class="left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="iconfont iconfont_cart" :class="{'highlight':totalCount>0}">&#xe664;</span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
        <!-- 在goods这个组件中的 <shopcart> 中传入deliveryPrice和minPrice -->
        <!-- 还需在App的 router-view中传入 seller -->
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="right">
        <div class="pay" :class="payClass">{{payDescription}}</div>
      </div>
    </div>
    <!-- 购物车 动态 小球 -->
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="dropball">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      balls: [
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        }
      ],
      dropBalls: []
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    payDescription() {
      if(this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if(this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元`
      } else {
        return `去结算`
      }
    },
    payClass() {
      if(this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    // 小球 transition 动画
    beforeDrop(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // Element.getBoundingClientRect() 返回元素的大小及其相对于视口的位置
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top -22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `transform3d(${x}px, 0, 0)`
          inner.style.t
          ransform = `transform3d(${x}px, 0, 0)`
        }
      }
    },
    dropping(el, done) {

    },
    afterDrop(el) {

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  position fixed
  z-index 50
  left 0
  bottom 0
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255, 255, 255, 0.4)
    .left
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          text-align center
          background #2b343c
          border-radius 50%
          &.highlight
            background rgb(10, 160, 220)
          .iconfont_cart
            display inline-block
            margin 8px 7px
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        line-height 24px
        margin-top 12px
        padding-right 12px
        box-sizing border-box
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 16px
        font-weight 700
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align top
        line-height 24px
        margin 12px 0 0 12px
        font-size 10px
    .right
      flex 0 0 105px
      width 105px
      .pay
        font-size 12px
        line-height 48px
        height 48px
        text-align center
        font-weight 700
        background #2b333b
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      transition all 0.4s
      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
        transition all 0.4s linear
</style>

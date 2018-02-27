<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="food">
          <div class="back" @click="hide">
            <img src="./left_arrow.png" alt="back">
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px" :key="rating.name">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" height="12px" width="12px">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <img :src="(rating.rateType!==0)? require('./bad.png') :require('./good.png')" height="12px" width="12px">{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';

const ALL = 2;

export default {
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      image: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    // 父子间通信
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
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import'../../common/stylus/mixin';
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 30
  width 100%
  background #fff
  transition all .2s linear
  &.move-enter
    transform translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transform translate3d(100%, 0, 0)
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%  // 相对于宽度的100%，它会是的高度和宽度相等
    img
      position absolute
      top 0
      left 0
      height 100%
      width 100%
    .back
      position absolute
      top 10px
      left 10px
      img
        height 24px
        width 24px
  .content
    position relative
    padding 18px
    .title
      color rgb(7, 17, 27)
      line-height 17px
      margin-bottom 8px
      font-size 14px
      font-weight 700
    .detail
      margin-bottom 18px
      line-height 10px
      font-size 0
      height 10px
      .sell-count,.rating
        font-size 10px
        color rgb(147, 153, 159)
      .sell-count
        margin-right 12px
    .price
      font-weight 700
      line-height 24px
      .now-price
        margin-right 8px
        font-size 14px
        color rgb(240, 20, 20)
      .old-price
        text-decoration line-through
        font-size 10px
        color rgb(147, 153, 159)
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      background rgb(0, 160, 220)
      color #fff
      height: 24px
      line-height: 24px
      padding 0 12px
      border-radius: 12px
      font-size: 10px
  .info
    padding 18px
    .title
      line-height 14px
      margin-bottom 6px
      font-size 14px
      color rgb(7, 17, 27)
    .text
      color rgb(77, 85, 93)
      line-height 24px
      padding 0 8px
      font-size 12px
  .rating
    padding-top 18px
    .title
      margin-left 18px
      font-size 14px
      color rgb(7, 17, 27)
    .rating-wrapper
      padding 0 18px
      .rating-item
        position relative
        padding 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position absolute
          right 0
          top 16px
          font-size 0
          line-height 12px
          .name
            display inline-block
            margin-right 6px
            font-size 10px
            color rgb(147, 153, 159)
          .avatar
            border-radius 50%
        .time
          margin-bottom 6px
          line-height 12px
          font-size 12px
          color rgb(147, 153, 159)
        .text
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
          img
            margin-right 4px
      .no-rating
        padding 16px 0
        font-size 12px
        color rgb(147, 153, 159)
</style>

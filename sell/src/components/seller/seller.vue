<template>
  <div class="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <div @click="favoriteClick">
            <img :src="favorite ? require('./favorite.png') :require('./no_favorite.png')">
          </div>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos" :key="info">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star';
import split from '../split/split';
import BScroll from 'better-scroll';
import {saveToLocal, loadFromLocal} from '../../common/js/store';

export default {
  components: {
    star,
    split
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '未收藏';
    }
  },
  watch: {
    'seller'() {
      this._initScroll();
      this._initPicList();
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerWrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    // 横向轮播
    _initPicList() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    favoriteClick() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    }
  },
  mounted() {
    this._initScroll();
    this._initPicList();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

.seller
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .overview
    position relative
    padding 18px
    .title
      color rgb(7, 17, 27)
      margin-bottom 8px
      font-size 14px
      line-height 14px
    .desc
      padding-bottom 18px
      font-size 0
      border-1px(rgba(7, 17, 27, 0.1))
      .star
        display inline-block
        margin-right 8px
        vertical-align top
      .text
        display inline-block
        margin-right 12px
        font-size 10px
        color rgb(77, 85, 93)
        vertical-align top
        line-height 18px
    .remark
      display flex
      padding-top 18px
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border none
        h2
          margin-bottom 4px
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
        .content
          font-size 10px
          .stress
            font-size 24px
            color rgb(7, 17, 27)
            line-height 24px
    .favorite
      position absolute
      right 18px
      top 18px
      text-align center
      .text
        color rgb(77, 85, 93)
        line-height 10px
        font-size 10px
        margin-top 4px
  .bulletin
    padding 18px 18px 0 18px
    .title
      color rgb(7, 17, 27)
      margin-bottom 8px
      font-size 14px
      line-height 14px
    .content-wrapper
      padding 0 12px 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))
      .content
        line-height 24px
        font-size 12px
        color rgb(240, 20, 20)
    .supports
      .support-item
        padding 16px 12px
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border none
        .icon
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image("decrease_4")
          &.discount
            bg-image("discount_4")
          &.guarantee
            bg-image("guarantee_4")
          &.invoice
            bg-image("invoice_4")
          &.special
            bg-image("special_4")
        .text
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
  .pics
    padding 18px
    .title
      color rgb(7, 17, 27)
      margin-bottom 12px
      font-size 14px
      line-height 14px
    .pic-wrapper
      width 100%
      overflow hidden
      white-space nowrap
      .pic-list
        font-size 0
        .pic-item
          display inline-block
          margin-right 6px
          width 120px
          height 90px
  .info
    padding 18px 18px 0 18px
    color rgb(7, 17, 27)
    .title
      padding-bottom 12px
      font-size 14px
      line-height 14px
      border-1px(rgba(7, 17, 27, 0.1))
    .info-item
      padding 16px 0 16px 12px
      font-size 12px
      line-height 16px
      border-1px(rgba(7, 17, 27, 0.1))
</style>

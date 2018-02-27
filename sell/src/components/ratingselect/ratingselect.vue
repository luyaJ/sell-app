<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch">
      <img :src="image ? require('./check_false.png') : require('./check_true.png')" height="18px" width="18px">
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  data() {
    return {
      image: false
    };
  },
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
      // 使用这种方法！！！记住
      this.image = !this.image;
      this.$emit('toggle');
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
.ratingselect
  .rating-type
    padding 18px 0
    margin 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size 0
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      border-radius 1px
      color rgb(77, 85, 93)
      font-size 12px
      line-height 16px
      &.active
        color #fff
      .count
        font-size 8px
        margin-left 2px
      &.positive
        background rgba(0, 160, 220, 0.2)
        &.active
          background rgb(0, 160, 220)
      &.negative
        background rgba(77, 85, 93, 0.2)
        &.active
          background rgb(77, 85, 93)
  .switch
    padding 12px 18px
    line-height 24px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    color rgb(147, 153, 159)
    img
      display inline-block
      vertical-align top
      margin-right 4px
    .text
      font-size 12px
      display inline-block
      vertical-align top
</style>

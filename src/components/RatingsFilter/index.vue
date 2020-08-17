<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active: selectType===2}" @click="setSelectType(2, $event)">
        全部<span class="count">{{shopRatings.length}}</span>
      </span>
      <span class="block positive" :class="{active: selectType===0}" @click="setSelectType(0, $event)">
        推荐<span class="count">{{positiveLength}}</span>
      </span>
      <span class="block negative" :class="{active: selectType===1}" @click="setSelectType(1, $event)">
        吐槽<span class="count">{{shopRatings.length-positiveLength}}</span>
      </span>
    </div>

    <div class="switch" :class="{on: onlyContent}" @click="toggleOnlyContent">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      onlyContent: Boolean,
      shopRatings: Array,
      selectType: Number
    },

    computed: {
      ...mapGetters(['positiveLength'])
    },

    methods: {
      setSelectType (type) {
        // 触发事件
        this.$emit('setSelectType', type)
      },

      toggleOnlyContent () {
        // 触发事件
        this.$emit('toggleOnlyContent')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.ratingselect
  .rating-type
    padding: 16px 0
    margin: 0 18px
    border 1px(rgba(7, 17, 27, 0.1))
    font-size: 0
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      background: rgba(77, 85, 93, 0.2)
      &.active
        background: $blue
        color: #fff
      .count
        margin-left: 2px
        font-size: 8px
  .switch
    padding: 6px 18px
    line-height: 22px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    color: rgb(147, 153, 159)
    font-size: 0
    &.on
      .icon-check_circle
        color: $blue
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 20px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px
</style>

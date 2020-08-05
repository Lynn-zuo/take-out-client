<template>
  <div id="dialog" class="dialog_container">
    <section class="alert_container">
      <div class="alert_content">
        <div class="tip_icon">
          <i class="iconfont icon-warning"></i>
          <span class="title">提示信息</span>
        </div>
        <p class="tip_text">{{alertText}}</p>
      </div>
      <button class="confirm" @click="closeTip">确认</button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    alertText: String
  },
  methods: {
    closeTip () {
      // 分发自定义事件（事件名:closeTip）
      this.$emit('closeTip')
    }
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
.dialog_container
  position fixed
  z-index 9999
  left 50%
  top 50%
  width 239px
  height 145px
  transform translate(-50%, -50%)
  .alert_container
    background #FF9900
    width 100%
    height 100%
    overflow hidden
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px
    .alert_content
      height 68%
      background #FFFFCC
      text-align center
      padding-top 10px
      .tip_icon
        .icon-warning
          margin-right 8px
        .title
          font-size 1em
      .tip_text
        font-weight 300
        font-size 1.22em
        padding 20px 20px 20px 20px
    .confirm
      font-size 1em
      display block
      height 25px
      width 45px
      margin 3px auto
      background-color #FF9900
      border none
</style>

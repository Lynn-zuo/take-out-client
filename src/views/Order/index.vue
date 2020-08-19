<template>
<div class="order">
  <HeaderTop title="订单列表"/>
  <section class="order_no_login">
    <img src="./imgs/person.png">
    <h3>登录后查看外卖订单</h3>
    <button><router-link to="/login">立即登陆</router-link></button>
  </section>
</div>
</template>
<script>
import HeaderTop from '@/components/HeaderTop'
export default {
  name:'',
  components: {
    HeaderTop
  },
  data () {
    return { }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.order  //订单
  width 100%
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center
    >img
      display block
      width 100%
      height 30%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    > button
      display inline-block
      background #3399FF
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
      > a
        color #fff
</style>

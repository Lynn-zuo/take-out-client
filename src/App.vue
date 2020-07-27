<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from '@/components/FooterGuide'
// import {reqAddress, reqFoodCategorys} from '@/api'
export default {
  name: 'App',
  mounted () {
    this.getAddress()  // vuex状态全局可见，尽早获取
    this.getUserInfo() // 异步获取用户信息
    // this.$store.dispatch('getAddress')
    // 不使用store状态管理，直接调用函数
    // const result_addr = await reqAddress('40.10038,116.36867')
    // console.log(result_addr)
    // async + mounted
    // const result_category = await reqFoodCategorys()
    // console.log(result_category)
    // reqFoodCategorys().then(response => {
    //   console.log(response)
    // })
  },
  methods: {
    // 用映射函数
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>

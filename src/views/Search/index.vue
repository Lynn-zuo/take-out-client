<template>
  <div class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input type="search" name="search" v-model="keyword" placeholder="请输入商家或美食名称" class="search_input">
      <input type="submit" name="submit" class="search_submit">
    </form>

    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!-- :to="'/shop?id=' + item.id" -->
        <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" class="list_li"
          v-for="item in searchShops" :key="item.id">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p><span>{{item.name}}</span></p>
              <p>月售{{item.month_sales || item.recent_order_num}}单</p>
              <p>{{item.delivery_fee || item.float_minimum_order_amount}}￥起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
import HeaderTop from '@/components/HeaderTop'
export default {
  name:'',
  components: {
    HeaderTop
  },
  data () {
    return {
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      keyword: '',
      noSearchShops: false
    }
  },
  computed: {
    ...mapState(['searchShops'])
  },
  methods: {
    search () {
      // 得到搜索关键字
      const keyword = this.keyword.trim()
      // 进行搜索
      if(keyword) {
        this.$store.dispatch('getSearchShops', keyword)
      }
    },
    _initScroll () {
      new BScroll('.list', {
        click: true
      })
      console.log('gundong')
    }
  },
  mounted() {
    this._initScroll()
  },
  watch: {
    searchShops(value) {
      if(!value.length) {
        this.noSearchShops = true
      } else { // 有数据
        this.noSearchShops = false
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.search  //搜索
  width 100%
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #3399FF
        font-size 16px
        color #fff
        background-color #3399FF
  
  .list
    position: absolute
    top: 70px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .list_container
      margin-top 5px
      .list_li
        height 80px
        display flex
        flex-direction raw
        padding 6px 10px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .item_left
          flex 1
          .restaurant_img
            width 80px
            height 80px
        .item_right
          flex 2
          .item_right_text
            padding-top 2px
            color #666
            p
              margin 7px
            p:not(:first-child)
              font-size 11px
</style>

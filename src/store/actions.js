/*
通过mutations间接更新state的多个方法的对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShops
} from '@/api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步AJAX请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if(result.code == 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类列表
  async getCategorys ({commit}) {
    // 发送异步AJAX请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if(result.code == 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发送异步AJAX请求
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    // 提交一个mutation
    if(result.code == 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步保存用户信息
  savaUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result_userInfo = await reqUserInfo()
    if(result_userInfo.code === 0){
      const userInfo = result_userInfo.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步退出登录
  async getLogout ({commit}) {
    const result_userInfo = await reqLogout()
    if(result_userInfo.code === 0){
      commit(RESET_USER_INFO)
    }
  },


  // mockjs---data.json
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result_shopInfo = await reqShopInfo()
    if(result_shopInfo.code === 0){
      const shopInfo = result_shopInfo.data // 和state中保持一致
      commit(RECEIVE_SHOP_INFO, {shopInfo})

      // cb && cb()
    }
  },
  // 异步获取商家评价列表
  async getShopRatings ({commit}, callback) {
    const result_shopRatings = await reqShopRatings()
    if(result_shopRatings.code === 0){
      const shopRatings = result_shopRatings.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})

      // 如果组件中传递了接收消息的回调函数，数据更新后，调用回调通知调用的组件
      callback && callback()
    }
  },
  // 异步获取商家商品数组
  async getShopGoods ({commit}, callback) {
    const result_shopGoods = await reqShopGoods()
    if(result_shopGoods.code === 0){
      const shopGoods = result_shopGoods.data
      commit(RECEIVE_SHOP_GOODS, {shopGoods})

      // 如果组件中传递了接收消息的回调函数，数据更新后，调用回调通知调用的组件
      callback && callback()
    }
  },
  // 同步更新food中的count值
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },
  // 异步获取搜索的商家商品列表
  async getSearchShops ({commit, state}, keyword) {
    // 发送异步AJAX请求
    const geohash = state.latitude + ',' + state.longitude
    const result_searchShops = await reqSearchShops(geohash, keyword)
    if(result_searchShops.code === 0){
      const searchShops = result_searchShops.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
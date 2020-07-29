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
  RECEIVE_SHOP_INFO
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods
} from '@/api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步AJAX请求
    const geoash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geoash)
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
  async getShopRatings ({commit}) {
    const result_shopRatings = await reqShopRatings()
    if(result_shopRatings.code === 0){
      const shopRatings = result_shopRatings.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})

      // cb && cb()
    }
  },
  // 异步获取商家商品数组
  async getShopGoods ({commit}) {
    const result_shopGoods = await reqShopGoods()
    if(result_shopGoods.code === 0){
      const shopGoods = result_shopGoods.data
      commit(RECEIVE_SHOP_GOODS, {shopGoods})

      // 如果组件中传递了接收消息的回调函数，数据更新后，调用回调通知调用的组件
      // cb && cb()
    }
  }
}
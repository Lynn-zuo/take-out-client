/*
包含N个接口请求函数的模块
函数返回的值：promise对象
*/
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
// const BASE_URL = 'http://140.143.133.253:4000'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(BASE_URL+`/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+`/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(`${BASE_URL}/shops`, {longitude, latitude}) // 参数是对象格式
// // 4、获取一次性验证码
// export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
// 5、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+`/login_pwd`, {name, pwd, captcha}, 'POST')
// 6、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+`/sendcode`, {phone})
// 7、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+`/login_sms`, {phone, code}, 'POST')
// 8、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+`/userinfo`)
// 9、用户登出
export const reqLogout = () => ajax(BASE_URL+`/logout`)
// 10、自动登录
export const reqAutoLogin = () => ajax(BASE_URL+`/auto_login`)
// 11、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})

// mockjs---data.json
// 1. 获取商家信息
export const reqShopInfo = () => ajax(`/shop_info`)
// 2. 获取商家评价数组
export const reqShopRatings = () => ajax(`/shop_ratings`)
// 3. 获取商家商品数组
export const reqShopGoods = () => ajax(`/shop_goods`)
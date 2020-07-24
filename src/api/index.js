/*
包含N个接口请求函数的模块
函数返回的值：promise对象
*/
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(BASE_URL+`/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodTypes = () => ajax(BASE_URL+`/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(`${BASE_URL}/shops`, {longitude, latitude}) // 参数是对象格式
// 4、根据经纬度和关键字搜索商铺列表
export const reqKeyShops = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
// 6、用户名密码登陆
export const reqLoginPwd = (name, pwd, captcha) => ajax(`${BASE_URL}/login_pwd`, {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqMsgCode = (phone) => ajax(`${BASE_URL}/sendcode`, {phone})
// 8、手机号验证码登陆
export const reqLoginCode = (phone, code) => ajax(`${BASE_URL}/login_sms`, {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
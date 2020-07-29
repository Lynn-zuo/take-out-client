/* 
使用mockjs提供mock数据接口 
*/
import Mock from 'mockjs'
import data from './data.json'


// 返回info的接口
Mock.mock('/shop_info', {code:0, data: data.shop_info})
// 返回goods的接口
Mock.mock('/shop_goods', {code:0, data: data.goods})
// 返回ratings的接口
Mock.mock('/shop_ratings', {code:0, data: data.ratings})

// export default ??? 不需要向外暴露任何数据，只要能保存能执行即可
// mockjs 浏览器或者是postman没办法测，拦截ajax请求，需要编码测试，定义接口请求函数

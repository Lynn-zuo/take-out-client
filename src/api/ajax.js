/*
ajax请求函数模块
1. 统一处理请求异常
2. 异步请求成功的数据不是response，而是：response.data 返回值：promise对象()
3. 配置请求超时的时间
4. 通过请求头携带token数据
*/
import axios from 'axios'

export default function ajax (url, data={}, type='GET') {
  return new Promise(function(resolve, reject){
    let promise
    // 执行异步ajax请求
    if (type === 'GET'){
        // 准备url query参数数据
      let dataStr = '' // 参数拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        dataStr = dataStr.substring(0, dataStr.lastindexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
        // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function(response){
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function(error){
      // 失败了调用reject()
      reject(error)
    })
  })
}
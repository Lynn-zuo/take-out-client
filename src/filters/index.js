/*
自定义过滤器模块
 */
// import moment from 'moment'
import format from 'date-fns/format'
import Vue from 'vue'

Vue.filter('date-format', function (value, formatStr) {
  // return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
  return format(value, formatStr || 'yyyy-mm-dd HH:mm:ss')
})

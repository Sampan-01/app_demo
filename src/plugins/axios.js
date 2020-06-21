/*
 * @Author: shihong.lei@advance.ai
 * @Date: 2019-07-24 16:47:06
 * @Last Modified by: shihong.lei@advance.ai
 * @Last Modified time: 2019-08-11 15:17:21
 */
import axios from 'axios'
import history from '@/lib/history'
import Promise from 'es6-promise'
// import loading from '@/utils/loading'
import { notification } from 'antd'
import * as Cookies from 'js-cookie'

Promise.polyfill()

// axios 配置
axios.defaults.timeout = 10000
// importedcarweb.muxiongit.com
// http: axios.defaults.baseURL = 'http://47.105.60.116:8002/api'
const loading = document.getElementById('ajaxLoading')

const requestInterceptor = config => {
  loading.style.display = 'block'
  // loading.show()
  // config.headers[ 'Access-Control-Allow-Credentials' ] = true
  config.headers[ 'Content-Type' ] = 'application/json;charset=utf-8'
  return config
}

const responseInterceptor = res => {
  setTimeout(() => {
    loading.style.display = 'none'
    // loading.hide()
  }, 300)
  const { data } = res
  if (data) {
    if (data.code === 403) {
      history.push('/login')
    } else if (parseInt(data.code) === 200) {
      if (data.message && data.message.length > 0) {
        notification.error({
          message: data.code,
          description: data.message,
          duration: 2
        })
      } else {
        notification.error({
          message: '提示',
          description: '服务器错误，请您稍后再试',
          duration: 2
        })
      }
    } else {
      notification.error({
        message: '提示',
        description: '服务器错误，请您稍后再试',
        duration: 2
      })
    }
  }
  console.log(res, '0987')
  return {
    code: data.code === 200 ? true : false,
    results: data.data,
    message: data.message
  }
}
// 200：请求成功
// 201：返回数据为空（多用于查询）
// 202：修改数据失败（修改数据）
// 203：新增数据失败（新增数据）
// 204：删除数据失败（删除数据）
// 404：地址丢失（一般用于请求停用的接口，访问路径出错）
// 405：请求方式出现错误（get/post）
// 415：参数类型错误（新增数据传递参数）
// 500：内部服务器错误（一般用于代码报错，但不影响之后的操作）
const errorInterceptor = err => {
  console.log(err, 'err')
  const { response } = err
  if (response) {
    const { status, data } = response
    notification.error({
      message: '提示',
      description: '服务器错误，请您稍后再试',
      duration: 2
    })
    if (data.code === 'IResponseCode.UNAUTHORIZED') {
      history.push('/login')
    }
  }
  setTimeout(() => {
    loading.style.display = 'none'
  }, 300)
  return Promise.reject(err)
}

axios.interceptors.request.use(requestInterceptor)

axios.interceptors.response.use(responseInterceptor, errorInterceptor)

export default axios

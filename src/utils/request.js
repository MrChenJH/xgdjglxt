import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  debugger
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
 debugger
 console.log(response);
    const res = response.data
    console.log(res);
    if (res.code !== 20000) { 
      if(res.code==20001)
      if(res.data.userName){
      Message({
        message: "用户名密码错误",
        type: 'error',
        duration: 5 * 1000
      })}else{

        Message({
          message: "没有查询信息",
          type: 'error',
          duration: 5 * 1000
        })
      }
      
     
      return Promise.reject('error')
    } else { 
      console.log(response.data);
      return response.data
    }
  },
  error => {

    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

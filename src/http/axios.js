//封装axios
import axios from "axios";
import router from "@/router/router";
import store from "@/store/index";
//import base from "@/config/env";
import base from "@/config/base"
import { Message } from "element-ui";

/**
 * 提示函数
 */
const tip = msg => {
  Message({
    message:msg
  })
}
/**
 * 跳转登录页
 * 携带当前页面的路由，在登录页完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path:'/login',
    query:{
      redirect: router.currentRoute.fullPath
    }
  })
}
/**
 * 请求失败后的错误统一处理
 */
const errorHandle = (status,other) => {
  //状态码判断
  switch (status) {
    case 401:
      toLogin();
      break;
    case 403:
      tip('登陆过期，请重新登录');
      localStorage.remoeItem('token');
      store.commit('loginSuccess',null);
      setTimeout(() => {
        toLogin();
      },1000);
      break;
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      tip(other)
  }
}
//创建axios实例
var instance = axios.create({ timeout: 50000 });
instance.defaults.baseURL = base.bd;
//设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//配置请求拦截器
instance.interceptors.request.use(
  (config) => {
    //config.headers.token = localStorage.getItem('token') || '';
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => Promise.reject(error))
//配置响应拦截器
instance.interceptors.response.use(
  //请求成功
  (res) => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  //请求失败
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status,response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      state.commit('network', false);
    }      
  })
export default instance;
// //封装get请求
// export function get(url, params = {}) {
//   params.t = new Date().getTime();    //get方法加一个时间参数,解决ie下可能缓存问题.
//   new Promise((resolve, reject) =>{
//     instance.get(url, {
//         params: params
//     }).then(res => {
//         resolve(res.data);
//     }).catch(err =>{
//         reject(err.data)
//     })
//   })
// }
// //封装post请求
// export function post(url, data = {}) { 
//   //默认配置 
//   // let sendObject={
//   //   url: url,
//   //   method: 'post',
//   //   headers: {
//   //     'Content-Type':'application/json;charset=UTF-8'       
//   //   },
//   //   data:data
//   // };
//   // sendObject.data=JSON.stringify(data);
//   // return instance(sendObject)
//   return new Promise((resolve, reject) => {
//     instance.post(url, QS.stringify(params))
//     .then(res => {
//       resolve(res.data);
//     })
//     .catch(err =>{
//       reject(err.data)
//     })
//   });
// }
// //封装put方法 (resfulAPI常用)
// export function put(url,data = {}){
//   return instance({
//     url: url,
//     method: 'put',
//     headers: {
//       'Content-Type':'application/json;charset=UTF-8'       
//     },
//     data:JSON.stringify(data)
//   }) 
// }
// //删除方法(resfulAPI常用)
// export function deletes(url){
//   return instance({
//     url: url,
//     method: 'delete',
//     headers: {}
//   }) 
// }
// export {
//   instance
// }
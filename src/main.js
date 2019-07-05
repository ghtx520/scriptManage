import Vue from 'vue'
import App from './App'
import router from '@/router/router'
import store from '@/store/index'
import axios from '@/http/axios'
import api from '@/http/api'                    //导入api接口
import base from '@/config/base'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  
import 'font-awesome/css/font-awesome.min.css'  //引入字体图库样式

import '../static/reset.css'     //引入重置样式,防止浏览器默认样式的影响
import '@/assets/css/style.css'  //引入公共样式

import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$api = api;    //将api挂载到原型上
Vue.prototype.$axios = axios;  //将axios挂载到原型上
Vue.prototype.$baseUrl = base.bd; //将公共的url头挂载到原型上

new Vue({
  el: '#app',
  router,
  store,
  /* components: { App },
  template: '<App/>' */
  render:h => h(App),
  /* created: function(){
    let isLogin = localStorage.getItem('role');
    if(!isLogin){
      return this.$router.push({path:'/login'})
    }
    //根据用户权限存菜单
    let userPath = '';
    //注入时拼接404处理路由
    console.log(this.$router)
    this.$router.addRoutes(userPath.cooncat([{
      path:'*',
      redirect:'/404'
    }]))
  } */
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import otherState from '@/store/modules/otherState'

Vue.use(Vuex)

const state = {
    sideNavStatus:false,       //左侧菜单栏伸缩状态
    network:true               //网络是否中断状态
};
const getters = {           //实时监听state值的变化(最新状态)
    newNavStatus(state) {   //方法名随意,主要是来承载变化的sideNavStatus的值
       return state.sideNavStatus
    }
};
const mutations = {
    showStatus(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.sideNavStatus = false;
    },
    hideStatus(state) {  //同上
        state.sideNavStatus = true;
    }
};
const actions = {
    showNavs(context) {  //自定义触发mutations里函数的方法，context与store实例具有相同方法和属性
        context.commit('showStatus');
    },
    hideNavs({ commit }) {  //同上注释
        commit('hideStatus');
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        user,
        otherState
   }
})
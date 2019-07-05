const state = {
    sideNavStatus: false,      //左侧菜单栏伸缩状态
    network:true               //网络是否中断状态
};
const getters = {
    /* newNavsStatus(state){         //实时监听state值的变化(最新状态)
        return state.sideNavsStatus
    }, */
    newNavStatus: state => state.sideNavStatus  //实时监听state值的变化(最新状态)
};
const mutations = {
    hideStatus(state) {  //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.sideNavStatus = true;
    },
    showStatus(state) {
        state.sideNavStatus = false;
    }
};
const actions = {      //自定义触发mutations里函数的方法，context与store实例具有相同方法和属性
    hideNavs(context){
        context.commit('hideStatus')
    },
    showNavs(context){
        context.commit('showStatus')
    }
}
export default {
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
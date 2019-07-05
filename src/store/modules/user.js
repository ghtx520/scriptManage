import login from "@/api/login"

const state = {
    // token:''||localStorage.getItem('token'),
    userName:''||localStorage.getItem('userName')
};
const getters = {
    // token: state => state.token,
    userName: state => state.userName
};
const mutations = {
    /* setToken(state,token){
        state.token = token,
        // 把登录的token保存到localStorage中，防止页面刷新，导致vuex重新启动
        localStorage.setItem('token',token)
    }, */
    setUserName(state,name){
        state.userName = name;
        //将登陆的用户名存储到localStorage中
        //localStorage.setItem('userName',name)
    },
    clearInfo(){
        localStorage.setItem('token','');
        localStorage.setItem('userName','');
        state.userName = '';
    }
};
const actions = {
    //登陆
    handleLogin({ commit },{ userName }) {
        commit('setUserName',userName)
        return new Promise((resolve,reject) => {
            login.submit({userName,password}).then(res => {
                console.log('登录成功');
                commit('setUserName',userName)
                resolve()
            })
            .catch(err => {
                console.log('登录失败')
				reject(err)
            })
        })
    },
    //退出登录
    handleLogout({ commit }){
        commit('clearInfo')
        /* login.logout().then(res => {
            console.log('退出成功')
            commit('clearInfo')
        })
        .catch(err => {
            console.log('退出失败')
        }) */
    }
};

export default {
    namespaced:true,     //用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
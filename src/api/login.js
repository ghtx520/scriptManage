import axios from '@/http/axios';

const login = {
    submit: (params) => {
        return axios.post(`/login`,params)   //登陆接口
    },
    logout: () => {
        return axios.post(`/login`)         //退出登陆接口
    }
}

export default login
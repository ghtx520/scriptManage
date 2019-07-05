import base from '@/config/env';
import axios from '@/http/axios';
import qs from "qs";

const project = {
    //项目列表
    projectList () {
        return axios.get(`${base.sq}/project/index`);
    },
    //项目详情
    projectDetail (id,params) {
       return axios.get(`${base.sq}/project/findById/${id}`,{
           params: params
       });
    },
    //项目创建
    projectCreate (params) {
      return axios.post(`${base.sq}/project/findById`,qs.stringify(params))
    }
}
export default project;
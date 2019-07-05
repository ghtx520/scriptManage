import base from '@/config/env';
import axios from '@/http/axios';
import qs from "qs";

const messsage = {
    //报文列表
    messsageList () {
        return axios.get(`${base.sq}/project/index`);
    },
    //报文详情
    messsageDetail (id,params) {
       return axios.get(`${base.sq}/project/findById/${id}`,{
           params: params
       });
    },
    //报文创建
    messsageCreate (params) {
      return axios.post(``,qs.stringify(params))
    }
}
export default messsage;
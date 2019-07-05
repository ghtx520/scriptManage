/**
 * api接口的统一出口
 */
//登录模块
import login from "@/api/login";
//项目管理模块接口
import project from "@/api/project";
//报文管理模块接口
import message from "@/api/message";
//其他模块接口

// 脚本管理模块接口	 ->未使用这种方式
// import {script} from "@/api/script";

//导出接口
export default {
    login,
    project,
    message,
}


import axios from '@/http/axios';
import qs from "qs";

/**
 * 应用名称下拉框
 */
export function getAppName(){
	return axios.get(`/app/getAppsByUsername`);
}

/**
 * 新增脚本
 */
export function addStript(addScript){
	return axios.post(`/case/insertCase`,addScript)
}

/**
 * 查询脚本
 */
export function getScript(app_id){
	return axios.get(`/case/getCase/`,{
		params:{
			app_id:app_id
		}
	})
}


/**
 * 删除脚本
 */
export function deleteScript(case_id){
	return axios.get(`/case/deleteCase`,{
		params:{
			case_id:case_id
		}
	})
}

/**
 * 新增脚本步骤
 */
export function addStep(addStep){
	return axios.post(`/case/insertRecordStep`,addStep)
}

/**
 * 编辑脚本步骤
 */
export function putStep(addStep){
	return axios.post(`/case/updateRecordStep`,addStep)
}


/**
 * 删除脚本步骤
 */
export function deleteStep(step_id){
	return axios.get(`/case/deleteCase`,{
		params:{
			step_id:step_id
		}
	})
}

/**
 * 查询脚本步骤
 */
export function getStep(case_id,step_id){
	return axios.post(`case/getRecordStep`,{
		case_id,
		step_id
	})
}

/**
 * 上传脚本
 */
export function putScript(formData){
	return axios.post(`case/getRecordStep`,formData,{
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

/**
 * 下载脚本
 */
export function exportScript(search, type, status, bind_user) {
	return request.get('/export/advertiser/', {
		responseType: 'arraybuffer',
		params: {
			search,
			type,
			status,
			bind_user
		},
	})
}



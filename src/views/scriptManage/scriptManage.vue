<template>
	<!-- 脚本管理页 -->
	<div>
		<p class="module-nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>脚本管理</el-breadcrumb-item>
			</el-breadcrumb>
			<span class="sec-module"></span>
		</p>
		<el-row style="margin: 10px 0px;box-sizing: border-box;">
			<el-col :span="7" style="margin-right: 20px;">
				<el-select v-model="addStepData.app_id" placeholder="请选择" size="medium" style="width: 100%;" @change="selectApp">
					<el-option v-for="item in appNams" :key="item.app_id" :label="item.label" :value="item.app_id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="16">
				<el-button type="primary" plain size="medium" @click="scriptSaveStat = true">新建脚本</el-button>
				<el-button type="warning" plain size="medium" v-if="scriptBtn" @click="putScrDialog = true">上传脚本</el-button>
				<el-button
					type="warning"
					plain
					size="medium"
					v-if="scriptBtn"
					@click="
						addStep = true;
						title = '新增脚本步骤';
					"
				>
					添加步骤
				</el-button>
				<el-button type="warning" plain size="medium" v-if="scriptBtn">录制脚本</el-button>
				<el-button type="warning" plain size="medium" v-if="scriptBtn">下载脚本</el-button>
			</el-col>
		</el-row>
		<el-row style="height: 85vh;box-sizing: border-box;">
			<el-col :span="7" style="border: 1px solid #EBEEF5;height: 100%;margin-right: 20px;background: #fff;padding: 10px;border-radius: 4px;">
				<!-- <h3 style="font-size: 16px;color: #606266;line-height: 32px;">默认目录</h3> -->
				<ul style="margin-left: 20px;">
					<li class="script-list" v-for="(item, k) in scriptList" :key="k" style="color: #02A7F0;line-height: 32px;" @click="scriptDetail(item)">
						{{ item.case_name }}
						<i class="el-icon-delete" style="float: right;color:#d9001b;line-height: 28px;" @click="deleteScriptEvn(item.case_id)"></i>
					</li>
				</ul>
			</el-col>
			<el-col :span="16" style="height: 100%;border-radius: 4px;">
				<div class="login-top">
					<div class="top">
						<span style="font-size: 22px;">{{ scriptData.case_name }}</span>
						<!-- <el-button type="primary" plain style="float: right;">参数设置</el-button> -->
					</div>
					<div class="floot">
						<ul>
							<li>脚本描述:{{ scriptData.remark }}</li>
							<li>修改时间:{{ scriptData.updateTime }}</li>
						</ul>
					</div>
				</div>
				<div class="script-next">
					<div class="top"><span style="font-size: 22px;">脚本步骤</span></div>
					<div class="center">
						<ul>
							<li style="position: relative;" :class="{ bgnGray: k % 2 == 0 }" v-for="(i, k) in stepList" :key="k">
								<span>01 点击 坐标</span>
								<span style="color: #F59A23;">X：200 Y：300</span>
								<el-link type="primary" style="position: absolute;right: 100px;" @click="updateStep(i)">编辑</el-link>
								<el-link type="danger" style="position: absolute;right: 30px;" @click="deleteStepEvn(i.step_id)">删除</el-link>
							</li>
						</ul>
					</div>
				</div>
				<!-- 新建脚本弹窗 -->
				<el-dialog title="新建脚本" :visible.sync="scriptSaveStat" width="750px">
					<el-form label-width="100px" size="mini">
						<el-form-item label="脚本名:"><el-input v-model="addStepData.case_name" style="width:550px"></el-input></el-form-item>
						<el-form-item label="描述:"><el-input v-model="addStepData.remark" type="textarea" :rows="4" style="width:550px"></el-input></el-form-item>
						<el-form-item label=""><el-button type="warning" plain size="medium" @click="addScriptBtn">保存</el-button></el-form-item>
					</el-form>
				</el-dialog>
			</el-col>
		</el-row>
		<add-step-dialog
			:title="title"
			:updateStepData="updateStepData"
			:case_id="scriptData.case_id"
			:case_name="scriptData.case_name"
			:state="addStep"
			@cancel="addStpcancel"
			@confirm="confirm"
		></add-step-dialog>
		<!-- 脚本上传弹窗 -->
		<el-dialog title="上传脚本" :visible.sync="putScrDialog" width="500px">
			<el-form size="mini">
				<el-form-item label="选择文件:">
					<a href="javascript:;" class="file"><input class="" id="fileinput" name="file" type="file" accept="*" @input="uploading($event)" /></a>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="putScrDialog = false">取 消</el-button>
				<el-button type="primary" @click="putBtn">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getAppName, addStript, getScript, deleteScript, getStep, deleteStep, putScript } from '@/api/script.js';
import AddStepDialog from './components/AddStepDialog';
export default {
	name: 'scriptManage',
	components: {
		AddStepDialog
	},
	created() {
		this.getApps(); //初始化 app下拉框数据
	},
	methods: {
		addStpcancel(value) {
			this.addStep = value;
		},
		confirm(state, returnStat) {
			this.addStep = state;
			if (returnStat) {
				this.$notify.success({
					title: '提示',
					message:  this.title+'成功!'
				});
				// this.getSteps(this.scriptData.case_id);
				this.getSteps(4204, '');
			} else {
				this.$message.error(this.title+'失败!');
			}
		},
		// 新增脚本事件
		addScriptBtn() {
			addStript(this.addStepData)
				.then(res => {
					// 新建成功 上传/添加/录制  按钮可用
					this.selectApp(this.addStepData.app_id);
					this.$notify.success({
						title: '提示',
						message: '新建脚本成功!'
					});
				})
				.catch(err => {
					this.$message.error('新建脚本失败!');
				})
				.finally(() => {
					this.scriptSaveStat = false;
				});
		},

		// 点击对应图标 根据id删除脚本
		deleteScriptEvn(id) {
			deleteScript(id)
				.then(res => {
					this.$message.success('脚本删除成功!');
					this.selectApp(this.addStepData.app_id); // 刷新数据
				})
				.catch(err => {
					this.$message.error('脚本删除失败!');
				});
		},
		// 根据脚本步骤id 删除脚本步骤
		deleteStepEvn(id) {
			deleteStep(id)
				.then(res => {
					this.$notify.success({
						title: '提示',
						message: '脚本步骤删除成功!'
					});
					this.getSteps(4204, ''); // 刷新数据
				})
				.catch(err => {
					this.$message.error('脚本步骤删除失败!');
				});
		},
		// 获取脚本步骤列表
		getSteps(case_id, step_id) {
			getStep(case_id, step_id)
				.then(res => {
					this.stepList = res.data.data;
				})
				.catch(err => {
					// 异常处理
					this.$message.error('获取脚本步骤列表获取失败!');
				});
		},
		// 获取app下拉列表数据
		getApps() {
			getAppName()
				.then(res => {
					this.appNams = res.data.data;
				})
				.catch(err => {
					this.$message.error('应用名称数据获取失败!');
				});
		},
		// 根据下拉框选项动态获取脚本列表
		selectApp(id) {
			getScript(id)
				.then(res => {
					this.scriptList = res.data.data;
				})
				.catch(err => {
					// 异常处理
				});
		},
		// 获取脚本详情事件
		scriptDetail(i) {
			this.scriptData = i;
			console.log(i);
			this.scriptBtn = true;
			// 获取相应脚本步骤列表
			// this.getSteps(parseInt(i.case_id),'');
			this.getSteps(4204, '');
		},
		// 上传脚本 文件选择事件
		uploading(e) {
			this.putFile = e.target.files[0];
		},
		// 脚本上传
		putBtn() {
			let formdata = new FormData();
			formdata.append('case_id', this.scriptData.case_id);
			formdata.append('file', this.putFile);
			putScript(formdata)
				.then(res => {
					this.$notify.success({ title: '提示', message: '脚本上传成功!' });
					this.putScrDialog = false;
				})
				.catch(err => {
					this.$message.error('脚本上传失败!');
				});
		},
		// 编辑脚本步骤按钮
		updateStep(i) {
			this.addStep = true;
			this.updateStepData = i;
			this.title = '编辑脚本步骤';
			console.log(this.updateStepData);
		}
	},
	data() {
		return {
			// 新增/编辑 脚本弹窗标题
			title:'',
			// 编辑脚本所需数据
			updateStepData: {},
			putFile: '',
			putScrDialog: false, // 上传脚本弹窗状态
			// 脚本详细信息
			scriptData: {},
			// 新建脚本所需参数
			addStepData: {
				app_id: '', // app应用id
				case_name: '', // 脚本名称
				remark: '' // 备注
			},
			direction: '', //滑动方向
			scriptSaveStat: false, // 脚本保存状态  成功时 上传脚本/手动添加/录制脚本 按钮才可用
			checked: '',
			setting: false,
			scriptBtn: false,
			addStep: false,
			scriptList: [], // 脚本列表
			stepList: [], // 脚本步骤列表
			appNams: []
		};
	}
};
</script>

<style scoped lang="scss">
.login-top {
	border: 1px solid #ebeef5;
	background: #fff;

	.top {
		height: 30px;
		padding: 15px 20px;
		border-bottom: 1px solid #ebeef5;
	}

	.floot {
		padding: 10px 20px;

		ul {
			line-height: 24px;
		}
	}
}

.script-next {
	background: #fff;
	margin-top: 10px;
	border: 1px solid #ebeef5;
	height: 500px;

	.top {
		padding: 15px 20px;
		border-bottom: 2px solid #ebeef5;
	}

	.center {
		li {
			line-height: 32px;
			padding: 10px 10px 10px 20px;
		}
	}
}

.bgnGray {
	background: #f2f2f2;
}
.script-list:hover {
	cursor: pointer;
	line-height: 44px;
}
</style>

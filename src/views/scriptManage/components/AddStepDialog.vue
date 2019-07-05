<template>
	<!-- 添加步骤 弹窗 -->
	<el-dialog :title="title" :visible.sync="state" width="700px" :before-close="cancel" @open="dialogOpen">
		<el-form label-width="120px" size="medium">
			<el-form-item label="步骤类型 :">
				<el-select v-model="stepData.step_type" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="控件坐标 :" v-if="stepData.step_type == 'c'">
				<el-input v-model="stepData.clickX0" placeholder="请输入内容" style="width: 100px;"></el-input>
				X
				<el-input v-model="stepData.clickY0" placeholder="请输入内容" style="width: 100px;"></el-input>
				Y
			</el-form-item>
			<el-form-item label="输入值:" v-if="stepData.step_type == 'i'"><el-input v-model="stepData.paramValue" style="width: 200px;"></el-input></el-form-item>
			<el-form-item label="坐标位置:" v-if="stepData.step_type == 'i'">
				<el-input v-model="stepData.clickX0" placeholder="请输入内容" style="width: 100px;"></el-input>
				X 至
				<el-input v-model="stepData.clickY0" placeholder="请输入内容" style="width: 100px;"></el-input>
				Y
			</el-form-item>

			<el-form-item label="关键键盘:" v-if="stepData.step_type == 'h'">
				<el-input v-model="stepData.clickX1" placeholder="请输入内容" style="width: 100px;"></el-input>
				X 至
				<el-input v-model="stepData.clickY1" placeholder="请输入内容" style="width: 100px;"></el-input>
				Y
			</el-form-item>
			<el-form-item label="滑动坐标 :" v-if="stepData.step_type == 'h'">
				<el-input v-model="stepData.clickx0" size="small" placeholder="请输入内容" style="width: 100px;"></el-input>
				<span style="color: #FF4D51;">X</span>
				<b>至</b>
				<el-input size="small" v-model="stepData.clicky0" placeholder="请输入内容" style="width: 100px;"></el-input>
				<span style="color: #FF4D51;">Y</span>
				<br />
				<el-input v-model="stepData.clickx1" size="small" placeholder="请输入内容" style="width: 100px;"></el-input>
				<span style="color: #FF4D51;">X</span>
				<b>至</b>
				<el-input size="small" v-model="stepData.clicky1" placeholder="请输入内容" style="width: 100px;"></el-input>
				<span style="color: #FF4D51;">Y</span>
			</el-form-item>
			<el-form-item label="步骤执行顺序 :"><el-input v-model="stepData.step_order" placeholder="请输入内容" style="width: 200px;"></el-input></el-form-item>
		</el-form>
		<el-form label-width="120px" inline size="mini">
			<el-form-item label="设置 :"><el-checkbox @change="checkChange" v-model="stepData.is_screenshot">截图</el-checkbox></el-form-item>
			<el-form-item label="等待时间:">
				<!-- 选择截图 等待时间才可用 -->
				<el-input v-model="stepData.sleep_screenshot" :disabled="!stepData.is_screenshot" style="width: 100px;"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel()">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { addStep,putStep } from '@/api/script.js';
export default {
	props: ['state', 'case_id', 'case_name', 'updateStepData','title'],
	data() {
		return {
			// 步骤类型选择数据
			options: [
				{
					value: 'c',
					label: '点击'
				},
				{
					value: 'i',
					label: '输入'
				},
				{
					value: 'h',
					label: '滑动'
				}
			],

			// 添加脚本步骤参数
			stepData: {
				case_id: '',
				case_name: '',
				clickX0: '',
				clickY0: '',
				clickX1: '',
				clickY1: '',
				is_screenshot: '',
				paramValue: '',
				sleep_screenshot: '',
				step_name: '',
				step_type: 'c',
				step_order: ''
			}
		};
	},
	methods: {
		cancel(){
			tihs.$emit('cancel', false)
		},
		// 弹窗打开时判断 是否有编辑数据 有则覆盖 stepData 数据-执行请求为编辑, 没有则为新增
		dialogOpen(){
			if (this.updateStepData) {
				this.stepData = this.updateStepData;
			}
		},
		// 截图选项-清空时间
		checkChange(value){
			if (!value) {
				this.stepData.sleep_screenshot=''
			}
		},
		confirm() {
			this.stepData.case_id = this.case_id;
			this.stepData.case_name = this.case_name;
			switch (this.stepData.step_type) {
				case 'c':
					delete this.stepData.clickX1;
					delete this.stepData.clickY1;
					break;
				case 'i':
					break;
				case 'h':
					break;
			}
			this.stepData.case_id = parseInt(this.stepData.case_id);
			this.stepData.is_screenshot = this.stepData.is_screenshot ? 1 : 0;
			console.log(this.stepData);
			// 判断请求是新增还是编辑-脚本步骤
			if (this.title=='新增脚本步骤') {
				addStep(this.stepData)
					.then(res => {
						//  参数1 控制弹窗显示  参数2传递请求是否成功!
						this.$emit('confirm', false, true);
					})
					.catch(err => {
						this.$emit('confirm', true, false);
					});
			}else{
				putStep(this.stepData)
					.then(res => {
						//  参数1 控制弹窗显示  参数2传递请求是否成功!
						this.$emit('confirm', false, true);
					})
					.catch(err => {
						this.$emit('confirm', true, false);
					});
			}
			
		}
	}
};
</script>

<style></style>

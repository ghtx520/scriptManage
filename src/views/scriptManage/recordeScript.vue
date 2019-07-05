<template>
	<div>
		<p class="module-nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item to="/main/scriptManage">脚本管理</el-breadcrumb-item>
				<el-breadcrumb-item>录制脚本</el-breadcrumb-item>
			</el-breadcrumb>
			<span class="sec-module"></span>
		</p>
		<el-row gutter="20">
			<!-- 左侧录制机 -->
			<el-col :span="8">
				<div class="pvr">
					<div class="top">
						<i class="el-icon-phone" style="color:#fff;font-size: 24px;line-height: 28px;"></i>
						<el-select v-model="value" placeholder="请选择" size="mini" style="width: 110px;">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<b style="color: #fff;">坐标: </b>
						<el-input size="mini" v-model="value" style="width: 50px;"></el-input> <b style="color: #fff;">X</b>
						<el-input size="mini" v-model="value" style="width: 50px;"></el-input> <b style="color: #fff;">Y</b>
						<i class="el-icon-s-tools" style="color:#fff;line-height: 32px;font-size: 18px;margin-left: 10px;float: right;"></i>
					</div>
					<div class="center">
						<el-button type="primary" plain style="margin: 100px auto;" @click="addStep=true">启动录制机</el-button>
					</div>
					<div class="bottom">
						<el-row>
							<el-col :span="6"><i class="el-icon-s-help"></i></el-col>
							<el-col :span="6"><i class="el-icon-s-help"></i></el-col>
							<el-col :span="6"><i class="el-icon-s-help"></i></el-col>
							<el-col :span="6"><i class="el-icon-s-help"></i></el-col>
						</el-row>
					</div>
				</div>
			</el-col>
			<!-- 右侧描述 -->
			<el-col :span="16">
				<div class="right">
					<div class="top">
						<span class="menu-icon" @click="addStep=true"><i class="el-icon-message-solid"></i> <b>添加步骤</b></span>
						<span class="menu-icon"><i class="el-icon-message-solid"></i> <b>回放</b></span>
						<span class="menu-icon"><i class="el-icon-message-solid"></i> <b>亮屏</b></span>
						<span class="menu-icon"><i class="el-icon-message-solid"></i> <b>安装</b></span>
						<span class="menu-icon"><i class="el-icon-message-solid"></i> <b>启动</b></span>
						<span class="menu-icon"><i class="el-icon-message-solid"></i> <b>退出</b></span>
						<span class="menu-icon"><i class="el-icon-message-solid"></i> <b>卸载</b></span>


					</div>
					<div class="center">
						<ul>
							<li style="position: relative;" class="bgn-gray">
								<span>01 等待 10s</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;">
								<span>02 点击控件 Username</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;" class="bgn-gray">
								<span>03 输入文本 zhangsan</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;">
								<span>05 截图</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;" class="bgn-gray">
								<span>06 点击控件 password</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;">
								<span>07 输入文本 zhangsan123456</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;" class="bgn-gray">
								<span>08 点击元素 登录</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
							<li style="position: relative;">
								<span>09 等待 15s</span><span style="color: #F59A23;"> X：200 Y：300</span>
							</li>
						</ul>
					</div>

				</div>
			</el-col>
		</el-row>
		<add-step-dialog :state="addStep" @cancel="addStpcancel" @confirm="confirm"></add-step-dialog>
	</div>
</template>

<script>
	import AddStepDialog from './components/AddStepDialog'
	export default {
		components: {
			AddStepDialog
		},
		methods: {
			addStpcancel(value) {
				this.addStep = value
			},
			confirm(value) {
				this.addStep = value
			}
		},
		data() {
			return {
				addStep: false,
				value: '',
				options: [{
					value: '选项1',
					label: '华为'
				}, {
					value: '选项2',
					label: '苹果'
				}, {
					value: '选项3',
					label: '三星'
				}, {
					value: '选项4',
					label: '小米'
				}]
			}
		}
	}
</script>

<style scoped lang="scss">
	$bgn:#fff;

	.pvr {
		border: 1px solid gainsboro;
		border-radius: 5px;
		overflow: hidden;
		height: 600px;
		position: relative;
		background: $bgn;

		.top {
			background: #2a82db;
			padding: 5px 10px;
		}

		.center {
			width: 100%;
			text-align: center;
		}

		.bottom {
			position: absolute;
			bottom: 0px;
			width: 100%;
			text-align: center;
			background: #2a82db;
			padding: 8px 0px;

			i {
				font-size: 28px;
				color: #FFF;
			}
		}
	}

	.right {
		border: 1px solid gainsboro;
		border-radius: 5px;
		overflow: hidden;
		height: 600px;
		background: $bgn;

		.top {
			padding: 10px;

			.menu-icon {
				margin: 5px 10px;
				vertical-align: middle;

				i {
					font-size: 22px;
					color: #2a82db;
					vertical-align: middle;
				}

				b {
					color: #606266;
				}
			}
		}

		.center {
			li {
				line-height: 32px;
				padding: 10px 10px 10px 20px;
			}
		}
	}

	.bgn-gray {
		background: #f2f2f2;

	}
</style>

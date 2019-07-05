<template>
<div>
    
    <p class="module-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>应用包管理</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="sec-module"></span>
    </p>
    <div class="page-search">
      
        <el-form :inline="true" :model="formInline" class="demo-form-inline" align="left">
            <el-form-item label="名称">
                <el-select v-model="formInline.label" placeholder="请选择应用名称">
                    <el-option value="" label="请选择"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统名称">
                <el-select v-model="formInline.versionName" placeholder="请选择系统名称">
                    <el-option value="" label="请选择"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <el-input v-model="formInline.keyword" style="width:278px" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="button" icon="el-icon-search" @click.prevent="search()" class="page-search-button"></el-button>
            </el-form-item>

        </el-form>
    </div>
   
    <div class="page-table">
        <el-button type="button"  @click="centerDialogVisible = true" class="create-task el-icon-upload2"> 上传应用</el-button>
        <el-table :data="tableData" :header-cell-style="headerCell" element-loading-text="加载中" fit> 
            <el-table-column prop="label" align="center" label="应用名称" ></el-table-column>
            <el-table-column prop="versionName" align="center" label="应用版本" width="100px"></el-table-column>
            <el-table-column prop="size" align="center" label="应用大小" width="100px"></el-table-column>
            <el-table-column prop="system" align="center" label="系统" width="120px"></el-table-column>
            <el-table-column prop="packageName" align="center" width="400px" label="包名"></el-table-column>
            <el-table-column prop="launchActivity" align="center" width="400px" label="启动Activity"></el-table-column>
            <el-table-column prop="createTime" align="center" label="上传时间" width="100px"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="270px">
                <template > <!-- slot-scope="scope"-->
                    <el-button type="text" size="small" class="page-operation-button el-icon-upload" @click="createTask()"> 提测</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-download"> 下载</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-delete"> 删除</el-button>
                </template>
            </el-table-column>
        </el-table> 

        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
        background
        style="float: right;margin-top:3%">
        </el-pagination>  


        <el-dialog
        title="附件上传"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        
                <el-upload
                :action="apkUploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforUpdate"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :data="this.fileDate"
                style="text-align: center;">
                <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip" style="margin-left: 7%;">只能上传apk文件</span>
                </el-upload>
         
                
      

        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
    
</div>
 
</template>

<script>
import { mapState } from "vuex"
   export default {
    data() {
       return {
           formInline:{
               label:'',
               versionName:'',
               keyword:''
           },
           tableData:[
            //    {
            //        appName:'test',
            //        appVersion:'v3.16',
            //        appSize:'20M',
            //        system:'Android',
            //        packageName:'com.giti.www.dealerporta',
            //        uploadTime:'2019-07-01'

            //    }
            {
                app_id:'',
                username:'',
                label:'',
                iconPath:'',
                versionName:'',
                size:'',
                packageName:'',
                launchActivity:'',
                app_path:'',
                status:'',
                createTime:'',
                system:'Android'
            }
           ],
           currentPage:1,
           centerDialogVisible: false,
           uploadForm:{
               applicationName:'',
               applicationVersion:'',
               package:''
           },
           fileList: [],
           // apk url
           apkUploadUrl: this.$baseUrl + '/uploadApk',

           fileDate:{
               username:this.userName
           },
        }
       },
       created(){
           this.searchList();
       },
       methods: {
           // 修改表头样式
           headerCell(row, column, rowIndex, columnIndex){
               return 'height: 42px; background-color: rgb(249,249,249,1); text-align: center'
           },
            // 页面变换行数时触发
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 翻页触发
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            // 移除方法
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            // 超过limit的值后进入方法，limit限制上传几个文件
            handleExceed(files, fileList) {
                this.$message.warning(`只能提交一个文件`);
            },

            
            // 上传前的钩子
            beforUpdate(file){
                let uploadExtend=".apk";//设置文件格式
                let extend=file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
                if(uploadExtend.indexOf(extend)<=-1){
                this.$message.error("文件只能是apk格式！");
                return false;

                }
            },
            
            // 提测跳转创建任务
            createTask(){
                this.$router.push('/main/taskManage/createTask')   
            },

            // 查询list方法
            searchList(){
                let that = this.$router;
                this.$axios.get('/getAllAppList',{
                    params:{
                        label:this.formInline.label,
                        versionName:this.formInline.versionName
                    }
                })
            }

       },
       computed: {
            ...mapState({
                userName: state => state.user.userName
            })
        },
   }
</script>

<style scoped>

    .page-main .module-nav{
        text-align:left;
        padding:0 0 10px 6px;
        font-size:12px;
    }
    .page-main .module-nav .first-module{
        color:#333;
    }

    /* 整体查询组件style */
    .page-search{
        padding: 35px 0 0 35px;
        height: 80px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 1);
        margin-left: -2%;
       
    }

   
    /* 查询button style */
    .page-search-button{
        left: 1080px;
        top: 133px;
        width: 78px;
        height: 40px;
        background-color: rgba(8, 152, 237, 1);
        color: aliceblue
    }

    /* 表格外层div样式 */
    .page-table{
        left: 189px;
        top: 205px;
        height: 520px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 2px 0px rgba(134, 131, 131, 0.06);
        margin-top: 2%;
        margin-left: -2%;
    }

    /* 创建任务样式 */
    .create-task{
        left: 1284px;
        top: 235px;
        width: 119px;
        height: 36px;
        background-color: rgba(236, 247, 255, 1);
        margin: 2% 0 2% 82%;
    }

    
    .page-operation-button{
        width: 59px;
        height: 27px;
        padding-top: 3%;
        border-radius: 3px;
        border: 1px solid rgba(216, 216, 216, 1);
       
    }
</style>
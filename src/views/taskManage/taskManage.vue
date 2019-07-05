<template>
<div>
    
    <p class="module-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="sec-module"></span>
    </p>
    <div class="page-search">
      
        <el-form :inline="true" :model="formInline" class="demo-form-inline" align="left">
            <el-form-item label="名称">
                <el-select v-model="formInline.appName" placeholder="请选择应用名称">
                    <el-option value="" label="请选择"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统名称">
                <el-select v-model="formInline.sysName" placeholder="请选择系统名称">
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
        <el-button type="button"  @click="createTask()" class="create-task el-icon-edit-outline"> 创建任务</el-button>
        <el-table :data="tableData" :header-cell-style="headerCell" element-loading-text="加载中" fit> 
            <el-table-column prop="taskId" align="center" label="任务ID" ></el-table-column>
            <el-table-column prop="app" align="center" label="应用" width="100px"></el-table-column>
            <el-table-column prop="version" align="center" label="版本" width="100px"></el-table-column>
            <el-table-column prop="testTime" align="center" label="提测时间" width="120px"></el-table-column>
            <el-table-column prop="statusText" align="center"  label="状态" ></el-table-column>
            <el-table-column prop="result" align="center" label="测试结果" width="100px"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="270px">
                <template slot-scope="scope"> <!-- slot-scope="scope"-->
                    <el-button type="text" size="small" class="page-operation-button el-icon-upload" v-if="scope.row.status = 1"> 停止任务</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-download" v-if="scope.row.status = 2"> 执行</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-delete" v-if="scope.row.status = 2"> 编辑</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-delete" v-if="scope.row.status = 3"> 分析结果</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-delete" v-if="scope.row.status = 4"> 查看报告</el-button>
                    <el-button type="text" size="small" class="page-operation-button el-icon-delete" v-if="scope.row.status = 4"> 重新分析</el-button>
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


    </div>
    
</div>
 
</template>

<script>
   export default {
    data() {
       return {
           formInline:{
               appName:'',
               sysName:'',
               keyword:''
           },
           tableData:[
               {
                   taskId:'1',
                   app:'赢在一起测试版',
                   version:'v3.1.6',
                   testTime:'2019-06-27',
                   status:'1',
                   statusText:'执行中',
                   result:'30（ 13 / 5 / 2 ）'
               },
               {
                   taskId:'2',
                   app:'赢在一起测试版',
                   version:'v3.1.6',
                   testTime:'2019-06-27',
                   status:'2',
                   statusText:'未执行',
                   result:'/'
               },
               {
                   taskId:'3',
                   app:'赢在一起测试版',
                   version:'v3.1.6',
                   testTime:'2019-06-27',
                   status:'3',
                   statusText:'已完成',
                   result:'30（ 18 / 12 / 0 ）'
               },
               {
                   taskId:'4',
                   app:'赢在一起测试版',
                   version:'v3.1.6',
                   testTime:'2019-06-27',
                   status:'4',
                   statusText:'已分析',
                   result:''
               }
           ],
           currentPage:1,
           
           uploadForm:{
               applicationName:'',
               applicationVersion:'',
               package:''
           },
           fileList: [],
           // apk url
           apkUploadUrl:'',
        }
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

            // 提测跳转创建任务
            createTask(){
                this.$router.push('/main/taskManage/createTask')   
            }
            
       }
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
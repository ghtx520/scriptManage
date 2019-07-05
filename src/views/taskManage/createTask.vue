<template>
  <div>
    <p class="module-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="sec-module"></span>
    </p>

    <div class="page-search">
      <el-select v-model="appName" placeholder="请选择应用名称" class="page-select">
        <el-option value label="test"></el-option>
      </el-select>
    </div>

    <div class="page-table">
      <div class="page-left-div">
        <!-- title -->
        <div class="page-title">
          <span class="title-font-style">选择执行设备</span>
        </div>
        <!-- 列表 -->
        <div class="list task-list">
          <ul class="firstUl">
            <li v-if="moreButton">
              <span style="float: left;margin-top: 2%;">选择常用列表：</span> 
              <el-button round size="mini"  class="list-button">全部</el-button>
              <el-button
                v-for="list in listShow "
                round
                size="mini"
                class="list-button"
                :key="list.value"
              >{{list.listName}}</el-button>
              <el-button round size="mini" type="text" @click="moreButton = !moreButton" style="color:#409EFF;">更多</el-button>
            </li>
            <li v-if="!moreButton">
              <span style="float: left;margin-top: 2%;">选择常用列表：</span> 
             
              <div style="margin-left: 100px;">
                <el-button round size="mini"  class="list-button">全部</el-button>
                <el-button
                v-for="list in allList "
                round
                size="mini"
                class="list-button-more"
                :key="list.value"
              >{{list.listName}}</el-button>
              <el-button round size="mini" type="text" @click="moreButton = !moreButton" style="color:#409EFF;">收起</el-button></div>
              
            </li>
            <li>
              品牌：
              <el-button size="mini"  type="text">全部</el-button>
              <el-button
                size="mini"
                type="text"
                v-for="brand in brandList"
                :key="brand.value"
                class="button-color"
              >{{brand.listName}}</el-button>
            </li>
            <li>
              系统版本：
              <el-button size="mini"  type="text">全部</el-button>
              <el-button
                size="mini"
                type="text"
                v-for="sysType in sysTypeList"
                :key="sysType.value"
                class="button-color"
              >{{sysType.listName}}</el-button>
            </li>
            <li>
              分辨率：
              <el-button size="mini"  type="text">全部</el-button>
              <el-button
                size="mini"
                type="text"
                v-for="resolution in resolutionList"
                :key="resolution.value"
                class="button-color"
              >{{resolution.listName}}</el-button>
            </li>
            <li>
              <el-input placeholder="请输入设备名称/型号" style="width: 51%;float: left;margin-left: 10px;margin-top: 3%;" v-model="searchMachine"></el-input>
              <span style="margin-top: 5%;display: inline-block;margin-left: 10%;">{{this.filterMachine.length}} 个结果</span>
              <el-checkbox  style="margin-left: 10%;" v-model="checkAll" @change="changeState">全选</el-checkbox>
            </li>
            <li>
              <el-divider></el-divider>
            </li>
          </ul>
          <ul> 
            <div class="show-machine-list">
              <li v-for="machine in filterMachine" :key="machine.value" class="machine-li"> 
                    <img :src="machine.url" style="width: 30px;height: 30px;vertical-align: middle;"> 
                    <span style="display: inline-block; width: 63%;">{{machine.listName}}</span>
                    <input type="checkbox" v-model="checkModel" :value="machine.value"/>
              </li> 
            </div>
            
         </ul> 
          
        </div>
        <div style="width: 600px;height:70px">
            <span style="float: left;margin-top: 5%;margin-left: 6%;">选择执行脚本</span>
            <el-select style="margin-top: 3%;width: 400px;margin-left: 80px;"></el-select>
        </div>
                  
           
      </div>

      <div class="page-right-div">
        <div class="page-title">
          <span class="title-font-style">已选择设备{{this.checkedModelArr.length}}台</span>
          <i class="el-icon-edit" style="margin-left: 75%;" @click="dialogVisible = true"></i>
        </div>

        <div class="list">
          <ul> 
            <div class="show-machine-list-right">
              <li v-for="machine in checkedModelArr" :key="machine.value" class="machine-li"> 
                    <img :src="machine.url" style="width: 30px;height: 30px;vertical-align: middle;"> 
                    <span style="display: inline-block; width: 63%;">{{machine.listName}}</span>
                    <input type="checkbox" v-model="checkModel" :value="machine.value"/>
              </li> 
            </div>
         </ul> 
        </div>
      </div>

      <div class="footbutton" style="margin-top: 10%;">
          <el-button style="margin-right: 5%;width: 10%;">取消</el-button>
          <el-button style="width: 10%;background-color: rgba(8, 152, 237, 1);color: white;">创建</el-button>
      </div>
    </div>

    <el-dialog
      title="添加设备列表"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose">
      列表名称：<input type="text" >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>



export default {
  data() {
    return {
      appName: "",
      // 常用列表全部，点击收起时隐藏，接着显示listShow
      allList: [
        { value: 1, listName: "刘海屏机型" },
        { value: 2, listName: "覆盖全部分辨率" },
        { value: 3, listName: "覆盖主流品牌" },
        { value: 4, listName: "刘海屏机型2" },
        { value: 5, listName: "覆盖全部分辨率2" },
        { value: 6, listName: "覆盖主流品牌2" },
        { value: 7, listName: "刘海屏机型3" },
        { value: 8, listName: "覆盖全部分辨率3" },
        { value: 9, listName: "覆盖主流品牌3" }
      ],
      // 常用列表只显示前三个，点击更多后隐藏，接着显示全部的list
      listShow: [
        { value: 1, listName: "刘海屏机型" },
        { value: 2, listName: "覆盖全部分辨率" },
        { value: 3, listName: "覆盖主流品牌" }
      ],
      // 品牌列表
      brandList: [
        { value: 1, listName: "华为" },
        { value: 2, listName: "小米" },
        { value: 3, listName: "vivo" },
        { value: 4, listName: "魅族" },
        { value: 5, listName: "oppo" },
        { value: 6, listName: "三星" },
        { value: 7, listName: "索尼" }
      ],
      // 系统版本
      sysTypeList: [
        { value: 1, listName: "10.0.0" },
        { value: 2, listName: "9.9.0" },
        { value: 3, listName: "8.0.0" }
      ],

      // 分辨率列表
      resolutionList: [
        { value: 1, listName: "1920x1080" },
        { value: 2, listName: "1280x720" },
        { value: 3, listName: "1080x960" }
      ],
      // 更多常用列表
      moreButton: false,

      // 机型列表
      machineList: [
        {
          value: 1,
          url:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/17f2dd9756d9d333bee8e60ce8c03e4c_222_222.jpg",
          listName: "华为P30"
        },
        {
          value: 2,
          url:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/17f2dd9756d9d333bee8e60ce8c03e4c_222_222.jpg",
          listName: "华为P30 Pro"
        },
        {
          value: 3,
          url:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/17f2dd9756d9d333bee8e60ce8c03e4c_222_222.jpg",
          listName: "华为Mate20"
        },
        {
          value: 4,
          url:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/17f2dd9756d9d333bee8e60ce8c03e4c_222_222.jpg",
          listName: "华为Mate20 pro"
        },
        {
          value: 5,
          url:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/17f2dd9756d9d333bee8e60ce8c03e4c_222_222.jpg",
          listName: "华为P30"
        },
        {
          value: 6,
          url:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/17f2dd9756d9d333bee8e60ce8c03e4c_222_222.jpg",
          listName: "华为P30"
        },
        {
          value: 7,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 8,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 9,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 10,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 11,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 12,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 13,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 14,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 15,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 16,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 17,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 18,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 19,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 20,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 21,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 22,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 23,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 24,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 25,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 26,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 27,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 28,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 29,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 30,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 31,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 32,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 33,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 34,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 35,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 36,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 37,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 38,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 39,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 40,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 41,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 42,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 43,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
        {
          value: 44,
          url:
            "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2786589263,2865842758&fm=58&s=01D82C7AC444DF134C4908560300C0F2&bpow=121&bpoh=75",
          listName: "OPPO Find x"
        },
      ],

      // 设备名称/机型
      searchMachine:"",

      //全选
      checkAll:false,
      checkModel:[],
      //dialog
      dialogVisible:false,
      //选中的手机对象
      checkedModelArr:[]
    };
  },
  watch:{
    checkModel:{
      handler(){
        if(this.checkModel.length==this.filterMachine.length){
          this.checkAll = true
        }else{
          this.checkAll = false
        }
        this.checkedModelArr=[]
        this.filterMachine.forEach((value,index)=>{
          this.checkModel.forEach((checkValue,checkIndex)=>{
            
            if(checkValue==value.value){
              this.checkedModelArr.push(value)
            }

          })
        })


      }
    }
  },
  methods: {
    // 修改表头样式
    headerCell(row, column, rowIndex, columnIndex) {
      return "height: 42px; background-color: rgb(249,249,249,1); text-align: center";
    },

    //全选
    changeState(item){
      this.checkModel = []
      if(this.checkAll == true){
        this.filterMachine.forEach((value,index)=>{
          this.checkModel.push(value.value)
        })
      }
    },
    
    //关闭dialog
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    

  },

  // 设备名称，型号，关键字搜索
  computed:{
      filterMachine(){
          const {machineList} = this
          let mList ;
          mList = machineList.filter(p => p.listName.indexOf(this.searchMachine)!==-1)
          return mList;
      }
  }
};
</script>

<style scoped>
/* 查询下拉列表样式 */
.page-search {
  left: 189px;
  top: 110px;
  width: 1231px;
  height: 80px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 1);
  margin-left: -2%;
}

/* 下拉框样式 */
.page-select {
  top: 20px;
  width: 581px;
  height: 42px;
  background-color: rgba(249, 249, 249, 1);
  float: left;
  margin-left: 2%;
}

/* 主体样式 */
.page-table {
  left: 189px;
  top: 205px;
  width: 1231px;
  height: 840px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 2px 0px rgba(134, 131, 131, 0.06);
  margin-left: -2%;
  margin-top: 2%;
}

/* 主体左侧div样式 */
.page-left-div {
  left: 219px;
  top: 292px;
  width: 581px;
  height: 626px;
  border-top: 1px solid #fff;
}

/* 灰色边框样式 */
.page-title {
  width: 581px;
  height: 42px;
  background-color: rgba(249, 249, 249, 1);
  margin: 3% 3% 2.5% 3% ;
  text-align: left;
  line-height: 42px;
}

/* title中字体样式 */
.title-font-style {
  color: rgba(74, 74, 74, 1);
  margin-left: 2%;
  font-family: PingFangSC-Medium;
}

.list {
  left: 219px;
  top: 292px;
  width: 581px;
  height: 562px;
  border-radius: 1px;
  border: 1px solid rgba(220, 220, 220, 1);
  margin-left: 3%;
}

.list-button {
  display: inline-block;
  line-height: 1;
  border-radius: 18px;
  margin-top: 1%;
  margin-left: 0;
  margin-right: 10px;
}

.list-button-more{
  display: inline-block;
  line-height: 1;
  border-radius: 18px;
  margin-top: 1%;
  margin-left: 0;
  margin-right: 10px;
}

.task-list .firstUl li{
    text-align: left;
}
.button-color{
    color:#606266;
}
.button-color:focus {
    color:#409EFF;
}

.page-right-div{
    height: 80%;
    width: 50%;
    float: right;
    margin-top: -640px;  /* -52% */
}

.show-machine-list{
      border-top: 1px solid rgba(220, 220, 220, 1);
      height: 295px;
      margin-top: 5%;overflow-y: auto;
}

.show-machine-list-right{
      height: 562px;
      overflow-y: auto;
      
}

.machine-li{
      width:50%; 
      float: left;
      box-sizing:border-box;
      -moz-box-sizing:border-box;
      -webkit-box-sizing:border-box;
      text-align: left;
      padding-left: 50px;
      margin-top: 1%;
}
</style>
<template>
    <div class="pro-choose">
        <p class="tip-title">选择项目</p>
        <el-row :gutter="20">
            <el-col :span="6" :offset="8">
                <label style="font-size:14px;margin-right:10px;">选择项目:</label>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="surePro">确定</el-button>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
 export default {
     data () {
         return {
             options: [
                 {value:'项目1',label:'项目1'},
                 {value:'项目2',label:'项目2'},
                 {value:'项目3',label:'项目3'},
                 {value:'项目4',label:'项目4'},
                 {value:'项目5',label:'项目5'},
                 {value:'项目6',label:'项目6'},
                 {value:'项目7',label:'项目7'},
                 {value:'项目8',label:'项目8'}
             ],
             value: '',
         }
     },
     methods: {
         surePro() {
             let _this = this;
             if(!this.value){
                this.$message({
                    message: '请选择项目',
                    type: 'warning',
                    duration:800
                });
                return;
             }
             this.$router.push('/main');
         }
     }
 }
</script>

<style>
    .pro-choose{
        position:absolute;
        top:80px;
        left:30px;
        right:30px;
        bottom:20px;
        background:#fff;
        border-radius:6px;
    }
    .tip-title{
        text-align:left;
        padding:10px;
        background:#ccc;
        margin-bottom:80px;
        font-size:14px;
        border-radius: 6px 6px 0 0;
    }
</style>
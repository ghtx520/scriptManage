<template>
    <div class="login-page">
       <el-row :gutter="20" style="margin-bottom:3%;">
           <el-col :span="5">
               <span style="font-size:30px;lin-height:60px;color:#ffffff;">Fairyland</span>
           </el-col> 
       </el-row>
       <el-row :gutter="20" style="margin-bottom:100px;">
         <el-col :span="6" :offset="9" style="min-width:336px;">
             <h2 class="pla-title">自动化测试平台—登录</h2>
             <div class="grid-content bg-purple">
                 <el-form>
                     <el-form-item class="lab-item">
                         <label>用户名</label>
                     </el-form-item>
                     <el-form-item>
                         <el-input v-model="username" placeholder="请输入用户名"></el-input>
                     </el-form-item>
                     <el-form-item class="lab-item">
                         <label>密码</label>
                     </el-form-item>
                     <el-form-item>
                         <el-input type="password" v-model="password" auto-complete="off" placeholder="请输入密码"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-button @click="login" @keyup.enter="login">用户登录</el-button>
                     </el-form-item>
                 </el-form>
             </div>
         </el-col>
       </el-row>
       <el-row>
         <el-col><span class="tip-bottom">复深蓝软件股份有限公司</span></el-col>
       </el-row>    
    </div>
</template>

<script>
    import { mapState } from "vuex"
    export default {
        name:'Login',
        data () {
            return {
                username:'',
                password:''
            }
        },
        created () {
            let userInfo = JSON.parse( localStorage.getItem('user'));
            if(userInfo && userInfo.username ) {
                this.username = userInfo.username;
            }
        },
        computed:{
            ...mapState({

            })
        },
        methods: {
            login () {
                if(!this.username) {
                    this.$message.error('请输入用户名');
                    return;
                }
                if(!this.password) {
                    this.$message.error('请输入密码');
                    return;
                }
                let username = this.username;
                let password = this.password;
                this.$router.replace({path:'/home'})
				
                this.$store.dispatch('user/handleLogin',{userName:username})
                //登录成功，存储用户状态
                /* 
                var loginParams = {
                    username: this.username,
                    password: this.username,
                }                
                this.$api.login.submit(loginParams)
                */
            }
        }
    }
</script>

<style>
    .login-page{
        /* position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0; */
        height:100%;
        padding:30px 60px;
        background:url('../assets/images/login_bg.jpg') no-repeat center;
    }
    .login-page .pla-title{
        font-size:30px;
        color:#fff;
        font-weight:500;
        margin-bottom:50px;
    }
    .login-page .el-form-item{
        text-align:left;
    }
    .login-page .el-input__inner{
        height:46px;
        line-height:46px;
    }
    .login-page .lab-item{
        margin-bottom:0;
        color:#fff;
    }
    .login-page .lab-item .el-form-item__content{
        font-size: 18px;
    }
    .login-page .el-form-item .el-button{
        width:100%;
        border:1px solid #ffffff;
        background-color:transparent;
        color:#fff;
        margin-top:30px;
        font-size:14px;
        padding:16px 20px;
    }
    .login-page .tip-bottom{
        font-size:16px;
        color:#fff;
        opacity:0.7;
    }
</style>
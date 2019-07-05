<template>
    <div class="header">
        <el-col :span="3" style="line-height:55px;font-size:14px;font-weight:bold;color:#ffffff;">
            自动化测试平台
        </el-col>
        <div class="header-rg flo_rg">
            <el-select v-model="value" placeholder="请选择">
                <el-option :key="1" value="项目1">项目1</el-option>
                <el-option :key="2" value="项目2">项目2</el-option>
                <el-option :key="3" value="项目3">项目3</el-option>
            </el-select>
            <span class="header-user">
                <i class="el-icon-picture"></i>
                你好！<span>{{userName}}</span>
            </span>
            <el-button @click="logout">
                <i class="el-icon-back"></i>退出
            </el-button>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    export default {
        data () {
            return {
                value:'项目1',
            }
        },
        computed: {
            ...mapState({
                userName: state => state.user.userName
            })
        },
        methods: {
            logout() {
                //跳转到登陆
                this.$router.push('/login');
                //清空缓存信息
                this.$store.dispatch('user/handleLogout')
                localStorage.removeItem("userMsg")
                localStorage.removeItem("token")
            }
        }
    }
</script>

<style>
    .header{ 
        height:55px;
        z-index:999;
        box-shadow: 2px 2px 2px #888888; 
        padding:0 20px;
        background:url('../assets/images/header_bg.png') no-repeat center;
    }
    .header .header-rg{ 
       line-height:55px; 
    }
    .header .header-rg .el-select .el-input__inner{
        background: transparent;
        border:none;
        color:#ffffff;
        text-align:right;
        font-size:12px;
    }
    .header .header-rg .header-user{
       padding:0 20px;
       border-left:1px solid #ffffff;
       color:#ffffff;
       margin-left:20px;
       font-size:12px;
    }
    .header .header-rg .el-button{
        background:transparent;
        border:none;
        font-size:12px;
        color:#ffffff;
        padding:3px 6px;
    }
</style>
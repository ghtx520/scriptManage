<template>
<!-- <div class="side-nav"> -->
    <el-aside class="aside-nav">
        <div class="iscollapse" @click="setcollapse" style="padding:12px 0;margin:0 10px;text-align:right;">
            <i class="el-icon-arrow-right" v-if="iscollapse"></i>
            <i class="el-icon-arrow-left" v-else></i>
        </div>

		<el-menu
			:default-active="defaultActive"
			class="el-menu-vertical"
			router
			unique-opened
			:collapse="iscollapse"
			:collapse-transition="false"
			active-text-color='#29A88D'
			text-color="#4a4a4a">
			<div v-for="(item,i) in routers" :key="i">
                  <el-submenu :index="item.url" v-if="item.child">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span class="tohide" v-show="!iscollapse">{{item.name}}</span>
                    </template>
                    <el-menu-item :index="val.url" v-for="val in item.child" :key="val.stage">
                        <i class="icon iconfont">*</i>
                        <span>{{val.name}}</span>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item :index="item.url" v-else > 
                      <i :class="item.icon"></i>
                      <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                </div>
 
		</el-menu>
	
	</el-aside>

    <!-- <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu mode="vertical"
                 background-color="#fff"
                 text-color="#333"
                 active-text-color="blue"
                 :collapse="isCollapse"
                 :default-active="$route.path">
            <menu-item :menus="menus"></menu-item>
        </el-menu>
    </el-scrollbar> -->

<!-- </div> -->
</template>

<style>
/*     .side-nav {
        width:180px;
        height:100%;
        background:#fff;
        border-right:1px solid #e6e6e6;
    }  */
    .aside-nav{
        width:auto!important;
        position:absolute;
        left:0;
        top:0;
        bottom:0;
        background:#fff;
        border-right:1px solid #e6e6e6;
    }
    .aside-nav .el-menu{
        border:none;
    }
    .aside-nav .el-menu-vertical-demo:not(.el-menu--collapse) {
       min-height: 400px;
       padding:0 10px;
       border:none;
    }
    .el-menu--popup .el-menu-item{
        text-align:left;
        height:32px;
        line-height:32px;
        font-size:12px;
        border-radius:5px;
        margin-bottom:10px;
        margin-left:10px;
        margin-right:10px;
        padding:0 20px 0 10px;
        padding-left:10px!important;
    }
    .aside-nav .el-submenu .el-menu-item {
        min-width:auto;
    }
    .aside-nav .el-menu-item .el-tooltip{
        padding-left:10px!important;
    }
    .aside-nav .el-menu-item,.aside-nav .el-submenu__title{
        text-align:left;
        height:32px;
        line-height:32px;
        font-size:12px;
        border-radius:5px;
        margin-bottom:10px;
        margin-left:10px;
        margin-right:10px;
        padding:0 30px 0 10px;
        padding-left:10px!important;
    }
    .aside-nav .el-submenu [class^=el-icon-],.aside-nav .el-menu-item [class^=el-icon-]{
        margin-right:10px;
    }
    .aside-nav .el-menu-item:focus,.aside-nav .el-submenu .el-menu-item:focus{
        background-image: linear-gradient(to right , #548FFF, #98B3FF );
        /* box-shadow:#548FFF 1px 1px 1px 1px; */
        background-color:none;
        color:#ffffff!important;
    } 
    .aside-nav .el-menu-item:focus i,.aside-nav .el-submenu .el-menu-item:focus i{
        color:#ffffff;
    }
    
    .active-item{
        background-image: linear-gradient(to right , #548FFF, #98B3FF );
        /* box-shadow:#548FFF 1px 1px 1px 1px; */
        background-color:none;
        color:#ffffff!important;
    }
    .active-item i{
        color:#ffffff;
    }
</style>

<script>
  import { mapState } from "vuex"
  export default {
    name:'side-menus',
    data() {
        return {
            defaultActive: "/admin",
            routers: []
        };
    },
    mounted() {
        this.$axios.get('http://localhost:8686/api/nav', {})
        .then(res => {
            let data = res.data.data;
            if ( data.leftNavs.length > 0) {
                this.routers = data.leftNavs;
            }
        })
        .catch(error => {
            //this.$message.error(error);
        });
    },
    computed: {
        ...mapState({
            iscollapse: state => state.sideNavStatus,
            iscollapse1: state => state.otherState.sideNavStatus
        })
    },
    methods: {
        setcollapse() {
            console.log(this.iscollapse)
            console.log(this.iscollapse1)
            if(this.iscollapse){
                this.$store.dispatch('showNavs');
                this.$store.otherState.dispatch('showNavs');
                $(".aside-nav .el-submenu__title .el-submenu__icon-arrow").css("display","none");
            }else{
                this.$store.dispatch('hideNavs');
                this.$store.otherState.dispatch('hideNavs');
                $(".aside-nav .el-submenu__title .el-submenu__icon-arrow").css("display","inline");
            }
        }
    },
}
</script>
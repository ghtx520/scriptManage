<template>
    <div class="page-main">
        <auto-header></auto-header>
        <div class="contain-section">
            <el-container>
                <side-navs></side-navs>
                <el-main :class="['main-content',{'extend-wid':isExtend}]">
                    <!-- <p class="module-nav"><span class="first-module">项目管理</span><span class="sec-module"></span></p> -->
                    <router-view/>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    import AutoHeader from '../components/Header'
    import SideNavs from '../components/sidenav/SideNavs'

    import { mapState } from "vuex"

    export default {
        components: {
            SideNavs,
            AutoHeader
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                isExtend: state => state.sideNavStatus
            })
        },
        methods: {

        }
    }
</script>

<style>
	
    .page-main .el-container{
        position: absolute;
        left: 0;
        right: 0;
        top: 55px;
        bottom: 0;
    }
    .page-main .main-content{
        position:absolute;
        left:176px;
        right:0;
        top:0;
        bottom:0;
    }
    .extend-wid{
        left:70px!important;
    }
    .page-main .module-nav{
        text-align:left;
        padding:0 0 10px 6px;
        font-size:12px;
    }
    .page-main .module-nav .first-module{
        color:#333;
    }
</style>
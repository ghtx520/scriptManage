import Vue from 'vue'
import VueRouter from 'vue-router'

import Notfound from '@/views/404'
import Refresh from '@/views/Refresh'

import Login from '@/views/Login'
import Home from '@/views/Index'
import Main from '@/views/Main'
import Appmanage from '@/views/appManage/appManage'
import TaskManage from '@/views/taskManage/taskManage'
import CreateTask from '@/views/taskManage/createTask'
// 脚本管理
import ScriptManage from '@/views/scriptManage/scriptManage'

// 录制脚本页
import recordeScript from '@/views/scriptManage/recordeScript'


Vue.use(VueRouter)

//配置路由
let router = new VueRouter({
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [{
			path: '*',
			component: Notfound,
			noMenu: true
		},
		{
			path: '/',
			component: Login,
			noMenu: true
		},
		{
			path: '/refresh',
			component: Refresh,
			noMenu: true
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			noMenu: true
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
			noMenu: true,
			children: [{
					path: '/',
					component: () => import('@/views/project/ProjectChoose'),
					noMenu: true
				},
				{
					path: 'choose',
					name: 'choose',
					component: () => import('@/views/project/ProjectChoose'),
					noMenu: true
				}
			]
		},
		{
			path: '/main',
			name: 'main',
			component: Main,
			noMenu: true,
			children: [{
					path: 'appManage',
					name: 'appManage',
					component: Appmanage,
					noMenu: true,
				},
				{
					path: 'taskManage',
					name: 'taskManage',
					component: TaskManage,
					noMenu: true,
				},
				{
					path: 'taskManage/createTask',
					name: 'createTask',
					component: CreateTask,
					noMenu: true,
				},
				/**
				 * 脚本管理
				 */
				{
					path: 'scriptManage',
					name: 'scriptManage',
					component: ScriptManage,
					noMenu: true,
				},
				/**
				 * 脚本管理-录制脚本
				 */
				{
					path: 'scriptManage/recordeScript',
					name: 'recordeScript',
					component: recordeScript,
					noMenu: true,
				},
			]
		}
	]
});
//定义全局导航守卫
router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		sessionStorage.removeItem('user');
		next()
	} else {
		next()
		/* let user = JSON.parse(localStorage.getItem('user'));
		if(!user){
		  next({ path:'/login' })
		} else {
		  next()
		} */
	}
});

export default router

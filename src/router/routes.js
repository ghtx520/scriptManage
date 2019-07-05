import Home from "../views/Index"
import Main from "../views/Main"

//单独路由
export const loginPage = {
	path: '/login',
	name: 'login',
	component: () => import("../views/Login")
}
export const errorPage = [
	// { path:'*',components: () => import("../views/404") },
	{
		path: '/refresh',
		name: 'refresh',
		component: () => import("../views/Refresh")
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import("../views/404")
	},
]
//不属于左侧菜单显示的路由(例选择项目页面)，包含头部信息
export const IndexPage = [{
	path: '/index',
	name: 'index',
	component: Home,
	childrens: [{
		path: '/choose',
		name: 'choose',
		component: () => import("../views/project/ProjectChoose")
	}]
}]
//属于左侧菜单的的路由(可根据用户权限选择不同的左侧菜单栏)
export const appRouterAdmin = [{
	path: '/project',
	component: Main,
	childrens: [{
			path: 'list',
			title: '项目管理>项目列表',
			name: 'proList',
			component: () => import("../views/project/ProjectList")
		},
		{
			path: 'edit/:type/:id',
			name: 'proEdit',
			component: () => import("../views/project/ProjectEdit")
		},
	]
}]

export const routers = [
	loginPage,
	...errorPage,
	...IndexPage
]

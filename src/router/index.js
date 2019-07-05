import Vue from "vue"
import VueRouter from "vue-router"
import {
	routers
} from "../router/routes"
Vue.use(VueRouter)

const router = new VueRouter({
	scrollBehavior: () => ({
		y: 0
	}),
	routes: routers
});
//定义全局导航守卫
router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		sessionStorage.removeItem('user');
		next()
	} else {
		next()
		/* let user = JSON.parse(sessionStorage.getItem('user'));
		if(!user){
		  next({ path:'/login' })
		} else {
		  next()
		} */
	}
});
export default router;

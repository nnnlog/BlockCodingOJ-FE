import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Problem from '@/views/Problem.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Logout from "@/views/Logout";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/problem/:id',
		name: 'Problem',
		component: Problem
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router

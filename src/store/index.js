import {createStore} from 'vuex';
import api from '@/api';

export default createStore({
	state: {
		title: "Block Coding OJ",
		id: null
	},
	mutations: {
		setTitle(state, title) {
			state.title = title;
		},
		setLoginDataFromPW(state, {id, jwt}) {
			state.id = id;
			if (jwt !== undefined) localStorage.token = jwt;
		}
	},
	actions: {
		setTitle({commit}, title) {
			commit('setTitle', title);
		},
		setId({commit}, id) {
			commit('setLoginDataFromPW', {id});
		},
		async login({commit}, {id, pw}) {
			let ret = await api.auth.login(id, pw);
			if (!ret) {
				//alert("로그인을 실패했습니다.");
				return false;
			}
			commit('setLoginDataFromPW', {
				id,
				jwt: ret
			});
			return true;
		},
	},
	getters: {
		title(state) {
			return state.title;
		},
		id(state) {
			return state.id
		},
		isLogin(state) {
			return state.id !== null;
		}
	}
})

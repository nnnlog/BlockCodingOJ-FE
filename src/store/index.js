import {createStore} from 'vuex'

export default createStore({
	state: {
		title: "Block Coding OJ"
	},
	mutations: {
		setTitle(state, title) {
			state.title = title;
		}
	},
	actions: {
		setTitle({commit}, title) {
			commit('setTitle', title);
		}
	},
	getters: {
		title(state) {
			return state.title;
		}
	}
})

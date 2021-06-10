const axios = require("axios");
const qs = require("querystring");

axios.interceptors.response.use(res => res, err => err.response);

const HOST = 0 ? location.origin : "http://127.0.0.1";

const request = async (url, param = {}, body = null) => {
	let token = localStorage.token;
	let res = await axios(`${HOST}/api/${url}${Object.values(param).length ? '?' : ''}${qs.encode(param)}`, {
		method: body ? "POST" : "GET",
		data: body,
		headers: {
			Authorization: token ? token : undefined,
		},
	});
	let data = res.data;
	if (data.message !== undefined) {
		alert(data.message);
	} else if (data.status !== 0) {
		//alert("오류가 발생했습니다.");
	}
	return data;
};

module.exports = {
	auth: {
		async register(id, pw) {
			return (await request("auth/register", {}, {id, pw})).status;
		},
		async login(id, pw) {
			return (await request("auth/login", {}, {id, pw})).result;
		},
		async user() {
			return (await request("auth/user")).result;
		},
		async logout() {
			return (await request("auth/logout")).result;
		},
	},
	problem: {
		async getRecentList() {
			return (await request("prob/recent")).result;
		},
		async getProblemFromId(id) {
			return (await request(`prob/${id}/`)).result;
		}
	},
	submission: {},
};

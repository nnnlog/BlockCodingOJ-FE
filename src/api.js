const axios = require("axios");
const qs = require("querystring");

axios.interceptors.response.use(res => res, err => err.response);

const request = async (url, param = {}, body = null) => {
	let res = await axios(`${location.origin}/api/${url}?${qs.encode(param)}`, {
		method: body ? "POST" : "GET",
		data: body
	});
	let data = res.data;
	if (data.message !== undefined) {
		alert(data.message);
	}
	return data;
};

let problem_temp_data = [
	{id: "1", title: "Hello, World!", accepted: 10, submit: 11},
	{id: "2", title: "A + B", accepted: 2, submit: 2},
];

module.exports = {
	auth: {},
	problem: {
		getRecentList() {
			return problem_temp_data;
		},
		getProblemFromId(id) {
			for (let obj of problem_temp_data) {
				if (id.toString() === obj.id) return obj;
			}
			return {};
		}
	},
	submission: {},
};

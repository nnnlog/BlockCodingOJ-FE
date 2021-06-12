let obj = {
	0: "채점 중",
	1: "AC",
	2: "WA",
	3: "RTE",
	4: "TLE",
	5: "MLE",
	6: "CLE",
};
module.exports = {
	toString: code => obj[code] || 'Unknown',
}
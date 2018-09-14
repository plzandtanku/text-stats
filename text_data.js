function getCommon(data) {
	let max = 0;
	let item = "";
	Object.keys(data).forEach(function(key) {
		let value = data[key];
		if (parseInt(value) > max) {
			item = key;
			max = value;
		}
	});
	return item;
}

function getTopCommon(data) {
	let max = 0;
	let item = "";
	let sorted =	Object.keys(data).sort(function(a,b) {
		return data[a]-data[b];
	});
	sorted.forEach(function(e) {
		console.log(e + " " + data[e]);
	});
}

module.exports.getCommon = getCommon;
module.exports.getTopCommon = getTopCommon;

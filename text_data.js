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
	Object.keys(data).forEach(function(key) {
		let value = data[key];
		if (parseInt(value) > max) {
			item = key;
			max = value;
		}
	});
	return item;
}

module.exports.getCommon = getCommon;

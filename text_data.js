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

function getTopCommon(data, length) {
	let max = 0;
	let item = "";
	let sorted = Object.keys(data).sort(function(a,b) {
		return data[b]-data[a];
	});	
	sorted = sorted.slice(0,length);
	sorted.forEach(function(e) {
		console.log(e + " " + data[e]);
	});
}

function getLongest(data) {
	let max = 0;
	let longest = "";
	Object.keys(data).forEach(function(key) {
		if (key.length > max){
			longest = key;
			max = key.length;
		}
	});
	return longest;
}
module.exports.getCommon = getCommon;
module.exports.getTopCommon = getTopCommon;
module.exports.getLongest = getLongest;
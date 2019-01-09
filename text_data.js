// data: map of [word] => count
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

// data: map of [word] => count
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

// data map of [length] => map of [word] => count
function getLongest(data) {
	let max = 0;
	let longest = "";
	Object.keys(data).forEach(function(length) {
		if (length > max){
			longest = key;
			max = key.length;
		}
	});
	return longest;
}

function _isPalindrome(word){
	let i = 0;
	let j = word.length-1;
	while (i < j){
		if (word.charAt(i) !== word.charAt(j)) return false;
		i++;
		j--;
	}
	return true;
}
// data map of [length] => map of [word] => count
function getPalindromes(data) {
	Object.keys(data).forEach(function(length) {
		Object.keys(data[length]).forEach(function(word) {
			if (_isPalindrome(word)) console.log(word);
		});
	});
}

module.exports.getCommon = getCommon;
module.exports.getTopCommon = getTopCommon;
module.exports.getLongest = getLongest;
module.exports.getPalindromes = getPalindromes;
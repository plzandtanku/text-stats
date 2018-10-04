let fs = require('fs');
let ts = require('./text_data');
let commandLineArgs = require('command-line-args');
let commandLineUsage = require('command-line-usage');
let req = require('request');

const def = [
	{ name: 'file', alias: 'f', type: String, typeLabel: '{underline file}', description: 'The text file to read from' },
	{ name: 'wiki', alias: 'w', type: String, description: 'The wiki article to read from' },
	{ name: 'help', alias: 'h', defaultOption: true },
];

const usage = [
	{
		header: 'text-stats.js',
		content: 'Usage: node text-stats.js [options]'
	},
	{
		header: 'Options',
		optionList: def,
	},
];

let options = commandLineArgs(def);

// get stats for a file
if (options.hasOwnProperty("file")) {
	let filename = options.file;

	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;
		parseFile(data);	
	});
}
else if (options.hasOwnProperty("wiki")) {
	// do stats for a wiki article plain text via API call
	let url = "https://en.wikipedia.org/w/api.php";
	let params = {
		action: "parse",
		page: "The_Simpsons",
		format: "json",
	};
	url = "https://en.wikipedia.org/w/api.php?action=parse&page=The_Simpsons&format=json";
	req(url, (err, res, body) => {
		let data = JSON.parse(body).parse.text["*"];
		parseFile(data);
	});
}
else {
	console.log(commandLineUsage(usage));
}

/**
 * Do some parsing
 * Keep only alphanumeric characters, but ignore entirely numeric entries
 **/
function parseFile(data){
	data.replace(/>/, "> ");
	let arr = data.split(" ");
	arr = arr.filter(function(item) {
		let regex = /^\w+$/;
		let regex2 = /^\d+$/;
		return regex.test(item) && !regex2.test(item);; 
	});
	let map = {};
	arr.forEach(function(item) {
		if (map.hasOwnProperty(item)) {
			map[item]++;
		}
		else {
			map[item] = 1;
		}
	});
//	console.log(map);
	ts.getTopCommon(map);
}

// WIP
function getStats(data) {
	let arr = data.split(" ");
	console.log(arr);
}

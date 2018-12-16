let fs = require('fs');
let ts = require('./text_data');
let commandLineArgs = require('command-line-args');
let commandLineUsage = require('command-line-usage');
let req = require('request');

const def = [
	{ name: 'file', alias: 'f', type: String, typeLabel: "filename", description: 'The text file to read from' },
	{ name: 'wiki', alias: 'w', type: String, typeLabel: 'article_name', description: 'The wiki article to read from' },
	{ name: 'debug', alias: 'd', type: Boolean, description: 'Debug flag' },
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
let debug = options.hasOwnProperty("debug");
// get stats for a file
if (options.hasOwnProperty("file")) {
	let fileName = options.file;

	fs.readFile(fileName, 'utf8', function(err, data) {
		if (err) throw err;
		parseData(data);	
	});
}
else if (options.hasOwnProperty("wiki")) {
	let articleName = options.wiki;
	// do stats for a wiki article plain text via API call
	let url = "https://en.wikipedia.org/w/api.php";
	// params API not working 
	let params = {
		action: "parse",
		page: articleName,
		format: "json",
	};
	// just do URL for now
	url = "https://en.wikipedia.org/w/api.php?action=parse&page=" + articleName + "&format=json";
	req(url, (err, res, body) => {
		if (debug) console.log(url);
		let data = JSON.parse(body).parse.text["*"];
		parseData(data);
	});
}
else {
	console.log(commandLineUsage(usage));
}

/**
 * Do some parsing
 * Keep only alphanumeric characters, but ignore entirely numeric entries
 **/
function parseData(data){
	data.replace(/>/, "> ");
	let arr = data.split(" ");
	arr = arr.filter(function(item) {
		let regex = /^\w+$/;
		let regex2 = /^\d+$/;
		return regex.test(item) && !regex2.test(item);; 
	});
	let map = {};
	// word count
	arr.forEach(function(item) {
		item = item.toLowerCase();
		let size = item.length;
		if (map.hasOwnProperty(size)) {
			let wordMap = map[size];
			if (wordMap.hasOwnProperty(item)) wordMap[item]++;
			else wordMap[item] = 1;
		}
		else {
			map[size] = {};
			map[size][item] = 1;
		}
	});
	if (debug) console.log(map);
	Object.keys(map).forEach(function (key){
		let wordMap = map[key];
		console.log(key+"----------");
		ts.getTopCommon(wordMap, 10);
		console.log(ts.getCommon(wordMap));
		//console.log(ts.getLongest(wordMap));		
	});

}



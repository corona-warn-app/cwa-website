import ApexCharts from 'apexcharts'
import { DateTime } from 'luxon';
import _get from 'lodash/get';
import _set from 'lodash/set';


import translate from '../translate.js';

import chartConfig from './config.js';
import chartOptions from './options.js';


const documentLang = document.documentElement.lang;
const lang = (documentLang == "de")? 'de-DE': 'en-US';


function getIndex(obj, mode, key){
	const keys = _get(obj, ["keys", mode]);
	return keys.indexOf(key);
}

function timeFN(value, range, mode){
	// return format for weeky mode
	if(mode == "weekly") return  DateTime.fromMillis(value).toFormat((documentLang == "de")? "'KW' W": "'CW' W");

	const formats = {
		"de": [
			"MMM yy",
			"d.LLL",
			"MMM yy"
		],
		"en": [
			"MMM yy",
			"d/LLL",
			"MMM yy"
		]
	};

	let index = 0;

	if(range <= 28 ){
		index = 1;
	}else if(range <= 90 ){
		index = 2;
	}

	return DateTime.fromMillis(value).toFormat( _get(formats, [documentLang, index], ""))
}




export default function(e, i){

	const mode = (e.switchId == 3)? "weekly": "daily"; 
	const barThreshold = (mode == "daily")? 90: 400;

	let opt = Object.assign({}, chartOptions);
	opt.chart.id = `chart${i}`;

	let chartConfigObj = _get(chartConfig, [opt.chart.id, e.switchId], []);
	if(Array.isArray(chartConfigObj)){
		chartConfigObj = _get(chartConfigObj, [(opt.chart.id == "chart1")? e.tabs1: (opt.chart.id == "chart2")? e.tabs2:[]], []);
	}

	opt.chart.type = _get(chartConfigObj, ["type"], "line");
	if(opt.chart.type == "bar"){
		opt.chart.type =  (e.data.range <= barThreshold)? opt.chart.type: "line";
	}
	


	opt.chart.stacked = _get(chartConfigObj, ["stacked"], false);

	const chartObj = _get(chartConfigObj, ["series"], []);
	
	_set(opt, "xaxis.labels.formatter", value => timeFN(value, e.data.range, mode));

	opt.series = chartObj.map((obj)=>{
		const index = getIndex(e.data, mode, obj.data);
		return {
			color: (obj.color)? obj.color: undefined,
			type: (obj.type)? (e.data.range <= barThreshold)? obj.type: "line": opt.chart.type,
			name: (obj.name)? obj: translate(obj.data),
			data: e.data.data[mode]
				.filter(f => f[index] != null)
				.map(m => 
					[
						m[0], 
						m[index]
					]
				)
			}
	});

	ApexCharts.exec(opt.chart.id, "updateOptions", opt, true)
	console.log("chart update", opt.chart.id, e, opt)
		
};
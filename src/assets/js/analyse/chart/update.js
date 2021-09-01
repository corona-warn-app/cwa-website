import ApexCharts from 'apexcharts'
import _get from 'lodash/get';
import _set from 'lodash/set';


import translate from '../translate.js';

import chartConfig from './config.js';
import chartOptions from './options.js';



function getBarThreshold(opt){
	const mode = _get(opt, ["mode"], "daily");	
	const mobile = (window.matchMedia("(max-width: 992px)").matches);
	const value = (mobile)? [30, 100]: [90, 400];
	const barThreshold = (mode == "daily")? value[0]: value[1];
	return (opt.range <= barThreshold);
}

export default function(e, i){
	let opt = Object.assign({}, chartOptions);
	_set(opt, ["chart", "id"], `chart${i}`);
	_set(opt, ["mode"], (e.switchId == 3)? "weekly": "daily");
	_set(opt, ["range"], e.data.range);
	_set(opt, ["barThreshold"], getBarThreshold(opt));

	let chartConfigObj = _get(chartConfig, [opt.chart.id, e.switchId], []);
	if(Array.isArray(chartConfigObj)){
		chartConfigObj = _get(chartConfigObj, [(opt.chart.id == "chart1")? e.tabs1: (opt.chart.id == "chart2")? e.tabs2: []], []);
	}


	let chartType = _get(chartConfigObj, ["type"], "line");
	chartType = (chartType == "bar")? (opt.barThreshold)? chartType: "line": chartType;
	_set(opt, ["chart", "type"], chartType);

	_set(opt, ["chart", "stacked"], _get(chartConfigObj, ["stacked"], false));

	opt.seriesall = _get(chartConfigObj, ["series"], []).map((obj)=>{
		const index = _get(e.data, ["keys", opt.mode], []).indexOf(obj.data);
		return {
			ghost: obj.ghost,
			color: (obj.color)? obj.color: undefined,
			type: (obj.type)? (opt.barThreshold)? obj.type: "line": opt.chart.type,
			name: (obj.name)? translate(obj.name): translate(obj.data),
			data: e.data.data[opt.mode]
				.filter(f => f[index] != null)
				.map(m => 
					[
						m[0], 
						m[index]
					]
				)
			}
	});

	opt.series = opt.seriesall.filter(e => !e["ghost"]);
	ApexCharts.exec(opt.chart.id, "updateOptions", opt, true);
	console.log("chart update", opt.chart.id, e, opt);
		
};
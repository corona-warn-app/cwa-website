import ApexCharts from 'apexcharts'
import _get from 'lodash/get';

import translate from '../translate.js';

import chartConfig from './config.js';
import chartOptions from './options.js';


const mobile = (window.matchMedia("(max-width: 992px)").matches);
const value = (mobile)? [30, 100]: [90, 400];
const barThreshold = {
	"daily": value[0],
	"weekly": value[0]
};



export default function(e, i){
	let opt = Object.assign({}, chartOptions);
	opt.chart.id = `chart${i}`;
	opt.mode = (e.switchId == 3)? "weekly": "daily";
	opt.range = e.data.range;
	opt.barThreshold = (opt.range <= barThreshold[opt.mode]);

	let chartConfigObj = _get(chartConfig, [opt.chart.id, e.switchId], []);
	if(Array.isArray(chartConfigObj)){
		chartConfigObj = _get(chartConfigObj, [(opt.chart.id == "chart1")? e.tabs1: (opt.chart.id == "chart2")? e.tabs2: []], []);
	}

	const chartType = _get(chartConfigObj, ["type"], "line");
	opt.chart.type = (chartType == "bar")? (opt.barThreshold)? chartType: "line": chartType;
	opt.chart.stacked = _get(chartConfigObj, ["stacked"], false);

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
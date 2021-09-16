import ApexCharts from 'apexcharts'
import _get from 'lodash/get';
import _set from 'lodash/set';
import { DateTime } from 'luxon';

import lock from '../lock.js';
import translate from '../translate.js';

import { checkLegendReset, renderLegend } from './legend.js';
import chartConfig from './config.js';

const barThreshold = {
	"daily": (window.matchMedia("(max-width: 992px)").matches)? 30: 90,
	"weekly": (window.matchMedia("(max-width: 992px)").matches)? 100: 400
};

export default function(e, i){
	const id = `chart${i}`;
	lock.set(id);
	
	let chartConfigObj = _get(chartConfig, [id, e.switchId], []);
	if(Array.isArray(chartConfigObj)){
		chartConfigObj = _get(chartConfigObj, [(id == "chart1")? e.tabs1: (id == "chart2")? e.tabs2: []], []);
	}

	const mode = (e.switchId == 3)? "weekly": "daily";
	const chartType = _get(chartConfigObj, ["type"], "line");
	const barthreshold = (e.data.range <= barThreshold[mode]);
	const type = (chartType == "bar")? (barthreshold)? chartType: "line": chartType;

	let opt = {
		chart:{
			id,
			type,
			stacked: _get(chartConfigObj, ["stacked"], false)
		},
		mode,
		range: e.data.range,
		barthreshold,
		seriesall: _get(chartConfigObj, ["series"], []).map(obj => {
			const index = _get(e.data, ["keys", mode], []).indexOf(obj.data);

			e.data.data["weekly"] =  e.data.data["weekly"].map(e => { e[0] = DateTime.fromISO(e[0]).startOf('week').toISODate(); return e})
			return {
				ghost: obj.ghost,
				color: (obj.color)? obj.color: undefined,
				type: (obj.type)? (barthreshold)? obj.type: "line": type,
				name: (obj.name)? translate(obj.name): translate(obj.data),
				data: e.data.data[mode].filter(f => f[index] != null).map(m => [m[0], m[index]]),
				key: obj.data
			}
		})
	};



	// set series without the ghots
	const series = opt.seriesall.filter(e => !e.ghost);
	
	series.push({
		color: "#000000",
		data: e.data.nullhelper[mode],
		type: "line",
		name: "helper"
	});

	_set(opt, ["series"], series);

	// set dasharray for legend and switch 4
	_set(opt, ["stroke", "dashArray"], (e.switchId == 4)? opt.seriesall.filter(e => !e.ghost).map(obj => (!!~obj.key.indexOf("_daily"))? 5: 0): []);


	//Only reset series if necessary
	checkLegendReset(opt, () => {
		ApexCharts.exec(id, "resetSeries", true, false);
	});

	// update chart options
	ApexCharts.exec(id, "updateOptions", opt, true, true, false);

	// render custom legend
	renderLegend(opt);

	console.log("chart update", id, e, opt);
};
import ApexCharts from 'apexcharts'
import _get from 'lodash/get';
import _set from 'lodash/set';

import lock from '../lock.js';
import translate from '../translate.js';
import { totalValuesUpdate } from '..//totalValues.js';

import { checkLegendReset, renderLegend } from './legend.js';
import chartConfig from './config.js';

export default function({
		barthreshold, 
		categories,
		data, 
		date, 
		keys, 
		mode, 
		range, 
		reallabels, 
		switchId, 
		tabs1, 
		tabs2, 
		tooltipDate,
		updated
	},
	i
 )
{
	const id = `chart${i}`;
	lock.set(id);

	if(i == 1){
		// switch title on chart1 tabs 
		$(`.${id}`).find(".analyseBoard-title .analyseBoard-title-title").html(translate(["analyseBoardTitleTitle", i, tabs1]));
	}

	if(i == 1 || i == 2){
		// update total values based on selected tabs
		totalValuesUpdate($(`.${id}`).find(".analyseBoard-total-value"), i, ((i == 1)? tabs1: (i == 2)? tabs2: 0));
	}

	
	let chartConfigObj = _get(chartConfig, [id, switchId], []);
	if(Array.isArray(chartConfigObj)){
		chartConfigObj = _get(chartConfigObj, [(id == "chart1")? tabs1: (id == "chart2")? tabs2: []], []);
	}

	const chartType = _get(chartConfigObj, ["type"], "line");
	const type = (chartType == "bar")? (barthreshold)? chartType: "line": chartType;

	
	let opt = {
		chart: {
			id,
			type,
			stacked: _get(chartConfigObj, ["stacked"], false)
		},
		seriesall: _get(chartConfigObj, ["series"], []).map(obj => {
			return {
				ghost: obj.ghost,
				color: (obj.color)? obj.color: undefined,
				type: (obj.type)? (barthreshold)? obj.type: "line": type,
				name: (obj.name)? translate(obj.name): translate(obj.data),
				data: (keys.indexOf(obj.data) >= 0)? data.map(m => m[keys.indexOf(obj.data)]): [],
				key: obj.data
			}
		})
	};

	// add only if needed
	if(updated){
		opt = Object.assign(opt, {mode, reallabels, tooltipDate, xaxis: {categories}})
	}

	// set series without the ghots
	let series =  opt.seriesall.filter(e => !e.ghost);

	// add fake series in order to conter width render bug
	series.unshift({
		color: "#000000",
		data: new Array(range).fill(null),
		name: "_hide",
		type: "line"
	});

	_set(opt, ["series"], series);

	// set dasharray for legend and switch 4
	_set(opt, ["stroke", "dashArray"], (switchId == 4)? opt.seriesall.filter(e => !e.ghost).map(obj => (!!~obj.key.indexOf("_daily"))? 5: 0): new Array(opt.series.filter(e => (e.name != "_hide")).length).fill(0));

	//Only reset series if necessary
	checkLegendReset(opt, () => {
		ApexCharts.exec(id, "resetSeries", true, false);
	});

	// update chart options
	ApexCharts.exec(id, "updateOptions", opt, true, false, false);

	// hide added fake series
	ApexCharts.exec(id, "hideSeries", "_hide")


	// render custom legend
	renderLegend(opt);

	console.log("chart update", id, opt);
};
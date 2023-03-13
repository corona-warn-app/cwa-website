import ApexCharts from 'apexcharts'
import _get from 'lodash/get';
import _set from 'lodash/set';

import translate from '../translate.js';
import { totalValuesUpdate } from '../totalValues.js';
import { debugLog, debugTime, debugTimeEnd } from '../debug.js';

import { checkLegendReset, renderLegend } from './legend.js';
import chartConfig from './config.js';



const delay = ms => new Promise(res => setTimeout(res, ms));

const update = async function({
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

	$(`.analyseBoard-loading[data-id="${id}"]`).addClass("active");
	await delay(100);
	debugTime('updateOptions' + id)
	
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
	const type = (chartType == "bar")? (barthreshold)? chartType: "area": chartType;

	
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

	// set series without the ghosts
	_set(opt, ["series"], opt.seriesall.filter(e => !e.ghost));

	// set dasharray for legend and switch 4
	_set(opt, ["stroke", "dashArray"], (switchId == 4)? opt.seriesall.filter(e => !e.ghost).map(obj => (!!~obj.key.indexOf("_daily"))? 5: 0): new Array(opt.series.length).fill(0));

	//Only reset series if necessary
	checkLegendReset(opt, () => {
		ApexCharts.exec(id, "resetSeries", true, false);
	});

	
	// update chart options
	ApexCharts.exec(id, "updateOptions", opt, true, false, false);
	
	

	// render custom legend
	renderLegend(opt);
	debugTimeEnd('updateOptions'+id)
	debugLog("chart update", id, opt);
};

export {
	update
}
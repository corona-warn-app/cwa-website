import $ from 'jquery';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _chunk from 'lodash/chunk';
import translate from '../translate.js';

let resetSeriesCheck = {};

function renderLegend(opt){
	// render custom legend
	const $e  = $("#apexcharts" + opt.chart.id).parent().next();
	const labels = [translate("legendLabelMean"), translate("legendLabelDaily")];
	const series = opt.series.filter(e => (e.name != "_hide"));
	let outArray = opt.stroke.dashArray.map((e, i) => `<button style="color: ${series[i].color};" data-exec='["${opt.chart.id}", "toggleSeries","${series[i].name}"]' class="btn analyseChartLegend-item ${(e == 5)? 'analyseChartLegend-item_d': ''}"><span>${series[i].name}</span></button>`);
	if(opt.stroke.dashArray.indexOf(5) > 0){
		outArray = _chunk(outArray, opt.stroke.dashArray.length / 2).map((e, i) => `<div class="analyseChartLegend-row"><div class="analyseChartLegend-label">${labels.shift()}</div>${e.join("")}</div>`);
	}
	$e.html(outArray.join(""));
}

$(document).on("click",".analyseChartLegend-item", function() {
	const exec = $(this).data("exec");
	if(!Array.isArray(exec)) return;  
	$(this).toggleClass("deactive", !ApexCharts.exec(...exec))
	_set(resetSeriesCheck, [exec[0]], ($(".analyseChartLegend-item.deactive").length > 0));
});


function checkLegendReset(opt,cb){
	if(_get(resetSeriesCheck, [opt.chart.id], false)){
		_set(resetSeriesCheck, opt.chart.id, false);
		cb();
	}
}


export {
	checkLegendReset, 
	renderLegend
};
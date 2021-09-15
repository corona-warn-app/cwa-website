import $ from 'jquery';
import _set from 'lodash/set';
import _get from 'lodash/get';
import translate from '../translate.js';

let resetSeriesCheck = {};

function renderLegend(opt){
	// render custom legend
	const $e  = $("#apexcharts" + opt.chart.id ).parent().next();
	const labels = [translate("legendLabelMean"), translate("legendLabelDaily")];
	const outArray = opt.seriesall.filter(a => (!a.ghost)).map((e, i) => `
		${(i == opt.stroke.dashArray.indexOf(5))? `</div><div class="analyseChartLegend-row">`: ""}
		${(opt.stroke.dashArray.indexOf(5) >= 0 && (i === 0 || i == opt.stroke.dashArray.indexOf(5)))? `<div class="analyseChartLegend-label">${labels.shift()}</div>`: ""}
		<button style="color: ${e.color};" data-id="${opt.chart.id},${e.name}" class="btn analyseChartLegend-item ${(opt.stroke.dashArray.indexOf(5) >= 0 && i >= opt.stroke.dashArray.indexOf(5))? `analyseChartLegend-item_d`: ``}"><span>${e.name}</span></button>
	`);

	$e.html(`<div class="analyseChartLegend-row">${outArray.join("")}</div>`);
}

$(document).on("click",".analyseChartLegend-item", function() {
	const id = $(this).data("id").split(",");
	if(!Array.isArray(id)) return;  
	$(this).toggleClass("deactive", !ApexCharts.exec(id[0], "toggleSeries", id[1]))
	_set(resetSeriesCheck, [id[0]], ($(".analyseChartLegend-item.deactive").length > 0));
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
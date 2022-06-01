import $ from 'jquery';
import ApexCharts from 'apexcharts'
import screenfull from 'screenfull'

$(document).on("click",".analyseBoard-fullscreen", function(e){
	e.preventDefault()
	const $e = $(this).parents(".analyseBoard");
	const height = ($("body").hasClass("fullscreen"))? 230: (window.innerHeight - 220); 
	$e.add("body").toggleClass("fullscreen");

	ApexCharts.exec($(this).data("id"), "updateOptions", { chart: { height } }, true, false, false);

	if (screenfull.isEnabled) screenfull.toggle($e.first());
});

$(window).on("resize", function () {
	const $e = document.querySelector(".analyseBoard.fullscreen");
	if($e) {
		const padding = $($e).css('padding-top').replace("px","").split(" ");
		let tPadding = 0;
		padding.forEach(element => {
			tPadding += parseInt(element);
		});
		const spacing = $(".analyseBoard-head").height() + $(".analyseBoard-total").height() + $(".analyseChartLegend").height() + tPadding + 48;
		const height = window.innerHeight - spacing;
		ApexCharts.exec($(".analyseBoard-fullscreen").data("id"), "updateOptions", { chart: { height } }, true, false, false);
	}
});

export default null;
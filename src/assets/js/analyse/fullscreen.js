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



export default null;
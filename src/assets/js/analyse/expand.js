import $ from 'jquery';
import ApexCharts from 'apexcharts'



$(document).on("click",".analyseBoard-expand", function(){
	const $e = $(this).parents(".analyseBoard");
	const $p = $(".analyseBoards")
	const padding = $($e).css('padding-top').replace("px","").split(" ");
	let tPadding = 0;
	padding.forEach(element => {
		tPadding += parseInt(element);
	});
	const spacing = $(".analyseBoard-head").height() + $(".analyseBoard-total").height() + $(".analyseChartLegend").height() + tPadding + 48;
	const height = ($e.hasClass("expand"))? 230: (window.innerHeight - spacing);
	$(".analyseBoards").add($e).toggleClass("expand");
	ApexCharts.exec($(this).data("id"), "updateOptions", { chart: { height } }, true, false, false);
});

$(window).on("resize", function () {
	const $e = document.querySelector(".analyseBoard.expand");
	if($e) {
		const padding = $($e).css('padding-top').replace("px","").split(" ");
		let tPadding = 0;
		padding.forEach(element => {
			tPadding += parseInt(element);
		});
		const spacing = $(".analyseBoard-head").height() + $(".analyseBoard-total").height() + $(".analyseChartLegend").height() + tPadding + 48;
		const height = window.innerHeight - spacing;
		ApexCharts.exec($(".analyseBoard-expand").data("id"), "updateOptions", { chart: { height } }, true, false, false);
	}
});


export default null;
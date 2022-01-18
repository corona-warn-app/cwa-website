import $ from 'jquery';
import ApexCharts from 'apexcharts'



$(document).on("click",".analyseBoard-expand", function(){
	const $e = $(this).parents(".analyseBoard");
	const $p = $(".analyseBoards")

	const height = ($e.hasClass("expand"))? 230: window.innerWidth > window.innerHeight ? (window.innerHeight - 220) : (window.innerWidth - 370);
	$(".analyseBoards").add($e).toggleClass("expand");
	ApexCharts.exec($(this).data("id"), "updateOptions", { chart: { height } }, true, false, false);
});



export default null;
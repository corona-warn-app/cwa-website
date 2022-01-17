import $ from 'jquery';
import ApexCharts from 'apexcharts'



$(document).on("click",".analyseBoard-expand", function(){
	const $e = $(this).parents(".analyseBoard");
	const $p = $(".analyseBoards")

	const height = ($e.hasClass("expand"))? 230 : 690; 
	$(".analyseBoards").add($e).toggleClass("expand");
	ApexCharts.exec($(this).data("id"), "updateOptions", { chart: { height } }, true, false, false);
});



export default null;
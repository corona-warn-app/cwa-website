import $ from 'jquery';
import ApexCharts from 'apexcharts'

$(document).on("click",".analyseBoard-download", function(){
	const id = $(this).data("id");
	const dataURL = ApexCharts.exec(id, "dataURI");

	dataURL.then(({ imgURI, blob }) => {
		const $e = $(this).parents(".analyseBoard");
		const title = $e.find(".analyseBoard-title-title").text();
		const append = $e.find(".analyseBoard-title-append").text();
		const date = $("input[name='analyseRange']:checked").val().replaceAll(",", "-");

		let filename = `${title}${(append)? " " + append: ""} ${date}.png`;
		filename = filename.replaceAll(/\(|\)/ig, "").replaceAll(" ", "-").toLowerCase();

		var a = document.createElement("a");
		a.download = filename;
		a.href = imgURI;
		a.click();
	});
});

export default null;
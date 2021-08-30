const $ = window.jQuery;



$(document).on("click",".analyseBoard-info", function(e){
	e.preventDefault();
	console.log("dddd")
	const rel = $(this).attr("rel")

	$(`.analyseModal[rel="${rel}"], .analyseModalBg`).addClass("active")
})

$(document).on("click",".analyseModal-close", function(e){
	e.preventDefault()

	$(".analyseModal, .analyseModalBg").removeClass("active")
})





export default null;
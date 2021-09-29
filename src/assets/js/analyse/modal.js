import $ from 'jquery';

$(document).on("click",".analyseBoard-info", function(e){
	e.preventDefault();
	$(`.analyseModal[rel="${$(this).attr("rel")}"], .analyseModalBg`).addClass("active")
});

$(document).on("click",".analyseModal-close", function(e){
	e.preventDefault()
	$(".analyseModal, .analyseModalBg").removeClass("active")
});

export default null;
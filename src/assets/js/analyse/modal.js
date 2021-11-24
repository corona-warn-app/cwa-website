import $ from 'jquery';

$(document).on("click",".analyseBoard-info", function(e){
	e.preventDefault();
	$(`.analyseModal[rel="${$(this).attr("rel")}"], .analyseModalBg`).addClass("active")
});

$(document).on("click",".analyseModal-close", function(e){
	e.preventDefault()
	$(".analyseModal, .analyseModalBg").removeClass("active")
});

$(document).on("click",".analyseBoard-info.info-textblock", function(e){
	e.preventDefault();
	$(`.analyseModalInfo[rel="${$(this).attr("rel")}"], .analyseModalBg`).addClass("active")
});

$(document).on("click",".analyseModalInfo-close", function(e){
	e.preventDefault()
	$(".analyseModalInfo, .analyseModalBg").removeClass("active")
});

export default null;
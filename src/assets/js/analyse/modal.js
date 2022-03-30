import $ from 'jquery';

$(document).keyup((e) => {
	if (e.key === "Escape") {
		$(".analyseModal, .analyseModalInfo, .analyseModalBg").removeClass("active");
	}
})

$(document).on("click",".analyseBoard-info", function(e){
	e.preventDefault();
	$(`.analyseModal[rel="${$(this).attr("rel")}"], .analyseModalBg`).addClass("active")
	$(`.analyseModal[rel="${$(this).attr("rel")}"]`).find('.analyseModal-close').focus()
});

$(document).on("click",".analyseModal-close", function(e){
	e.preventDefault()
	$(".analyseModal, .analyseModalBg").removeClass("active")
});

$(document).on("click",".analyseBoard-info.info-textblock", function(e){
	e.preventDefault();
	$(`.analyseModalInfo[rel="${$(this).attr("rel")}"], .analyseModalBg`).addClass("active")
	$(`.analyseModalInfo[rel="${$(this).attr("rel")}"]`).find('.analyseModalInfo-close').focus()
});

$(document).on("click",".analyseModalInfo-close", function(e){
	e.preventDefault()
	$(".analyseModalInfo, .analyseModalBg").removeClass("active")
});

export default null;
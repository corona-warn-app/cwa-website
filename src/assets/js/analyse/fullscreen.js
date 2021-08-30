import screenfull from 'screenfull'
const $ = window.jQuery;


$(document).on("click",".analyseBoard-fullscreen", function(e){
	e.preventDefault()
	const $e = $(this).parents(".analyseBoard");
	$e.add("body").toggleClass("fullscreen");

	if (screenfull.isEnabled) screenfull.toggle($e.get(0));
});



export default null;
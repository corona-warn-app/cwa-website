import $ from 'jquery';
import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import translate from './translate.js';

const switchId$ = fromEvent(document.querySelectorAll(".analyseSwitch-item"), 'click')
	.pipe(
	    startWith({
			target: document.querySelector(".analyseSwitch-item.first")
		}),
		map(e => $(e.target).data("id"))
	);


const switchFN = (switchId => {
	const $e = $(`.analyseSwitch-item[data-id="${switchId}"]`);
	
	$e
		.addClass("active")
		.siblings()
		.removeClass("active");

	$(".analyseSwitch-bg")
		.css("left", $e.position().left)
		.css("width", $e.outerWidth());

	$(".analyseBoard-title .analyseBoard-title-append").each(function(){
		$(this).html(translate(["analyseBoardTitleAppend", switchId]))
	});
});

export {
	switchId$,
	switchFN
};
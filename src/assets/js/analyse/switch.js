import $ from 'jquery';
import { fromEvent } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import lock from './lock.js';
import translate from './translate.js';

const switchId$ = fromEvent(document.querySelectorAll(".analyseSwitch-item"), 'click')
	.pipe(
	    startWith({
			target: document.querySelector(".analyseSwitch-item.first")
		}),
		takeWhile(val => lock.state)
	);

switchId$.subscribe(e => {
	const $e = $(e.target);
	const switchId = $e.data("id");
	
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

export default switchId$.pipe(map(e => $(e.target).data("id")));
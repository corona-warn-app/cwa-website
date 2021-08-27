import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const $ = window.jQuery;

console.log("switchId$")

const switchId$ = fromEvent(document.querySelectorAll(".analyseSwitch-item"), 'click')
	.pipe(
	    startWith({
			target: document.querySelector(".analyseSwitch-item.first")
		})
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

	$(".analyseBoard-title").each(function(){
		const title = $(this).data("title");
		$(this).html(title[switchId])
	})
});

export default switchId$.pipe(map(e => $(e.target).data("id")));
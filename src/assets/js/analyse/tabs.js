import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

var $ = window.jQuery;


console.log("tabs$")

const obsArray = [];

document.querySelectorAll(".analyseTabs").forEach((e) => {
	console.log(e)

	let tabs$ = fromEvent(e.querySelectorAll(".analyseTabs-item"), 'click')
	.pipe(
		startWith({
			target: e.querySelector(".analyseTabs-item.first")
		})
	); 

	tabs$.subscribe(e => {
		$(e.target)
			.addClass("active")
			.siblings()
			.removeClass("active");
	}); 

	tabs$ = tabs$.pipe(map(e => $(e.target).data("value")));



	obsArray.push(tabs$);
}); 


console.log(obsArray)

export default obsArray
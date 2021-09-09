import $ from 'jquery';
import { fromEvent } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import lock from './lock.js';

const obsArray = [];

document.querySelectorAll(".analyseTabs").forEach((e) => {
	let tabs$ = fromEvent(e.querySelectorAll(".analyseTabs-item"), 'click')
	.pipe(
		startWith({
			target: e.querySelector(".analyseTabs-item.first")
		}),
		takeWhile(val => lock.state)
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

export default obsArray
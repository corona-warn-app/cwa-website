import { DateTime, Settings } from 'luxon';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import picker from './picker.js';

Settings.defaultLocale = documentLang;

const dateLocaleFormat = { month: '2-digit', day: '2-digit', year: 'numeric' };
const now = DateTime.now().minus({days: 1});

function domReady(fn){
	document.addEventListener("DOMContentLoaded", fn);
	if (document.readyState === "interactive" || document.readyState === "complete" ){
		fn();
	}
}

document.querySelectorAll('.analyseRangeRadio input:checked').forEach(e => {
	e.checked = false
});

const date$ = fromEvent(document.querySelectorAll('input[name="analyseRange"]'), 'change')
				.pipe(map(e => e.target.value.split(",")));


document.querySelectorAll('.analyseRangeRadio input').forEach(e => {
	e.value = [
		(e.value == "all")? analyseConfig.startDate: now.minus((e.value == "6months")? {months: 6}: {days: 27}).toISODate(), 
		now.toISODate()
	].join(",");
});


date$.subscribe(ary => {
	picker.setDateRange(...ary);
	const a = ary.map(i => DateTime.fromISO(i).toLocaleString(dateLocaleFormat));
	document.querySelector('.analyseRangePicker-btn span').innerHTML = a.join(" - ");
	document.querySelector('.analyseRangePicker').classList.remove("active")
});


domReady(_ => {
	document.querySelector('.analyseRangeRadio.first input').click()
})

export default date$;
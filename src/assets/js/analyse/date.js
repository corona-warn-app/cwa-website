import { DateTime, Settings } from 'luxon';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import picker from './picker.js';

Settings.defaultLocale = documentLang;

const dateLocaleFormat = (documentLang == "de")? "dd'.'LL'.'yyyy": "dd'/'LL'/'yyyy";
const lastDay = (DateTime.local() < DateTime.fromISO("2023-02-16")) ? DateTime.local() : DateTime.fromISO("2023-02-16");

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
		(e.value == "all")? analyseConfig.startDate: lastDay.minus((e.value == "6months")? {months: 6}: {days: 27}).toISODate(), 
		lastDay.toISODate()
	].join(",");
});


date$.subscribe(ary => {
	picker.setDateRange(...ary);
	const a = ary.map(i => DateTime.fromISO(i).toFormat(dateLocaleFormat));
	document.querySelector('.analyseRangePicker-btn span').innerHTML = a.join(" - ");
	document.querySelector('.analyseRangePicker').classList.remove("active")
});


domReady(_ => {
	document.querySelector('.analyseRangeRadio.first input').click()
})

export default date$;

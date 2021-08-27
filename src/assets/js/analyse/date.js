import Litepicker from 'litepicker';
import Cleave from 'cleave.js';
import { DateTime, Settings } from 'luxon';
import { Subject } from 'rxjs';

const $ = window.jQuery;

const documentLang = document.documentElement.lang;
const lang = (documentLang == "de")? 'de-DE': 'en-US';
Settings.defaultLocale = documentLang;


const dateLocaleFormat = { month: '2-digit', day: '2-digit', year: 'numeric' };
const now = DateTime.now().minus({days: 1});

console.log("date")

const date$ = new Subject;

$(() => {

	$('.analyseRangeRadio input').each(function(){
		const v = $(this).val();
		const start = (v == "all")? '2020-01-01': now.minus((v == "6months")? {months: 6}: {days: 28}).toISODate();
		$(this).val([start, now.toISODate()].join(","))
	});

	$(document).on("change",".analyseRangeRadio input", function(e){
		date$.next($(this).val().split(","));
	});
	

	$('.analyseRangePicker-input').each(function(){
		new Cleave(this, {
		    date: true,
		    delimiter: (documentLang == "de")? '.': '/',
		    dateMin: '2020-01-01',
    		dateMax: now.toISODate(),
		    datePattern: (documentLang == "de")? ['d','m','Y']: ['m','d','Y'],
		    // onValueChanged: function (e) {
		 //    	if(e.target.rawValue.length != 8) return;
		 //    	const date = DateTime.fromFormat(e.target.value, "D");
		 //    	var dateFromPicker; 
		 //    	switch(e.target.name){
		 //    		case "start":
		 //    			dateFromPicker = picker.getStartDate().dateInstance;
		 //    			break;
		 //    		case "end":
		 //    			dateFromPicker = picker.getEndDate().dateInstance;
		 //    			break;
		 //    	}
		 //    	console.log(date,  dateFromPicker, DateTime.fromJSDate(dateFromPicker), DateTime.fromJSDate(picker.getEndDate().dateInstance));
			// }
		});
	});


	function pickerDateFormater(date){
		return (date)? DateTime.fromJSDate(date.dateInstance).toLocaleString(dateLocaleFormat): "";
	}

	const picker = new Litepicker({ 
		element: document.querySelector('.analyseRangePicker-picker'),
		inlineMode: true,
		autoApply: false,
		singleMode: false,
		lang: documentLang,
		numberOfColumns: 2,
		numberOfMonths: 2,
		minDate: '2020-01-01', 
		maxDate: now, 
		scrollToDate: false,
		autoApply: true,
		format: "YYYY-MM-DD",
		buttonText: {"previousMonth":'<svg width="17" height="16" viewBox="0 0 17 16"  xmlns="http://www.w3.org/2000/svg"><path style="transform-origin: center;transform: rotate(90deg);" d="M14.8236 6.33657L9.00004 12L3.17651 6.33657L4.55087 5L9.00004 9.34951L13.4492 5L14.8236 6.33657Z" fill="#3A3D3E"/></svg>',"nextMonth":'<svg width="17" height="16" viewBox="0 0 17 16"  xmlns="http://www.w3.org/2000/svg"><path style="transform-origin: center;transform: rotate(-90deg);" d="M14.8236 6.33657L9.00004 12L3.17651 6.33657L4.55087 5L9.00004 9.34951L13.4492 5L14.8236 6.33657Z" fill="#3A3D3E"/></svg>'},
		setup: (picker) => {

			picker.on('clear:selection', () => {
			   $(".analyseRangePicker-input").val("")
			});


		  	picker.on('selected', (date1, date2) => {
			   $(".analyseRangePicker-input-start").val(pickerDateFormater(date1))
			   $(".analyseRangePicker-input-end").val(pickerDateFormater(date2))
			});
		}
	});

	$(document).on("click",".analyseRangePicker-btn", function(e){
		if(picker.getStartDate()){
			picker.gotoDate(DateTime.fromJSDate(picker.getStartDate().dateInstance).toMillis());
		}
		$(".analyseRangePicker").toggleClass("active")
	});

	$(document).on("click",".analyseRangePicker-cancel", function(e){
		picker.clearSelection()
		$(".analyseRangePicker").removeClass("active")
	});

	$(document).on("click",".analyseRangePicker-apply", function(){
		if(!picker.getStartDate() || !picker.getEndDate()) return;
		$(".analyseRangeRadio input:checked").prop('checked', false);
		date$.next([
			DateTime.fromJSDate(picker.getStartDate().dateInstance).toISODate(), 
			DateTime.fromJSDate(picker.getEndDate().dateInstance).toISODate()
		]);
	});


	date$.subscribe(e => {
		picker.setDateRange(...e);
		$(".analyseRangePicker-btn span").html(`${DateTime.fromISO(e[0]).toLocaleString(dateLocaleFormat)} - ${DateTime.fromISO(e[1]).toLocaleString(dateLocaleFormat)}`);
		$(".analyseRangePicker").removeClass("active");
	});

	$(".analyseRangeRadio.first input").click();
})


export default date$;
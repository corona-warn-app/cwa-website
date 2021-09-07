import Litepicker from 'litepicker';
import Cleave from 'cleave.js';
import { DateTime, Settings } from 'luxon';
import { Subject } from 'rxjs';

import lock from './lock.js';

const $ = window.jQuery;

const documentLang = document.documentElement.lang;
const lang = (documentLang == "de")? 'de-DE': 'en-US';
Settings.defaultLocale = documentLang;

const dateLocaleFormat = { month: '2-digit', day: '2-digit', year: 'numeric' };
const now = DateTime.now().minus({days: 1});


const date$ = new Subject;

$(() => {

	$(".analyseRangeRadio input:checked").prop('checked', false);


	$('.analyseRangeRadio input').each(function(){
		const v = $(this).val();
		const start = (v == "all")? '2020-01-01': now.minus((v == "6months")? {months: 6}: {days: 28}).toISODate();
		$(this).val([start, now.toISODate()].join(","))
	});

	$(document).on("change",".analyseRangeRadio input", function(e){
		date$.next($(this).val().split(","));
	});


	$(document).on("focus",".analyseRangePicker-input", function(e){
		$(this).val("")
	});

	$(document).on("blur",".analyseRangePicker-input", function(e){
		setTimeout(() => {
			const name = $(this).attr("name")
			const dateFromPicker = (name == "start")? picker.getStartDate().dateInstance: picker.getEndDate().dateInstance; 
			$(this).val(DateTime.fromJSDate(dateFromPicker).toLocaleString(dateLocaleFormat));
		}, 400)
		
	});
	

	



	const pickerCols = (window.matchMedia("(max-width: 992px)").matches)? 1: 2;
	const picker = new Litepicker({ 
		parentEl: document.querySelector('.analyseRangePicker-picker'),
		element: document.querySelector('.analyseRangePicker-input-start'),
 	 	elementEnd: document.querySelector('.analyseRangePicker-input-end'),
		inlineMode: true,
		singleMode: false,
		lang: documentLang,
		numberOfColumns: pickerCols,
		numberOfMonths: pickerCols,
		minDate: '2020-01-01', 
		maxDate: now, 
		scrollToDate: false,
		autoApply: true,
		format: (documentLang == "de")? "DD.MM.YYYY": "MM/DD/YYYY",
		allowRepick: true,
		buttonText: {
			"previousMonth":'<svg width="23" height="24" viewBox="0 0 23 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.8912 21L5.75 12.75L13.8912 4.5L15.8125 6.447L9.56007 12.75L15.8125 19.053L13.8912 21Z" fill="#006082"/></svg>',
			"nextMonth":'<svg width="23" height="24" viewBox="0 0 23 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.10882 3L17.25 11.25L9.10882 19.5L7.1875 17.553L13.4399 11.25L7.1875 4.947L9.10882 3Z" fill="#006082"/></svg>'
		},
		setup: (picker) => {
			picker.on('clear:selection', () => {
				let dateStr = $(".analyseRangePicker-btn span").html();
				dateStr = dateStr.split(" - ");
				picker.setDateRange(...dateStr);
			   $(".analyseRangePicker").removeClass("active")
			}); 
		}
	});


	$('.analyseRangePicker-input').each(function(){
		new Cleave(this, {
			date: true,
			delimiter: (documentLang == "de")? '.': '/',
			dateMin: '2020-01-01',
			dateMax: now.toISODate(),
			datePattern: (documentLang == "de")? ['d','m','Y']: ['m','d','Y'],
			onValueChanged: function(e) {
				if(e.target.rawValue.length != 8) return;
				const dateInput = DateTime.fromFormat(e.target.value, "D");
				const dateFromPicker = (e.target.name == "start")? picker.getEndDate().dateInstance: picker.getStartDate().dateInstance; 
				const dates = [dateInput];

				if(dateInput > dateFromPicker){
					dates.unshift(dateFromPicker);
				}else{
					dates.push(dateFromPicker);
				}

				picker.setDateRange(...dates);
				picker.gotoDate(dates[0]);
			}
		});
	});

	$(document).on("click",".analyseRangePicker-btn", function(e){
		if(picker.getStartDate()){
			picker.gotoDate(DateTime.fromJSDate(picker.getStartDate().dateInstance));
		}
		$(".analyseRangePicker").toggleClass("active")
	});

	$(document).on("click",".analyseRangePicker-cancel", function(e){
		picker.clearSelection()
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
});


export default date$;
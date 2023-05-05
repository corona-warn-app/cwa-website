import $ from 'jquery';
import Litepicker from 'litepicker';
import Cleave from 'cleave.js';
import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = documentLang;

const dateLocaleFormat = (documentLang == "de")? "dd'.'LL'.'yyyy": "dd'/'LL'/'yyyy";
const now = DateTime.fromISO("2023-04-30");



	
$(document).on("focus",".analyseRangePicker-input", function(){
	const dateFromPicker = ($(this).attr("name") == "start")? picker.getStartDate().dateInstance: DateTime.fromJSDate(picker.getEndDate().dateInstance).minus({month:1}); 
	picker.gotoDate(dateFromPicker);
	$(this).val("")
});

$(document).on("blur",".analyseRangePicker-input", function(e){
	setTimeout(() => {
		const dateFromPicker = ($(this).attr("name") == "start")? picker.getStartDate().dateInstance: picker.getEndDate().dateInstance; 
		$(this).val(DateTime.fromJSDate(dateFromPicker).toFormat(dateLocaleFormat));
	}, 400);
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
	minDate: analyseConfig.startDate, 
	maxDate: now, 
	scrollToDate: false,
	autoApply: true,
	format: (documentLang == "de")? "DD.MM.YYYY": "DD/MM/YYYY",
	allowRepick: true,
	buttonText: analyseConfig.pickerButtonText,
	setup: (picker) => {
		picker.on('clear:selection', () => {
			let dateStr = $(".analyseRangePicker-btn span").html();
			picker.setDateRange(...dateStr.split(" - "));
		   $(".analyseRangePicker").removeClass("active")
		}); 

		picker.on('before:click', (target) => {
			if(!$(target).hasClass("day-item") || $(target).hasClass("is-locked") || $(target).hasClass("is-end-date")) return;
			picker.preventClick = true;

			const cDate = DateTime.fromMillis($(target).data("time"));
			let date = picker.getDateRange();
			const diff = date.map(e => Math.abs(cDate.diff(e).as('days')));
			date[diff.indexOf(Math.min(...diff))] = cDate;
			picker.setDateRange(...date);
		});
	}
});


picker.getDateRange = () => {
	return [
		DateTime.fromJSDate(picker.getStartDate().dateInstance),
		DateTime.fromJSDate(picker.getEndDate().dateInstance)
	];
};

$('.analyseRangePicker-input').each(function(){
	new Cleave(this, {
		date: true,
		delimiter: (documentLang == "de")? '.': '/',
		dateMin: analyseConfig.startDate,
		dateMax: now.toISODate(),
		datePattern: ['d','m','Y'],
		onValueChanged: function(e) {
			if(e.target.rawValue.length != 8) return;
			console.log(e.target.value)
			const dateInput = DateTime.fromFormat(e.target.value, dateLocaleFormat);
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

	$(".analyseRangeRadio input:checked, .analyseRangeCustom").prop('checked', false);
	const nDate = picker.getDateRange().map(e => e.toISODate()).join(",");
	const $e = $(".analyseRangeRadio input").filter((i, e) => ($(e).val() == nDate));

	if($e.length == 1) {
		$e.click();
		return;
	}else{
		$(".analyseRangeCustom").val(nDate).click()
	}
});

export default picker;
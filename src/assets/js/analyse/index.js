import $ from 'jquery';
import { combineLatestWith } from 'rxjs';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';
import _cloneDeep from 'lodash/cloneDeep';
import { DateTime } from 'luxon';


import chart from './chart.js';
import fullscreen from './fullscreen.js';
import modal from './modal.js';
import totalValues from './totalValues.js';


import data$ from './data.js';
import date$ from './date.js';
import switchId$ from './switch.js';
import tabs$ from './tabs.js';


window.$ = window.jQuery;


let cacheData;
let checkArray;


setTimeout(function(){
	$(".analyseBoards-loading-btn").show();
},2000)

$(document).on("click",".analyseBoards-loading-btn", function(e){
	window.location.reload()
});


data$
	.pipe(
	    combineLatestWith(
			switchId$, 
			date$, 
			...tabs$,
		)
	)
	.subscribe(v => {
		// return on fetch error (data$)
		if(v[0].error) return;

		console.time('cachedata')

		// create the object
		const obj = {
			data: v[0][0],
			switchId: v[1],
			date: v[2], 
			tabs1: v[3],
			tabs2: v[4]
		};

		// get array of values
		let array = Object.values(obj);
		// remove first item
		array.shift();

		let charts = chart;

		if(Array.isArray(checkArray)){
			// compare values with chached version
			if(JSON.stringify(array) === JSON.stringify(checkArray)){
				//no change
				console.timeEnd('cachedata')
		  		return;
	  		}else{
	  			charts = (checkArray[2] != array[2])? [chart[1]]: (checkArray[3] != array[3])? [chart[2]]: chart;
	  		}

		}else{
			$(".analyseBoards").removeClass("loading");
			totalValues(obj.data);
		}

		// filter data only on range change 
		obj.data = (Array.isArray(checkArray) && JSON.stringify(array[1]) == JSON.stringify(checkArray[1]))? cacheData: filterData(obj.data, obj.date);

		charts.forEach((s,i) => s.next(obj));
		
		// fill cache  vars
		cacheData = obj.data;
		checkArray = array;

		console.timeEnd('cachedata')
	});



function filterData(dataOrg, date){
	console.time('filterData')
	let data = _cloneDeep(dataOrg);
	data.range = DateTime.fromISO(date[1]).diff(DateTime.fromISO(date[0])).as('days');
	data.data = _mapValues(data.data, (a) => a.filter(o => (date[0] <= o[0] && date[1] > o[0])));
	console.timeEnd('filterData')
	return data;
}
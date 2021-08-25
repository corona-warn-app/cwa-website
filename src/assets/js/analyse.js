import { combineLatest } from 'rxjs';
import _get from 'lodash/get';

import data$ from './analyse/data.js';
import date$ from './analyse/date.js';
import switchId$ from './analyse/switch.js';
import tabs$ from './analyse/tabs.js';

import chart from './analyse/chart.js';

var $ = window.jQuery;


console.log("analyse", date$, switchId$, tabs$)



let cacheInit = false;
let cacheObj = {};


function setCacheItem(type, value){
	if(JSON.stringify(cacheObj[type]) != JSON.stringify(value)){
  		cacheObj[type] = value;
    	detectChange(type, value);
  	}
}


function detectChange(type,value) {
	if(Object.keys(cacheObj).length == 5){

		let charts;

		if(!cacheInit){
			// console.log("all filled");
			$(".analyseBoards").removeClass("active");
			cacheInit = true;
			charts = chart;
		}
		else{
			// console.log("detectChange", cacheObj);
			// console.log("The variable has changed to", type, value);
			charts = (type == "tabs1")? [chart[0]]: (type == "tabs2")? [chart[1]]: chart;
		}


		charts.forEach((s,i) => {
			s.next(cacheObj)
		});




	}
}


combineLatest(data$, switchId$, date$, ...tabs$)
	.subscribe(([dataOrg, switchId, date, tabs1, tabs2]) => {
	    //filter data
	    const data = filterData(dataOrg, date);

	    setCacheItem("data", data)
	    setCacheItem("switchId", switchId)
	    setCacheItem("date", date)
	    setCacheItem("tabs1", tabs1)
	    setCacheItem("tabs2", tabs2)
	});




function filterData(dataOrg, date){
	let data = JSON.parse(JSON.stringify(dataOrg));
	data.data.daily = _get(data, ["data", "daily"], []).filter(o => {
		if(date[0] != null && date[1] != null ){
		  return (date[0] <= o[0] && date[1] >= o[0])
		}else{
		  return true
		}
	});

	data.data.weekly = _get(data, ["data", "weekly"], []).filter(o => {
		if(date[0] != null && date[1] != null ){
		  return (date[0] <= o[0] && date[1] >= o[0])
		}else{
		  return true
		}
	});

	return data;
}


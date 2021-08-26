import { combineLatest, combineLatestWith } from 'rxjs';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';
import _cloneDeep from 'lodash/cloneDeep';
import { DateTime } from 'luxon';

import data$ from './analyse/data.js';
import date$ from './analyse/date.js';
import switchId$ from './analyse/switch.js';
import tabs$ from './analyse/tabs.js';

import chart from './analyse/chart.js';

var $ = window.jQuery;
window.$ = window.jQuery;

let cache = {
	store: {},
	init: false,
	set data(d){
		if(JSON.stringify(this.store) != JSON.stringify(d)){
	  		this.store = this.check(this.store, d);
  		}
	},
	get data(){
		return this.store;
	},
	check(oldObj, obj){
		let charts = chart;

		if(!this.init){
			$(".analyseBoards").removeClass("active");
			this.init = true;
		}else{
			charts = (oldObj.tabs1 != obj.tabs1)? [chart[1]]: (oldObj.tabs2 != obj.tabs2)? [chart[2]]: chart;
		}

		charts.forEach((s,i) => s.next(obj));

		return obj;
	}
};


data$
	.pipe(
	    combineLatestWith(
			switchId$, 
			date$, 
			...tabs$,
		)
	)
	.subscribe((
		[
			data, 
			switchId,
			date, 
			tabs1, 
			tabs2,
		]
	) => {
		cache.data = {
			data: filterData(data, date),
			switchId: switchId,
			date: date, 
			tabs1: tabs1,
			tabs2: tabs2,
		};
	});



function filterData(dataOrg, date){
	let data = _cloneDeep(dataOrg);
	data.range = DateTime.fromISO(date[1]).diff(DateTime.fromISO(date[0])).as('days');
	data.data = _mapValues(data.data, (a) => a.filter(o => (date[0] < o[0] && date[1] >= o[0])));
	return data;
}
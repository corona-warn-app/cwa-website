import $ from 'jquery';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = documentLang;

let store = [];

function getLine(data, key){
	const e = _cloneDeep(data);
	const index = _get(e, ["keys", "daily"]).indexOf(key);
	const array = _get(e, ["data", "daily"]);
	
	let last;
	do{
		last = array.pop();
	}while(last[index] === null || last[index] === 0)

	return [
		last[0], 
		last[index]
	];
}

function getValue(data, key){
	const line = getLine(data, key);

	return [ 
		DateTime.fromISO(line[0]).toRelativeCalendar(),
		new Intl.NumberFormat(lang).format(line[1])
	];
}

function getTimestamp(data){
	const line = getLine(data, "update_timestamp");
	return DateTime.fromISO(line[1]).toLocaleString(DateTime.DATETIME_FULL);
}

function setUpdatedTime(data){
	$(".analyseUpdate-timestamp").html(getTimestamp(data));
}

function totalValuesInit(data){
	$(".analyseBoard-total-value").each(function(i, e){
   		const keys = $(this).data("key");
   		store.push(keys.map(e => getValue(data, e)));
   		totalValuesUpdate($(this), i, 0);
   	})
}

function totalValuesUpdate($e, id, idx){
	const ary = _get(store, [id], []);
	const a = _get(ary, [idx], ary[0]);
	$e.html(a[1]);
	$e.next().next().find("span").html(a[0]);
}





export {
	totalValuesInit,
	totalValuesUpdate,
	setUpdatedTime
}

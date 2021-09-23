import $ from 'jquery';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = documentLang;


let store = [];

function getValue(data, key){
	const e = _cloneDeep(data);
	const index = _get(e, ["keys", "daily"]).indexOf(key);
	const array = _get(e, ["data", "daily"]);
	
	let last;
	do{
		last = array.pop();
	}while(last[index] === null || last[index] === 0)

	return [ 
		DateTime.fromISO(last[0]).toRelativeCalendar(),
		new Intl.NumberFormat(lang).format(last[index])
	];
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
	$e.next().find("span").html(a[0]);
}





export {
	totalValuesInit,
	totalValuesUpdate
}

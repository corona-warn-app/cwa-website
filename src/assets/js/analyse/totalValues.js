import $ from 'jquery';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = documentLang;

function getValue(e, key){
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


export default function(data){
	$(".analyseBoard-total-value").each(function(e){
   		const key = $(this).data("key");
   		const d = getValue(_cloneDeep(data), key);
   		$(this).html(d[1]);
   		$(this).next().find("span").html(d[0]);
   	})
}
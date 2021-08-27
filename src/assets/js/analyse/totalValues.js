import _get from 'lodash/get';
var $ = window.jQuery;

const documentLang = document.documentElement.lang;
const lang = (documentLang == "de")? 'de-DE': 'en-US';

function formatNumber(nr){
	return new Intl.NumberFormat(lang).format(nr);
}

function getValue(e, key){
	const mode = "daily";
	const index = _get(e, ["keys", mode]).indexOf(key);
	const array =  _get(e, ["data", mode ])
	return formatNumber(array[array.length - 2][index]);
}


export default function(data){
	$(".analyseBoard-total-value").each(function(e){
   		const key = $(this).data("key");
   		$(this).html(getValue(data, key));
   	})
}
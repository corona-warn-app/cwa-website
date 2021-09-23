import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { share, switchMap, catchError, tap } from 'rxjs/operators';
import chartConfig from './chart/config.js';
import _get from 'lodash/get';

let url;

if(window.location.hostname == "localhost"){
	url = window.location.origin + "/analyseData.json";
}else{
	url = fetchUrl;
}



const data$ = fromFetch(url).pipe(
	switchMap(response => {
		if (response.ok){
			// OK return data
			return response.json()
		}else{
			// Server is returning a status requiring the client to try something else.
			return of({ error: true, message: `Error ${response.status}` });
		}
	}),
	catchError(err => {
			// Network or other error, handle appropriately
			console.error(err);
			return of({ error: true, message: err.message })
		}
	),
	tap(e => {sanityCheck(e[0])}),
	share()
);



function sanityCheck(data){

	let keyAryDaily = [];
	let keyAryWeekly = [];

	Object.keys(chartConfig).map( a => {
		Object.keys(chartConfig[a]).map( b => {
			if(_get(chartConfig, [a, b, "series"])){
				_get(chartConfig, [a, b, "series"]).map( o=> {
					if(b == 3){
						keyAryWeekly.push(_get(o,["data"]))
					}else{
						keyAryDaily.push(_get(o,["data"]))
					}
				})
			}else{
				_get(chartConfig, [a, b]).map( o => {
					o["series"].map( i => {
						if(b == 3){
							keyAryWeekly.push(_get(i,["data"]))
						}else{
							keyAryDaily.push(_get(i,["data"]))
						}
					})
				})
			}
		})
	})

	// unique array
	keyAryDaily = keyAryDaily.filter((v, i, a) => a.indexOf(v) === i);
	keyAryDaily = keyAryDaily.filter((v, i, a) => a.indexOf(v) === i);

	const missDaily = keyAryDaily.filter(w => (data.keys.daily.indexOf(w) == -1));
	const missWeekly = keyAryWeekly.filter(w => (data.keys.weekly.indexOf(w) == -1));


	// const notNeededDaily = data.keys.daily.filter(w => (keyAryDaily.indexOf(w) == -1)).filter(w => (w != "effective_date"));
	// const notNeededWeekly = data.keys.weekly.filter(w => (keyAryWeekly.indexOf(w) == -1)).filter(w => (w != "effective_date"));
	
	// console.log("Daily unused",notNeededDaily.join(", "))
	// console.log("Weekly unused",notNeededWeekly.join(", "))
	

	if( missDaily.length > 0){
		console.error("Missing data keys daily: ", missDaily.join(", "));
	}

	if( missWeekly.length > 0){
		console.error("Missing data keys weekly: ", missWeekly.join(", "));
	}

}

export default data$;
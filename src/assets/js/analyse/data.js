import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map, delay } from 'rxjs/operators';
var $ = window.jQuery;

console.log("data$")


let url;

if(window.location.hostname == "localhost"){
	url = "http://localhost:8000/data.json";
}else{
	url = "https://obs.eu-de.otc.t-systems.com/obs-public-dashboard/json/v1/nested_cwa_public_dashboard_data.json";
}

const data$ = fromFetch(url).pipe(
 switchMap(response => {
   if (response.ok) {
     // OK return data
     return response.json()
   } else {
     // Server is returning a status requiring the client to try something else.
     return of({ error: true, message: `Error ${response.status}` });
   }
 }),
 catchError(err => {
   // Network or other error, handle appropriately
   console.error(err);
   return of({ error: true, message: err.message })
 }),
 map(e => e[0])
);

export default data$;

// $(() => {
// 	let translations = $(".analyseBoards").data("translations");

// 	const usedKeys = Object.keys(translations);

// 	data$.subscribe(e => {

// 		let dailyKeys = e.keys.daily;
// 		let weeklyKeys = e.keys.weekly;


// 		let data = {
// 			"daily":{
// 				"unused":[],
// 				"missing":[]
// 			},
// 			"weekly":{
// 				"unused":[],
// 				"missing":[]
// 			}
// 		}

// 		data.daily.unused = dailyKeys.filter(x => !usedKeys.includes(x));
// 		data.daily.missing = usedKeys.filter(x => !dailyKeys.includes(x));

// 		const wusedKeys = usedKeys.filter(x => {

// 			if(x == "effective_date" || x == "infections_published_cumulated" || x == "infections_published_daily" || x == "infections_published_7days_avg" || x == "infections_published_7days_sum" ){
// 				return true;
// 			}

// 			return x.includes("_7days_sum") 
// 		})

// 		const wwusedKeys = usedKeys.filter(x => x.includes("_7days_sum")  )
// 		wwusedKeys.push("effective_date");
// 		data.weekly.missing = wwusedKeys.filter(x => !weeklyKeys.includes(x));
// 		data.weekly.unused = weeklyKeys.filter(x => !wwusedKeys.includes(x));
// 	  	console.log(JSON.stringify(data, 0, 2))
// 	});

// });





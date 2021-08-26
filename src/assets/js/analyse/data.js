import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map, delay } from 'rxjs/operators';
import totalValues from './totalValues.js';
var $ = window.jQuery;

console.log("data$")

import data from '../data.json';
console.log(data)
const data$ = of(data)
	.pipe(
		map(e => e[0]),
		delay(500)
	);

// const url = "https://obs.eu-de.otc.t-systems.com/obs-public-dashboard/json/v1/nested_cwa_public_dashboard_data.json";

// const data$ = fromFetch(url).pipe(
//  switchMap(response => {
//    if (response.ok) {
//      // OK return data
//      return response.json()
//    } else {
//      // Server is returning a status requiring the client to try something else.
//      return of({ error: true, message: `Error ${response.status}` });
//    }
//  }),
//  catchError(err => {
//    // Network or other error, handle appropriately
//    console.error(err);
//    return of({ error: true, message: err.message })
//  }),
//  map(e => e[0]),
//  delay(500)
// );


data$.subscribe(e => {
  // show total values
  totalValues(e);
});


export default data$;
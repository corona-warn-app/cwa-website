import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map, delay } from 'rxjs/operators';
import totalValues from './totalValues.js';

const url = "/assets/js/data.json";

console.log("data$")

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
 map(e => e[0]),
 delay(500)
);


data$.subscribe(e => {
  // show total values
  totalValues(e);
});


export default data$;
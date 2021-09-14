import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { share, switchMap, catchError } from 'rxjs/operators';

let url;

if(window.location.hostname == "localhost"){
	url = "http://localhost:8000/data.json";
}else{
	url = "https://obs.eu-de.otc.t-systems.com/obs-public-dashboard/json/v1/nested_cwa_public_dashboard_data.json";
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
	share()
);

export default data$;
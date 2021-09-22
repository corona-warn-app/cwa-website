import $ from 'jquery';
import ApexCharts from 'apexcharts'
import { Subject } from 'rxjs';

import chartOptions from './chart/options.js';
import chartUpdate from './chart/update.js';
let chartsAry = [];

window.ApexCharts = ApexCharts;
Object.assign(Apex, chartOptions); 

$(() => {
	// loop over all board
	$(".analyseChart").each(function(i){
		// init ApexCharts with base options
		new ApexCharts(this, Object.assign({}, {chart:{id:`chart${i}`}})).render();
		
		const chart$ = new Subject;
		chart$.subscribe(e => chartUpdate(e, i));
		chartsAry.push(chart$);
	});
});

export default chartsAry;
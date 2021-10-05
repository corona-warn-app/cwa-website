import $ from 'jquery';
import ApexCharts from 'apexcharts'
import { Subject } from 'rxjs';

import chartOptions from './chart/options.js';
import { update } from './chart/update.js';
let chartsAry = [];

window.ApexCharts = ApexCharts;
Object.assign(Apex, chartOptions); 

$(() => {
	// loop over all board
	$(".analyseChart").each(async function(i){
		// init ApexCharts with base options
		new ApexCharts(this, Object.assign({}, {chart:{id:`chart${i}`}})).render();
		
		const chart$ = new Subject;
		await chart$.subscribe(e => update(e, i));
		chartsAry.push(chart$);
	});
});

export default chartsAry;
import ApexCharts from 'apexcharts'
import _get from 'lodash/get';
import { Subject } from 'rxjs';

var $ = window.jQuery;
window.ApexCharts = ApexCharts;

const documentLang = document.documentElement.lang;
const lang = (documentLang == "de")? 'de-DE': 'en-US';


const chartMap = {
	"chart0": {
		"1": [
			{
				"series": [
					{
						color: "#D68101",
						data: "qr_teletan_redeemable_cumulated"
					},
					{
						color: "#6A1B4D",
						data: "qr_redeemable_cumulated"
					},
					{
						color: "#B2578D",
						data: "teletan_redeemable_cumulated"
					}
				],
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_cumulated"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_cumulated"
					}
					
				],
				"stacked": true,
				"type":"area"
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_cumulated"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_cumulated"
					}
					
				],
				"stacked": true,
				"type":"area"
			}
		]
	},
	"chart2": {
		"1": {
			"series": [
				{
					color: "#D68101",
					data: "app_downloads_cumulated"
				},
				{
					color: "#6A1B4D",
					data: "app_downloads_android_cumulated"
				},
				{
					color: "#B2578D",
					data: "app_downloads_ios_cumulated"
				}
			],

		}	
	},
	"chart3": {
		"1": {
			"series": [
				{
					color: "#FF6666",
					data: "ppa_risk_red_daily"
				},
				{
					color: "#50DBB4",
					data: "ppa_risk_green_daily"
				}
			],
			"stacked": true,
			"type":"area"
		}	
	}
}



const options = {
	stroke: {
		width: 2
	},
	colors: ["#bd3a63", "#d4eaf7", "#e8d0cd"],
	series: [],
	chart: {
		id:"chart",
		height: 215,
		width: "100%",
		type: 'line',
		toolbar: {
			autoSelected: 'pan',
			show: false,
			zoom: false
		},
		zoom: {
        	enabled: false
      	}
	},
	grid: {
		// show: true,
	    borderColor: '#CFD4D9',
	 //    strokeDashArray: 0,
	 //    position: 'back',
	    xaxis: {
	        lines: {
	            show: false
	        }
	    },   
	    yaxis: {
	        lines: {
	            show: true
	        }
	    },  
	 //    row: {
	 //        colors: undefined,
	 //        opacity: 0.5
	 //    },  
	 //    column: {
	 //        colors: undefined,
	 //        opacity: 0.5
	 //    },
	},
	yaxis: {
		show: true,
		forceNiceScale: true,
		labels: {
			minWidth: 50,
			formatter: value => {
				return new Intl.NumberFormat(lang).format(value)
			},
			style:{
				colors: ["#898B8B"],
				fontFamily: 'Roboto, serif',
				fontSize: '11px',
			}
		},
		axisTicks: {
			show: false
		}
	 },
	xaxis: {
	    type: "datetime",
		axisBorder: {
          show: true,
          color: 'currentColor',
      	},
		labels: {
			style:{
				colors: ["#898B8B"],
				fontFamily: 'Roboto, serif',
				fontSize: '11px',
			}
		},
		axisTicks: {
			show: false
		}
	},
	legend: {
		show: true,
		showForSingleSeries: true,
		horizontalAlign: 'right', 
		fontSize: '11px',
		fontFamily: 'Roboto, serif',
		fontWeight: 400,
		offsetX: -100,
		markers: {
			width: 8,
			height: 8,
			radius: 0,
      	},
		itemMargin: {
			horizontal: 12
		},


	},
	noData: {
		text: 'No Data to display'
	},
}

console.log("chart")

let chartsAry = [];


 function getIndex(e, mode, key){
    const keys = _get(e, ["keys", mode]);
    return keys.indexOf(key);
  }





$(() => {

	const translations = $(".analyseBoards").data("translations");
	function translate(key){
		return _get(translations, key, key);
	}

	$(".analyseChart").each(function(i ,e){

		let opt = Object.assign({}, options);


		const chart$ = new Subject;
		chart$.subscribe(e => {
			let opt = Object.assign({}, options);
			opt.chart.id = `chart${i}`;

			let chartMapObj = _get(chartMap, [opt.chart.id, e.switchId], []);
			if(Array.isArray(chartMapObj)){
				chartMapObj = _get(chartMapObj, [(opt.chart.id == "chart0")? e.tabs1: (opt.chart.id == "chart1")? e.tabs2:[]], []);
			}

			
			
			opt.chart.type = _get(chartMapObj, ["type"], "line");
			opt.chart.stacked = _get(chartMapObj, ["stacked"], false);

			const chartObj = _get(chartMapObj, ["series"], []);
			const mode = (e.switchId == 3)? "weekly": "daily"; 


			opt.series = chartObj.map((obj)=>{
				const index = getIndex(e.data, mode, obj.data);
				return {
					color: (obj.color)? obj.color: undefined,
					type: (obj.type)? obj.type: undefined,
					name: (obj.name)? obj: translate(obj.data),
					data: e.data.data[mode]
						.filter(f => f[index] != null)
						.map(m => 
							[
								m[0], 
								m[index]
							]
						)
					}
			});


			
			

			ApexCharts.exec(opt.chart.id, "updateOptions", opt, true)
			console.log("chart update", opt.chart.id, e, opt)
   			
		});
		chartsAry.push(chart$);
		
		opt.chart.id = `chart${i}`;
		new ApexCharts(this, opt).render();
	});
});


export default chartsAry;
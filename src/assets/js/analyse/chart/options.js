import { DateTime } from 'luxon';

const documentLang = document.documentElement.lang;
const lang = (documentLang == "de")? 'de-DE': 'en-US';


export default {
	stroke: {
		width: 2,
	    dashArray: [0, 0, 0, 5, 5, 5]
	},
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
			minWidth: 45,
			maxWidth: 45,
			formatter: value => {
				let formatedValue;
				if(value >= 1e6){
					formatedValue = new Intl.NumberFormat(lang).format(value/1e6);
					formatedValue = (documentLang == "de")? `${formatedValue} Mio.`:  `${formatedValue} mil.`
				}else{
					formatedValue = new Intl.NumberFormat(lang).format(value)
				}
				return formatedValue;
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
			},
			datetimeFormatter: {
				year: 'yyyy',
				month: "MMM",
				day: 'dd MMM',
				hour: 'HH:mm',
			},
			formatter: undefined
		},
		axisTicks: {
			show: false
		},
		crosshairs: {
			show: true,
			stroke: {
				color: '#006082'
			}
		},
		tooltip: {
			enabled: false
		}
	},
	legend: {
		show: true,
		showForSingleSeries: true,
		horizontalAlign: 'right', 
		fontSize: '11px',
		fontFamily: 'Roboto, sans-serif',
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
	plotOptions: {
      	bar: {

      	}
  	},
  	markers: {

  	},
  	tooltip: {
      enabled: true,
      shared: true,
	  custom: function({seriess, seriesIndex, dataPointIndex, w}) {
	  	const mode = w.config.mode; 
		const date = w.config.series[seriesIndex].data[dataPointIndex][0];

		const series = w.config.seriesall.map(e => {
			const value = e.data.find(e => e[0] == date)
			return `
				<div class="apexcharts-tooltip-series-group">
				   	<span class="apexcharts-tooltip-marker" style="background-color: ${e.color};"></span>
					<div class="apexcharts-tooltip-text">
						<div class="apexcharts-tooltip-y-group">
							<span class="apexcharts-tooltip-text-y-label">${e.name}:</span>
							<span class="apexcharts-tooltip-text-y-value">${(Array.isArray(value))? value[1]: "-" }</span>
						</div>
					</div>
				</div>
			`;
		});

		const dateT = DateTime.fromISO(date);
		const formatedDate = (mode == "weekly")? dateT.toFormat((documentLang == "de")? "'KW' W": "'CW' W") + " - " + dateT.toLocaleString(DateTime.DATE_HUGE): dateT.toLocaleString(DateTime.DATE_HUGE);

		return `
			<div class="apexcharts-tooltip-date">${formatedDate}</div>
			${series.join("")}
		`
	  }



	}
};
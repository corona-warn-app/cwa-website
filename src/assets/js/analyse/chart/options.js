import $ from 'jquery';

import translate from '../translate.js';

export default {
	stroke: {
		width: 2
	},
	series: [],
	chart: {
		id: "chart",
		width: "100%",
		height: 230,
		type: 'line',
		redrawOnWindowResize: false,
		toolbar: {
			autoSelected: 'pan',
			show: false,
			zoom: false
		},
		zoom: {
			enabled: false
		},
		events: {
			updated: function(chartContext, config) {
				$(".apexcharts-xaxis-label tspan:not(:empty), .apexcharts-xaxis-label title:not(:empty)").each(function(){
					$(this).html($(this).html().replaceAll("_", ""))
				});

				$(`.analyseBoard-loading[data-id="${config.config.chart.id}"]`).removeClass("active")
			}
		}
	},
	grid: {
		borderColor: '#CFD4D9',
		xaxis: {
			lines: {
				show: false
			}
		},   
		yaxis: {
			lines: {
				show: true
			}
		}
	},
	yaxis: {
		show: true,
		forceNiceScale: true,
		tickAmount: 4,
		min: 0,
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
			}
		},
		axisTicks: {
			show: false
		}
	 },
	xaxis: {
		type: "category",
		tickAmount: 8,
		tickPlacement: 'on',
		axisBorder: {
		  show: true,
		  color: 'currentColor',
		},
		labels: {
			showDuplicates: false,
			rotate: 0,
			hideOverlappingLabels: true,
			offsetY: -3,
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
		floating: true,
		position: "top",
		markers: {
			radius: 0
		}
	},
	noData: {
		text: 'No Data to display'
	},
	dataLabels: {
		enabled: false
	},
	markers: {
		size: 0,
		hover: {
	      size: 0,
	      sizeOffset: 3
	    }
	},
	tooltip: {
		enabled: true,
		shared: true,
		custom: function({series, seriesIndex, dataPointIndex, w}) {
			let seriesArray = w.config.seriesall
				.filter(a => (!a.ghost)? w.config.series.find(e => e.name === a.name).data.length > 0: true);

			if(w.config.chart.stacked){
				if(seriesArray[0].ghost){
					seriesArray.push(seriesArray.shift());
				}
				seriesArray.reverse();
			}

			seriesArray = seriesArray.map((e,i) => {
				const value = e.data[dataPointIndex]
				return `
					<div class="apexcharts-tooltip-series-group">
						<span class="apexcharts-tooltip-marker" style="background-color: ${e.color};"></span>
						<div class="apexcharts-tooltip-text">
							<div class="apexcharts-tooltip-y-group">
								<span class="apexcharts-tooltip-text-y-label">${e.name}:</span>
								<span class="apexcharts-tooltip-text-y-value">${(value)? new Intl.NumberFormat(lang).format(value): "-" }</span>
							</div>
						</div>
					</div>
				`;
			});

			return `
				<div class="apexcharts-tooltip-date">${w.config.tooltipDate[dataPointIndex]}</div>
				${seriesArray.join("")}
			`;
		}
	}
};
import $ from 'jquery';
import ApexCharts from 'apexcharts';
import { Subject } from 'rxjs';

import chartOptions from './chart/options.js';
import { update } from './chart/update.js';
let chartsAry = [];

const annotations = {
  xaxis: [
    {
      key: 'self-test-submission',
      label_de: 'Selbstwarnungen',
      label_en: 'Self-test warnings',
      dataPoints: ['__18. Jan. 23__', '__KW 03__', '__Jan. 23__'], // Target the daily and weekly datapoints
      // TODO: Only mark CW 03 of 2023!
    },
  ],
};

window.ApexCharts = ApexCharts;
Object.assign(Apex, chartOptions);

$(() => {
  // loop over all board
  $('.analyseChart').each(async function (i) {
    // init ApexCharts with base options
    const chart = new ApexCharts(this, Object.assign({}, { chart: { id: `chart${i}` } }));
    chart.render();

    const chart$ = new Subject();
    await chart$.subscribe((e) => update(e, i));
    chartsAry.push(chart$);

    annotations.xaxis.forEach((annotation) => {
      annotation.dataPoints.forEach((dataPoint) => {
        chart.addXaxisAnnotation({
          x: dataPoint,
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            orientation: 'horizontal',
            textAnchor: dataPoint === '__Jan. 23__' ? 'end' : 'start', //TODO: Dynamically choose textAnchor based on the position of the dataPoint
            offsetX: dataPoint === '__Jan. 23__' ? -4 : 4,
            offsetY: 5,
            text: annotation.label_de,
            style: {
              background: '#775DD0',
            },
          },
        });
      });
    });
  });
});

export default chartsAry;

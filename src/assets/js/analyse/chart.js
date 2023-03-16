import $ from 'jquery';
import ApexCharts from 'apexcharts';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';

import chartOptions from './chart/options.js';
import { update } from './chart/update.js';
let chartsAry = [];

const annotations = {
  xaxis: [
    {
      key: 'self-test-submission',
      label_de: 'Selbstwarnungen',
      label_en: 'Self-test warnings',
      dataPoints: [
        `__${DateTime.fromISO('2023-01-18').toLocaleString({ day: '2-digit', month: 'short', year: '2-digit' })}__`,
        documentLang == 'de' ? '__KW 03 2023__' : '__CW 03 2023__',
        // TODO: Target correct day, when using more than 1000 datapoints
        // `__${DateTime.fromISO('2023-01-18').toLocaleString({ month: 'short', year: '2-digit' })}__`,
      ],
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

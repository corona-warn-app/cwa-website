import ApexCharts from 'apexcharts';
import _get from 'lodash/get';
import _set from 'lodash/set';

import translate from '../translate.js';
import { totalValuesUpdate } from '../totalValues.js';
import { debugLog, debugTime, debugTimeEnd } from '../debug.js';

import { checkLegendReset, renderLegend } from './legend.js';
import chartConfig from './config.js';
import { DateTime } from 'luxon';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const selfWarningAnnotation = {
  key: 'self-test-submission',
  label_de: 'Warnen ohne TAN',
  label_en: 'Warning without TAN',
  targetCharts: ['chart2', 'chart3'],
  dataPoints: {
    daily: `__${DateTime.fromISO('2023-01-18').toLocaleString({ day: '2-digit', month: 'short', year: '2-digit' })}__`,
    weekly: documentLang == 'de' ? '__KW 03 2023__' : '__CW 03 2023__',
  },
};

const testVAnnotation = {
  key: 'test-v-changes',
  label_de: 'TestV Anpassungen',
  label_en: 'TestV adjustments',
  targetCharts: ['chart1', 'chart2', 'chart3'],
  dataPoints: {
    daily: `__${DateTime.fromISO('2023-03-01').toLocaleString({ day: '2-digit', month: 'short', year: '2-digit' })}__`,
    weekly: documentLang == 'de' ? '__KW 09 2023__' : '__CW 09 2023__',
  },
};

const testInfrastructureShutdownAnnotation = {
  key: 'test-infrastructure-shutdown',
  label_de: 'Abschaltung der Testinfrastruktur',
  label_en: 'Test infrastructure shutdown',
  targetCharts: ['chart1'],
  dataPoints: {
    daily: `__${DateTime.fromISO('2023-04-21').toLocaleString({ day: '2-digit', month: 'short', year: '2-digit' })}__`,
    weekly: documentLang == 'de' ? '__KW 16 2023__' : '__CW 16 2023__',
  },
};

const update = async function (
  { barthreshold, categories, data, date, keys, mode, range, reallabels, switchId, tabs1, tabs2, tooltipDate, updated },
  i
) {
  const id = `chart${i}`;

  $(`.analyseBoard-loading[data-id="${id}"]`).addClass('active');
  await delay(100);
  debugTime('updateOptions' + id);

  if (i == 1) {
    // switch title on chart1 tabs
    $(`.${id}`)
      .find('.analyseBoard-title .analyseBoard-title-title')
      .html(translate(['analyseBoardTitleTitle', i, tabs1]));
  }

  if (i == 1 || i == 2) {
    // update total values based on selected tabs
    totalValuesUpdate($(`.${id}`).find('.analyseBoard-total-value'), i, i == 1 ? tabs1 : i == 2 ? tabs2 : 0);
  }

  let chartConfigObj = _get(chartConfig, [id, switchId], []);
  if (Array.isArray(chartConfigObj)) {
    chartConfigObj = _get(chartConfigObj, [id == 'chart1' ? tabs1 : id == 'chart2' ? tabs2 : []], []);
  }

  const chartType = _get(chartConfigObj, ['type'], 'line');
  const type = chartType == 'bar' ? (barthreshold ? chartType : 'area') : chartType;

  let opt = {
    chart: {
      id,
      type,
      stacked: _get(chartConfigObj, ['stacked'], false),
    },
    seriesall: _get(chartConfigObj, ['series'], []).map((obj) => {
      return {
        ghost: obj.ghost,
        color: obj.color ? obj.color : undefined,
        type: obj.type ? (barthreshold ? obj.type : 'line') : type,
        name: obj.name ? translate(obj.name) : translate(obj.data),
        data: keys.indexOf(obj.data) >= 0 ? data.map((m) => m[keys.indexOf(obj.data)]) : [],
        key: obj.data,
      };
    }),
  };

  // add only if needed
  if (updated) {
    opt = Object.assign(opt, { mode, reallabels, tooltipDate, xaxis: { categories } });
  }

  // set series without the ghosts
  _set(
    opt,
    ['series'],
    opt.seriesall.filter((e) => !e.ghost)
  );

  // set dasharray for legend and switch 4
  _set(
    opt,
    ['stroke', 'dashArray'],
    switchId == 4
      ? opt.seriesall.filter((e) => !e.ghost).map((obj) => (!!~obj.key.indexOf('_daily') ? 5 : 0))
      : new Array(opt.series.length).fill(0)
  );

  //Only reset series if necessary
  checkLegendReset(opt, () => {
    ApexCharts.exec(id, 'resetSeries', true, false);
  });

  // update chart options
  ApexCharts.exec(id, 'updateOptions', opt, true, false, false);

  // update and set annotations
  const calculateAnnotationPosition = (annotation) => {
    const dataPointIndex = categories.findIndex((category) =>
      Object.values(annotation.dataPoints).includes(category)
    );
    const magicNum = (dataPointIndex / categories.length) * 100;
    return {
      textAnchor: magicNum < 60 ? 'start' : 'end',
      offsetX: magicNum < 60 ? 4 : -4,
    };
  };

  ApexCharts.exec(id, 'clearAnnotations');

  if (selfWarningAnnotation.targetCharts.includes(id)) {
    const annotationPosition = calculateAnnotationPosition(selfWarningAnnotation);

    ApexCharts.exec(id, 'addXaxisAnnotation', {
      x: mode === 'weekly' ? selfWarningAnnotation.dataPoints.weekly : selfWarningAnnotation.dataPoints.daily,
      strokeDashArray: 0,
      borderColor: '#775DD0',
      label: {
        orientation: 'horizontal',
        textAnchor: annotationPosition.textAnchor,
        offsetX: annotationPosition.offsetX,
        offsetY: 5,
        text: documentLang == 'de' ? selfWarningAnnotation.label_de : selfWarningAnnotation.label_en,
        style: {
          background: '#775DD0',
        },
      },
    });
  }

  if (testVAnnotation.targetCharts.includes(id)) {
    const annotationPosition = calculateAnnotationPosition(testVAnnotation);
    
    ApexCharts.exec(id, 'addXaxisAnnotation', {
      x: mode === 'weekly' ? testVAnnotation.dataPoints.weekly : testVAnnotation.dataPoints.daily,
      strokeDashArray: 0,
      borderColor: '#b2578d',
      label: {
        orientation: 'horizontal',
        textAnchor: annotationPosition.textAnchor,
        offsetX: annotationPosition.offsetX,
        offsetY: 25,
        text: documentLang == 'de' ? testVAnnotation.label_de : testVAnnotation.label_en,
        style: {
          background: '#b2578d',
        },
      },
    });
  }

  if (testInfrastructureShutdownAnnotation.targetCharts.includes(id)) {
    const annotationPosition = calculateAnnotationPosition(testInfrastructureShutdownAnnotation);
    
    ApexCharts.exec(id, 'addXaxisAnnotation', {
      x: mode === 'weekly' ? testInfrastructureShutdownAnnotation.dataPoints.weekly : testInfrastructureShutdownAnnotation.dataPoints.daily,
      strokeDashArray: 0,
      borderColor: '#7ab2cf',
      label: {
        orientation: 'horizontal',
        textAnchor: annotationPosition.textAnchor,
        offsetX: annotationPosition.offsetX,
        offsetY: 0,
        text: documentLang == 'de' ? testInfrastructureShutdownAnnotation.label_de : testInfrastructureShutdownAnnotation.label_en,
        style: {
          background: '#7ab2cf',
        },
      },
    });
  }

  // render custom legend
  renderLegend(opt);
  debugTimeEnd('updateOptions' + id);
  debugLog('chart update', id, opt);
};

export { update };

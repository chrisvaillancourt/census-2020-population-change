import MediaContent from 'esri/popup/content/MediaContent';
import ChartMediaInfoValue from 'esri/popup/content/support/ChartMediaInfoValue';
import LineChartMediaInfo from 'esri/popup/content/LineChartMediaInfo';
import { symbolColors } from './renderers.js';

var popupTemplate = {
  title: '{NAME}, {st_name}',
  outFields: ['*'],
  content: getPopupContent,
  fieldInfos: [
    {
      fieldName: 'pop_growth',
      format: {
        places: 2,
      },
    },
    {
      fieldName: 'TSPOP10_CY',
      format: {
        places: 0,
        digitSeparator: true,
      },
    },
    {
      fieldName: 'TOTPOP_CY',
      format: {
        places: 0,
        digitSeparator: true,
      },
    },
  ],
};

function getPopupContent(feature) {
  var {
    graphic: { attributes },
  } = feature;

  var { pop_growth, pop_change } = attributes;

  const spanStyle = `
  font-weight: bold;
  color: ${getTextQualifier({
    num: pop_growth,
    breakpoint: 0.76,
    aboveBreakpointValue: symbolColors.high,
    belowBreakpointValue: symbolColors.low,
    defaultValue: symbolColors.medium,
  })};
  font-size: larger;
  `;
  const popChangeQualifier = getTextQualifier({
    num: pop_change,
    breakpoint: 0,
    aboveBreakpointValue: 'increased',
    belowBreakpointValue: 'decreased',
    defaultValue: 'changed',
  });

  var lineChartValue = new ChartMediaInfoValue({
    fields: [
      'TSPOP10_CY',
      'TSPOP11_CY',
      'TSPOP12_CY',
      'TSPOP13_CY',
      'TSPOP14_CY',
      'TSPOP15_CY',
      'TSPOP16_CY',
      'TSPOP17_CY',
      'TSPOP18_CY',
      'TSPOP19_CY',
      'TOTPOP_CY',
    ],
    normalizeField: null,
    tooltipField: '',
  });
  var lineChart = new LineChartMediaInfo({
    title: 'Population 2010 - 2020',
    value: lineChartValue,
  });
  var mediaElement = new MediaContent({
    mediaInfos: [lineChart],
  });

  return [
    {
      type: 'text',
      text: `
      <p>
        Between 2010 - 2020, this area's population ${popChangeQualifier} by <span style="${spanStyle}">{pop_growth}%</span> per year.
      </p>
      <p>
        The U.S. growth rate during this time was 0.76% per year.
      </p>
      
        <ul>
          <li>2010 Population: {TSPOP10_CY}</li>
          <li>2020 Population: {TOTPOP_CY}</li>
        </ul>
        `,
    },
    mediaElement,
  ];
}

function getTextQualifier({
  num,
  breakpoint,
  aboveBreakpointValue,
  belowBreakpointValue,
  defaultValue,
}) {
  if (num > breakpoint) return aboveBreakpointValue;
  else if (num < breakpoint) return belowBreakpointValue;
  else return defaultValue;
}
export { popupTemplate };

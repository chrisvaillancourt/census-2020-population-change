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

  var { pop_growth } = attributes;

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

  return [
    {
      type: 'text',
      text: `From 2010 - 2020, this area's population grew/shrank by <span style="${spanStyle}">{pop_growth}%</span> per year. The average growth rate for the entire U.S. is 0.76% per year.
        <ul>
          <li>2010 Population: {TSPOP10_CY}</li>
          <li>2020 Population: {TOTPOP_CY}</li>
        </ul>
        `,
    },
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

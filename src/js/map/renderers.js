/*
  Previous Color renderers:
  - blue and gray 3
  - blue and gray 2
  - blue and gray 1
  - 

*/

const baseOpacity = 0.8;
const outlineColor = 'hsla(48, 8%, 24%, 0.25)';
var symbolColors = {
  low: `hsla(37, 75%, 55%, ${baseOpacity})`,
  medium: `hsla(0, 0%, 20%, ${baseOpacity})`,
  high: `hsla(171, 55%, 63%, ${baseOpacity})`,
};

var sizeVisualVariable = {
  type: 'size',
  field: 'pop_change',
  legendOptions: {
    title: '2010 - 2020 Population Change',
  },
  minDataValue: 0,
  maxDataValue: 500000,
  minSize: 4,
  maxSize: 50,
};
var colorVisualVariable = {
  type: 'color',
  field: 'pop_growth',
  legendOptions: {
    title: '2010 - 2020 Annual Compound Growth Rate',
  },
  stops: [
    {
      value: -0.5,
      color: symbolColors.low,
      label: '-1.23%',
    },

    {
      value: 0.76,
      color: symbolColors.medium,
      label: '0.76% (US Average)',
    },

    {
      value: 2.02,
      color: symbolColors.high,
      label: '2.02%',
    },
  ],
};

var colorAndSizeRenderer = {
  type: 'simple',
  symbol: {
    type: 'simple-marker',
    outline: {
      color: outlineColor,
      width: '0.5px',
    },
  },
  visualVariables: [colorVisualVariable, sizeVisualVariable],
};
var colorRenderer = {
  type: 'simple',
  symbol: {
    type: 'simple-fill',
    outline: {
      color: outlineColor,
      width: '0.5px',
    },
  },
  visualVariables: [colorVisualVariable],
};

export { colorAndSizeRenderer, colorRenderer, symbolColors };

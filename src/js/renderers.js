var colorAndSizePurpleAndGreen = {
  type: 'simple',
  symbol: {
    type: 'simple-marker',
    outline: {
      color: [255, 255, 255, 0.25],
      width: '0.5px',
    },
  },
  label: 'Population 2020 County Centroid',
  visualVariables: [
    {
      type: 'color',
      field: 'pop_growth',
      legendOptions: {
        title: '2010 - 2020 Annual Compound Growth Rate',
      },
      stops: [
        {
          value: -1.23,
          color: '#40004b',
          label: '-1.23%',
        },
        {
          value: 0.76,
          color: '#f7f7f7',
          label: '0.76% (US Average)',
        },
        {
          value: 2.26,
          color: '#00441b',
          label: '2.26%',
        },
      ],
    },
    {
      type: 'size',
      field: 'pop_change',
      minDataValue: 0,
      maxDataValue: 200000,
      minSize: 6,
      maxSize: 60,
      // stops: [
      //   {
      //     value: 0,
      //     size: 6,
      //   },
      //   {
      //     value: 200000,
      //     size: 70,
      //   },
      // ],
    },
  ],
};

var colorAndSizePurpleAndGray1 = {
  type: 'simple',
  symbol: {
    type: 'simple-marker',
    outline: {
      color: [255, 255, 255, 0.25],
      width: '0.5px',
    },
  },
  label: 'Population 2020 County Centroid',
  visualVariables: [
    {
      type: 'color',
      field: 'pop_growth',
      legendOptions: {
        title: '2010 - 2020 Annual Compound Growth Rate',
      },
      stops: [
        {
          value: -1.23,
          color: '#faefdb',
          label: '-1.23%',
        },
        {
          value: 0.75,
          color: '#54534d',
          // label: '0.76% (Below US Average)',
        },
        {
          value: 0.76,
          color: '#594154',
          label: '0.76% (US Average)',
        },
        {
          value: 0.77,
          color: '#594154',
          // label: '0.77% (Above US Average)',
        },
        {
          value: 2.26,
          color: '#ff99ff',
          label: '2.26%',
        },
      ],
    },
    {
      type: 'size',
      field: 'pop_change',
      minDataValue: 0,
      maxDataValue: 200000,
      minSize: 6,
      maxSize: 60,
      // stops: [
      //   {
      //     value: 0,
      //     size: 6,
      //   },
      //   {
      //     value: 200000,
      //     size: 70,
      //   },
      // ],
    },
  ],
};

var blueAndGray3 = {
  type: 'simple',
  symbol: {
    type: 'simple-marker',
    outline: {
      color: [66, 64, 56, 0.25],
      width: '0.5px',
    },
  },
  label: 'Population 2020 County Centroid',
  visualVariables: [
    {
      type: 'color',
      field: 'pop_growth',
      legendOptions: {
        title: '2010 - 2020 Annual Compound Growth Rate',
      },
      stops: [
        {
          value: -0.5,
          color: '#cccccc',
          label: '-1.23%',
        },

        {
          value: 0.76,
          color: '#424038',
          label: '0.76% (US Average)',
        },

        {
          value: 2.02,
          color: '#00b3ff',
          label: '2.02%',
        },
      ],
    },
    {
      type: 'size',
      field: 'pop_change',
      legendOptions: {
        title: 'Population Change',
      },
      minDataValue: 0,
      maxDataValue: 500000,
      minSize: 4,
      maxSize: 50,
    },
  ],
};

export { colorAndSizePurpleAndGreen, colorAndSizePurpleAndGray1, blueAndGray3 };

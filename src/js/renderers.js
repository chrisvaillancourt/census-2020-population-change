var colorAndSize = {
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
      stops: [
        {
          value: 0,
          size: 6,
        },
        {
          value: 200000,
          size: 70,
        },
      ],
    },
  ],
};

export { colorAndSize };

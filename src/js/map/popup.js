var popupTemplate = {
  title: '{NAME}, {st_name}',
  outFields: ['*'],
  content: getPopupContent,
};

function getPopupContent(feature) {
  var {
    graphic: { attributes },
  } = feature;
  console.log(attributes);
  var { pop_growth } = attributes;
  return [
    {
      type: 'text',
      text: `Between 2010 - 2020, the annual compound growth rate for this area was <span style="color: ${getFormattedColor(
        { num: pop_growth, breakpoint: 0.76 }
      )}">{pop_growth}%</span> the population of this area changed by {pop_change} people. The growth rate for the U.S. was 0.76% per year.`,
    },
  ];
}

function getFormattedColor({ num, breakpoint }) {
  const aboveAvgColor = '#0795d1';
  const belowAvgColor = '#a9a9a9';
  const tieColor = '#ffffff';
  if (num > breakpoint) return aboveAvgColor;
  else if (num < breakpoint) return belowAvgColor;
  else return tieColor;
}
export { popupTemplate };

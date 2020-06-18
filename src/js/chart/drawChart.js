import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { extent, max, histogram, mean } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { transition } from 'd3-transition';

function setUpChartElements() {
  var wrapper = select('#chart-wrapper');

  var dimensions = getDimensions();

  var svg = wrapper
    .select('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);
  var bounds = svg
    .append('g')
    .attr('id', 'bounds')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.right}px)`
    );

  var barsGroup = bounds.append('g').attr('class', 'bars');
}

function drawBarChart(data) {
  console.time('draw chart');
  // console.table(data[0]);
  // step 1) access data
  data = [...data];
  // var testData = data.slice(0, 10);
  // console.log(testData);
  // TODO break data summing into separate function
  var summaryFields = [
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
  ];

  var chartData = sumFields({
    fields: summaryFields,
    dataToSummarize: data,
  });

  function yAccessor(d) {
    var [popYear] = d;
    return popYear;
  }
  function xAccessor(d) {
    var [, population] = d;
    return population;
  }
  // create an arrary of key valye pairs for d3 data binding
  var chartDataArr = [...chartData.entries()];

  // step 3) draw canvas
  var dimensions = getDimensions();
  var wrapper = select('#chart-wrapper');
  var svg = wrapper.select('svg');
  var bounds = wrapper.select('#bounds');
  // step 4) setup scales
  var chartDataValues = [...chartData.values()];
  var maxChartValue = max(chartDataValues);

  var xScale = scaleLinear()
    .domain([0, maxChartValue])
    .range([0, dimensions.boundedWidth])
    .nice();
  var dataKeys = [...chartData.keys()];

  // band scales are good for charts with categorical dimensions
  // in this case, each year is a separate category
  var yScale = scaleBand()
    .domain(dataKeys)
    .range([dimensions.boundedHeight, 0]);

  // step 5) draw data
  var exitTransition = transition().duration(5000);

  var updateTransition = exitTransition.transition().duration(5000);
  var barsGroup = select('.bars');

  var newBars = barsGroup.selectAll('.bar').data(chartDataArr, yAccessor);

  function renderBars({
    selection,
    data,
    keyFunction,
    xScale,
    yScale,
    xAccessor,
    yAccessor,
    transition,
    transitionDuration,
  }) {
    // rects is the update selection
    // in d3, the data join is the update selection
    var rects = selection.selectAll('rect').data(data, keyFunction);

    var newRects = rects
      .enter()
      .append('rect')
      .attr('x', xScale(0))
      .attr('y', function scaleY(d) {
        return yScale(yAccessor(d));
      })
      .attr('height', yScale.bandwidth())
      .attr('width', 0)
      .attr('fill', 'steelblue')
      .merge(rects) // merge enter selection with the update selection
      // anything that we want to change with new data updates should be set
      // after the merge
      .transition(transition)
      .duration(transitionDuration)
      .attr('width', function scaleWidth(d) {
        return xScale(xAccessor(d));
      });
    // .attr('fill', 'red');

    var exitingRects = rects
      .exit()
      .transition(transition)
      .duration(transitionDuration)
      .attr('width', 0)
      .remove();
  }
  renderBars({
    selection: barsGroup,
    data: chartDataArr,
    keyFunction: yAccessor,
    xScale: xScale,
    yScale: yScale,
    xAccessor: xAccessor,
    yAccessor: yAccessor,
    transition: transition(),
    transitionDuration: 500,
  });

  // step 6) draw peripherals
  var xAxisGenerator = axisBottom().scale(xScale);
  var axis = bounds
    .select('.x-axis')
    .transition(updateTransition)
    .call(xAxisGenerator);
  // step 7) interactions

  console.timeEnd('draw chart');
}
function sumFields({ fields = [], dataToSummarize = [] } = {}) {
  console.time('summarize fields');
  // Use a map since it can be more performant than a regular object
  var summaryDataStore = new Map();

  // set a key for each field we want to summarize
  fields.forEach(function setStoreKeys(fieldName) {
    summaryDataStore.set(fieldName, 0);
  });

  // summarize data with addition
  dataToSummarize.reduce(function (summaryStore, currentObj) {
    for (let [key, value] of Object.entries(currentObj)) {
      if (summaryStore.has(key)) {
        var newSummaryValue = summaryStore.get(key) + value;
        summaryStore.set(key, newSummaryValue);
      }
    }
    return summaryStore;
  }, summaryDataStore);
  console.timeEnd('summarize fields');
  return summaryDataStore;
}

function getDimensions() {
  var wrapper = select('#chart-wrapper');
  var dimensions = {
    width: getElementWidth(wrapper),
    height: getElementHeight(wrapper),
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  return dimensions;
}

function getElementWidth(d3Selection) {
  return parseInt(d3Selection.style('width'), 10);
}
function getElementHeight(d3Selection) {
  return parseInt(d3Selection.style('height'), 10);
}

export { setUpChartElements, drawBarChart };

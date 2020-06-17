import { select } from 'd3-selection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { extent, max, histogram, mean } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';

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

  function sumFields({ fields = [], dataToSummarize = [] } = {}) {
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
    return summaryDataStore;
  }
  var chartData = sumFields({
    fields: summaryFields,
    dataToSummarize: data,
  });
  console.log(chartData);

  // step 2) Setup dimensions
  var wrapper = select('.chart-wrapper');

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

  // step 3) draw canvas
  wrapper
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);
  var bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.right})`
    );

  // step 4) setup scales
  var chartDataValues = [...chartData.values()];
  var maxChartValue = max(chartDataValues);

  var xScale = scaleLinear()
    .domain([0, maxChartValue])
    .range([0, dimensions.boundedWidth])
    .nice();
  var dataKeys = [...chartData.keys()];

  // var yScale = scaleOrdinal()
  //   .domain()
  //   .range()
  //   .nice();
  // step 5) draw data

  // step 6) draw peripherals

  console.timeEnd('draw chart');
}

function getElementWidth(d3Selection) {
  return parseInt(d3Selection.style('width'), 10);
}
function getElementHeight(d3Selection) {
  return parseInt(d3Selection.style('height'), 10);
}

export { drawBarChart };

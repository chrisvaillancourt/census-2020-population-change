import { getDimensions } from '../utils/domSetup';
import { yAccessor, xAccessor } from '../utils/chartSetup';
import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { max, range, extent } from 'd3-array';
import { timeFormat, timeParse } from 'd3-time-format';

function renderLineChart({ data, dimensions }) {
  console.time('renderLineChart');

  // access data

  data = [...data];

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
  var startDate = new Date(2010, 6, 1);
  var endDate = new Date(2020, 6, 1);
  var chartData = data.map((countyObj) => {
    return {
      id: countyObj['ID'],
      name: countyObj['NAME'],
      state: countyObj['st_name'],
      stateAbbrev: countyObj['st_abbrev'],
      popChange2010_2020: countyObj['pop_change'],
      popCompoundGrowth2010_2020: countyObj['pop_growth'],
      values: [
        { date: new Date(2010, 6, 1), population: countyObj['TSPOP10_CY'] },
        { date: new Date(2011, 6, 1), population: countyObj['TSPOP11_CY'] },
        { date: new Date(2012, 6, 1), population: countyObj['TSPOP12_CY'] },
        { date: new Date(2013, 6, 1), population: countyObj['TSPOP13_CY'] },
        { date: new Date(2014, 6, 1), population: countyObj['TSPOP14_CY'] },
        { date: new Date(2015, 6, 1), population: countyObj['TSPOP15_CY'] },
        { date: new Date(2016, 6, 1), population: countyObj['TSPOP16_CY'] },
        { date: new Date(2017, 6, 1), population: countyObj['TSPOP17_CY'] },
        { date: new Date(2018, 6, 1), population: countyObj['TSPOP18_CY'] },
        { date: new Date(2019, 6, 1), population: countyObj['TSPOP19_CY'] },
        { date: new Date(2020, 6, 1), population: countyObj['TOTPOP_CY'] },
      ],
    };
  });

  function yAccessor(d) {
    return d.population;
  }
  function xAccessor(d) {
    return d.date;
  }
  function key(d) {
    return d.id;
  }

  var yMax = max(chartData, function (c) {
    return max(c.values, yAccessor);
  });

  var dateParser = timeParse('%Y');

  // draw canvas

  var wrapper = select('#chart-wrapper');
  var svg = wrapper.select('svg');
  var bounds = wrapper.select('#bounds');
  var linesGroup = select('.primary-vis');

  // create scales
  var yScale = scaleLinear()
    .domain([0, yMax])
    .range([dimensions.boundedHeight, 0]);

  var xScale = scaleTime()
    .domain([startDate, endDate])
    .range([0, dimensions.boundedWidth]);

  // draw data
  var lineGenerator = line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.population));
  // enter selection
  var countyGroup = linesGroup
    .selectAll('.line')
    .data(chartData, key)
    .enter()
    .append('g')
    .attr('class', 'county-line');
  countyGroup
    .append('path')
    .attr('class', 'line')
    .attr('d', function (d) {
      return lineGenerator(d.values);
    })
    .style('stroke', 'white')
    .style('opacity', 0.2);

  // draw peripherals

  // setup interaction

  console.timeEnd('renderLineChart');
}

export { renderLineChart };

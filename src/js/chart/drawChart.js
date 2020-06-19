import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { extent, max, histogram, mean } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
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
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  var barsGroup = bounds.append('g').attr('class', 'bars');
  var xAxis = bounds
    .append('g')
    .attr('class', 'x-axis')
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);
  var yAxis = bounds
    .append('g')
    .attr('class', 'y-axis')
    .style('transform', `translateX(${dimensions.margin.left - 100}px)`);
}

function drawBarChart(data) {
  console.time('draw chart');

  // step 1) access data
  data = [...data];

  function yAccessor(d) {
    var [popYear] = d;
    return popYear;
  }
  function xAccessor(d) {
    var [, population] = d;
    return population;
  }

  var years = data.map(function (subArr) {
    var [year] = subArr;
    return year;
  });
  // chartDataArr.push()
  // console.log(chartDataArr);

  // step 3) draw canvas
  var dimensions = getDimensions();
  var wrapper = select('#chart-wrapper');
  var svg = wrapper.select('svg');
  var bounds = wrapper.select('#bounds');
  // step 4) setup scales
  var chartDataValues = data.map(function getPopValues(subArr) {
    var [, populationVal] = subArr;
    return populationVal;
  });
  var maxChartValue = max(chartDataValues);

  var xScale = scaleLinear()
    .domain([0, maxChartValue])
    .range([0, dimensions.boundedWidth])
    .nice();

  // band scales are good for charts with categorical dimensions
  // in this case, each year is a separate category
  var yScale = scaleBand().domain(years).range([dimensions.boundedHeight, 0]);

  // step 5) draw data

  var barsTransition = transition().duration(300);

  var barsGroup = select('.bars');

  var newBars = barsGroup.selectAll('.bar').data(data, yAccessor);

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
      .transition(barsTransition)
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
    data: data,
    keyFunction: yAccessor,
    xScale: xScale,
    yScale: yScale,
    xAccessor: xAccessor,
    yAccessor: yAccessor,
    transition: barsTransition,
  });

  // step 6) draw peripherals

  function renderXAxis({ scale, transition, chartBounds }) {
    var xAxisGenerator = axisBottom()
      .scale(scale)
      .ticks(5)
      .tickFormat(format('~s'));
    var xAxis = chartBounds
      .select('.x-axis')
      .transition(transition)
      .call(xAxisGenerator);
  }

  renderXAxis({
    scale: xScale,
    transition: barsTransition,
    chartBounds: bounds,
    groupClass: 'x-scale',
  });

  function renderYAxis({ scale, chartBounds }) {
    var yAxisGenerator = axisLeft().scale(scale);
    var yAxis = chartBounds.select('.y-axis').call(yAxisGenerator);
  }

  renderYAxis({
    scale: yScale,
    chartBounds: bounds,
  });

  // step 7) interactions

  console.timeEnd('draw chart');
}

function getDimensions() {
  var wrapper = select('#chart-wrapper');
  var dimensions = {
    width: getElementWidth(wrapper),
    height: getElementHeight(wrapper),
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 100,
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

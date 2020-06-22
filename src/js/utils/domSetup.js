import { select } from 'd3-selection';

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

export { setUpChartElements, getDimensions };

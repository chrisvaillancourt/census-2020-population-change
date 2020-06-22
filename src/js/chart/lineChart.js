import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import { getDimensions } from '../utils/domSetup';
import { yAccessor, xAccessor } from '../utils/chartSetup';
import { max } from 'd3-array';
function renderLineChart({ data, dimensions }) {
  console.time('renderLineChart');

  // access data

  data = [...data];
  var testData = data.slice(0, 10);

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

  var popDataArr = data.reduce(function getPopFigures(popArray, countyObj) {
    popArray.push(
      countyObj[summaryFields[0]],
      countyObj[summaryFields[1]],
      countyObj[summaryFields[2]],
      countyObj[summaryFields[3]],
      countyObj[summaryFields[4]],
      countyObj[summaryFields[5]],
      countyObj[summaryFields[6]],
      countyObj[summaryFields[7]],
      countyObj[summaryFields[8]],
      countyObj[summaryFields[9]],
      countyObj[summaryFields[10]]
    );
    return popArray;
  }, []);
  var yMax = max(popDataArr);
  console.log(yMax);

  // draw canvas

  var wrapper = select('#chart-wrapper');
  var svg = wrapper.select('svg');
  var bounds = wrapper.select('#bounds');

  // create scales

  // draw data

  // draw peripherals

  // setup interaction

  console.timeEnd('renderLineChart');
}

export { renderLineChart };

import './styles/normalize.css';
import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import Extent from 'esri/geometry/Extent';
import Legend from 'esri/widgets/Legend';
import Home from 'esri/widgets/Home';
import Expand from 'esri/widgets/Expand';
import watchUtils from 'esri/core/watchUtils';
import LayerList from 'esri/widgets/LayerList';
import { basemap } from './js/map/basemap';
import { countyGeoJsonCentroid, countyGeoJson } from './js/map/featureLayers';
import {
  colorAndSizeBlueAndGray3,
  colorBlueAndGray3,
} from './js/map/renderers';
import { drawBarChart } from './js/chart/barChart';
import { renderLineChart } from './js/chart/lineChart.js';
import { setUpChartElements } from './js/utils/domSetup.js';
import { getDimensions } from './js/utils/domSetup.js';
import { summarizeFields } from './js/utils/dataManipulation';

async function createMap() {
  var map = new esriMap({
    basemap,
    // Don't add layers here yet because they haven't resolved
    // and we don't want to pause the execution with 'await' just yet.
  });

  var view = new MapView({
    container: 'viewDiv',
    map: map,
    extent: new Extent({
      xmax: 2624278.0972463945,
      xmin: -3309231.185521407,
      ymax: 1784583.7986036085,
      ymin: -1879502.601325326,
      spatialReference: {
        wkid: 102003,
      },
    }),
  });

  var homeBtn = new Home({
    view,
  });
  var legend = new Legend({
    view,
    container: document.createElement('div'),
  });
  var legendExpand = new Expand({
    expandIconClass: 'esri-icon-key',
    view,
    content: legend.domNode,
  });
  var layerList = new LayerList({
    view,
  });

  view.ui.move('zoom', 'bottom-right');

  var [viewReady, countyPolygonLayer, countyCentroidLayer] = await Promise.all([
    view.when(),
    countyGeoJson,
    countyGeoJsonCentroid,
  ]);

  countyCentroidLayer.renderer = colorAndSizeBlueAndGray3;
  countyCentroidLayer.title = 'US County';
  countyPolygonLayer.renderer = colorBlueAndGray3;
  countyPolygonLayer.title = 'US County (Polygon)';
  countyPolygonLayer.visible = false;
  map.addMany([countyCentroidLayer, countyPolygonLayer]);

  var chartDiv = document.querySelector('#chart');
  chartDiv.style.display = 'initial';
  view.ui.add(chartDiv, 'bottom-left');
  setUpChartElements();
  view.ui.add([homeBtn], 'bottom-right');
  view.ui.add([legendExpand, layerList], 'top-right');

  var countyCentroidLayerView = await view.whenLayerView(countyCentroidLayer);
  watchUtils.whenFalseOnce(countyCentroidLayerView, 'updating', endTimer);
  watchUtils.whenFalse(countyCentroidLayerView, 'updating', queryLayerView);

  function endTimer() {
    console.timeEnd('map');
  }
  async function queryLayerView() {
    var results = await countyCentroidLayerView.queryFeatures();
    var attributes = results.features.map((feature) => feature.attributes);

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

    var summaryData = summarizeFields({
      fields: summaryFields,
      dataToSummarize: attributes,
    });
    var numberRegex = /\d+/;
    var chartData = [...summaryData.entries()].map(function changeAlias(
      subArr
    ) {
      var [year, val] = subArr;
      var yearAlias;
      if (year == 'TOTPOP_CY') {
        yearAlias = '2020';
      } else {
        var yearNumber = year.match(numberRegex);
        yearAlias = '20'.concat(String(yearNumber));
      }
      return [yearAlias, val];
    });
    chartData.reverse();
    var chartDimensions = getDimensions();
    drawBarChart({ data: chartData, chartDimensions });

    // renderLineChart({
    //   data: attributes,
    //   dimensions: chartDimensions,
    // });
  }
}
console.time('map');
createMap()
  .then(() => {
    // do stuff
  })
  .catch(console.error);

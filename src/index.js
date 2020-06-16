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
import { basemap } from './js/basemap';
import { countyGeoJsonCentroid, countyGeoJson } from './js/featureLayers';
import { colorAndSizeBlueAndGray3, colorBlueAndGray3 } from './js/renderers';

async function createMap() {
  var countyPolygonLayer = await countyGeoJson;
  var countyCentroidLayer = await countyGeoJsonCentroid;
  countyCentroidLayer.renderer = colorAndSizeBlueAndGray3;
  countyCentroidLayer.title = 'US County';
  countyPolygonLayer.renderer = colorBlueAndGray3;
  countyPolygonLayer.title = 'US County (Polygon)';
  countyPolygonLayer.visible = false;

  var map = new esriMap({
    basemap,
    layers: [countyCentroidLayer, countyPolygonLayer],
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

  await view.when();

  var chartDiv = createDiv({
    classname: 'chart',
  });
  view.ui.add(chartDiv, 'bottom-left');
  view.ui.add([homeBtn], 'bottom-right');
  view.ui.add([legendExpand, layerList], 'top-right');

  var countyLayerView = await view.whenLayerView(countyCentroidLayer);
  watchUtils.whenFalseOnce(countyLayerView, 'updating', endTimer);
  watchUtils.whenFalse(countyLayerView, 'updating', queryLayerView);

  function endTimer() {
    console.timeEnd('map');
  }
  async function queryLayerView() {
    var results = await countyLayerView.queryFeatures();
    var attributes = results.features.map((feature) => feature.attributes);
    console.log(attributes);
  }
  function createDiv({ classname = '' }) {
    var div = document.createElement('div');
    div.classList.add(classname);
    return div;
  }
}
console.time('map');
createMap()
  .then(() => {
    // do stuff
  })
  .catch(console.error);

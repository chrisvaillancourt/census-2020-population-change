import './styles/normalize.css';
import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import Extent from 'esri/geometry/Extent';
import Legend from 'esri/widgets/Legend';
import Home from 'esri/widgets/Home';
import Expand from 'esri/widgets/Expand';
import { basemap } from './js/basemap';
import { countyGeoJsonCentroid } from './js/featureLayers';
import { blueAndGray3 } from './js/renderers';

console.time('map');
async function createMap() {
  var countyLayer = await countyGeoJsonCentroid;
  countyLayer.renderer = blueAndGray3;
  countyLayer.title = 'US County';
  var map = new esriMap({
    basemap,
    layers: [countyLayer],
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

  view.ui.move('zoom', 'bottom-right');

  await view.when();

  view.ui.add([homeBtn], 'bottom-right');
  view.ui.add([legendExpand], 'top-right');

  var countyLayerView = await view.whenLayerView(countyLayer);
  // var shouldZoom = true;

  countyLayerView.watch('updating', async (isUpdating) => {
    if (isUpdating) return;

    // if (shouldZoom) {
    // only zoom to feature extent on initial load
    // var layerExtent = await countyLayerView.queryExtent();

    // view.goTo(layerExtent);
    // shouldZoom = false;
    // }

    console.timeEnd('map');

    var results = await countyLayerView.queryFeatures();
    var attributes = results.features.map((feature) => feature.attributes);

    // console.log(attributes);
  });
}

createMap()
  .then(() => {
    // do stuff
  })
  .catch(console.error);

import './styles/normalize.css';
import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import { basemap } from './data/basemap';
import Home from 'esri/widgets/Home';
import { countyLayer } from './data/featureLayers';
var l = console.log.bind(console);

async function createMap() {
  console.time('map');
  var map = new esriMap({
    basemap,
    layers: [countyLayer],
  });

  var view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [-99.74405, 38.1374], // longitude, latitude
    zoom: 3,
  });
  var homeBtn = new Home({
    view,
  });

  view.ui.move('zoom', 'bottom-right');

  await view.when();
  view.ui.add([homeBtn], 'bottom-right');
  var countyLayerView = await view.whenLayerView(countyLayer);
  countyLayerView.watch('updating', async (isUpdating) => {
    if (isUpdating) return;
    var results = await countyLayerView.queryFeatures();
    var attributes = results.features.map((feature) => feature.attributes);
    console.log(attributes);
  });
}

createMap()
  .then(() => console.timeEnd('map'))
  .catch(console.error);

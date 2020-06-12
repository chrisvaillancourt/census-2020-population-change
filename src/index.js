import './styles/normalize.css';
import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import { basemap } from './js/basemap';
import Home from 'esri/widgets/Home';
import { countyGeoJson } from './js/featureLayers';

console.time('map');
async function createMap() {
  var countyLayer = await countyGeoJson;

  var map = new esriMap({
    basemap,
    layers: [countyLayer],
  });

  var view = new MapView({
    container: 'viewDiv',
    map: map,
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

    var layerExtent = await countyLayerView.queryExtent();
    view.goTo(layerExtent);

    var results = await countyLayerView.queryFeatures();
    var attributes = results.features.map((feature) => feature.attributes);

    console.log(attributes);
  });
}

createMap()
  .then(() => {
    // do stuff
  })
  .catch(console.error);

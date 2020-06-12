import './styles/normalize.css';
import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import { basemap } from './data/basemap';
import Home from 'esri/widgets/Home';

var l = console.log.bind(console);

function createMap() {
  console.time('map');
  var map = new esriMap({
    basemap,
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
  view.when(
    async function workWithView() {
      view.ui.add([homeBtn], 'bottom-right');
    }
      .then(() => console.timeEnd('map'))
      .catch(console.error)
  );
}

createMap();

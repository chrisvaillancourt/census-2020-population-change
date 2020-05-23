import './styles/normalize.css';
import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import { basemap } from './data/basemap';
import { homeBtn } from './data/widgets';

console.time('map');
var l = console.log.bind(console);

function createMap() {
  var map = new esriMap({
    basemap,
  });

  var view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [-99.74405, 38.1374], // longitude, latitude
    zoom: 3,
  });
  homeBtn.view = view;
  view.ui.move('zoom', 'bottom-right');
  view.when(async function workWithView() {
    view.ui.add(homeBtn, 'bottom-right');
  });
}

createMap();

console.timeEnd('map');

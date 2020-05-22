import './styles/style.css';
import esriMap from 'esri/Map';
import MapView from 'esri/views/MapView';

var l = console.log.bind(console);
console.time('map');
var map = new esriMap({
  basemap: 'topo-vector',
});

var view = new MapView({
  container: 'viewDiv',
  map: map,
  center: [-118.805, 34.027], // longitude, latitude
  zoom: 13,
});

console.timeEnd('map');

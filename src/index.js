'use strict';
var l = console.log.bind(console);
l('loading...');

require(['esri/Map', 'esri/views/MapView'], function (Map, MapView) {
  var map = new Map({
    basemap: 'topo-vector',
  });

  var view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13,
  });
});

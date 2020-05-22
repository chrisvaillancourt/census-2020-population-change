
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
define(function () { 'use strict';

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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcyc7XG52YXIgbCA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5sKCdsb2FkaW5nLi4uJyk7XG5cbnJlcXVpcmUoWydlc3JpL01hcCcsICdlc3JpL3ZpZXdzL01hcFZpZXcnXSwgZnVuY3Rpb24gKE1hcCwgTWFwVmlldykge1xuICB2YXIgbWFwID0gbmV3IE1hcCh7XG4gICAgYmFzZW1hcDogJ3RvcG8tdmVjdG9yJyxcbiAgfSk7XG5cbiAgdmFyIHZpZXcgPSBuZXcgTWFwVmlldyh7XG4gICAgY29udGFpbmVyOiAndmlld0RpdicsXG4gICAgbWFwOiBtYXAsXG4gICAgY2VudGVyOiBbLTExOC44MDUsIDM0LjAyN10sIC8vIGxvbmdpdHVkZSwgbGF0aXR1ZGVcbiAgICB6b29tOiAxMyxcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0VBQ0EsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDbEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hCO0VBQ0EsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLEVBQUUsVUFBVSxHQUFHLEVBQUUsT0FBTyxFQUFFO0VBQ3BFLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7RUFDcEIsSUFBSSxPQUFPLEVBQUUsYUFBYTtFQUMxQixHQUFHLENBQUMsQ0FBQztBQUNMO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQztFQUN6QixJQUFJLFNBQVMsRUFBRSxTQUFTO0VBQ3hCLElBQUksR0FBRyxFQUFFLEdBQUc7RUFDWixJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztFQUM5QixJQUFJLElBQUksRUFBRSxFQUFFO0VBQ1osR0FBRyxDQUFDLENBQUM7RUFDTCxDQUFDLENBQUM7Ozs7In0=

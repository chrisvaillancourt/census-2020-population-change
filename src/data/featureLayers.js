import FeatureLayer from 'esri/layers/FeatureLayer';

var countyLayer = new FeatureLayer({
  url:
    'https://services7.arcgis.com/Fnhc04BJL93uqCjd/ArcGIS/rest/services/counties_2020_population/FeatureServer/1',
  outFields: ['*'],
});

export { countyLayer };

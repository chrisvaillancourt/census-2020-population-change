import FeatureLayer from 'esri/layers/FeatureLayer';
import GeoJSONLayer from 'esri/layers/GeoJSONLayer';
import { json } from 'd3-fetch';

var countyLayer = new FeatureLayer({
  url:
    'https://services7.arcgis.com/Fnhc04BJL93uqCjd/ArcGIS/rest/services/counties_2020_population/FeatureServer/1',
  outFields: ['*'],
});

async function createEsriGeoJson(geoJson) {
  var blob = await new Blob([JSON.stringify(geoJson)], {
    type: 'application/json',
  });
  var url = URL.createObjectURL(blob);
  var geoJsonLayer = new GeoJSONLayer({
    url,
    outFields: ['*'],
  });
  return geoJsonLayer;
}
async function createCountyGeoJsonLyr() {
  var countyGeoJson = await json(
    './geo-data/county-json/county_simplified_contig_albers.json'
  );
  var countyEsriGeoJson = await createEsriGeoJson(countyGeoJson);
  return countyEsriGeoJson;
}

var countyGeoJson = createCountyGeoJsonLyr();

export { countyLayer, countyGeoJson };

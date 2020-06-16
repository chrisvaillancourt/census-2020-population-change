import VectorTileLayer from 'esri/layers/VectorTileLayer';
import Basemap from 'esri/Basemap';

const darkGreyUrl =
  'https://esritech.maps.arcgis.com/sharing/rest/content/items/14463d7a63e64fc48448ca0e269a6c5f/resources/styles/root.json';

const lightGreyUrl =
  'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Albers48Basemap/VectorTileServer';

var vectorBaseLayer = new VectorTileLayer({
  url: darkGreyUrl,
});

var vectorStateBoundary = new VectorTileLayer({
  url:
    'https://tiles.arcgis.com/tiles/Fnhc04BJL93uqCjd/arcgis/rest/services/dtl_st_ln_lower48_albers/VectorTileServer/resources/styles/root.json',
});

var basemap = new Basemap({
  baseLayers: [vectorBaseLayer, vectorStateBoundary],
  referenceLayers: [],
});

export { basemap };

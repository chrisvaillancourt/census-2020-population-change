import VectorTileLayer from 'esri/layers/VectorTileLayer';
import Basemap from 'esri/Basemap';

const vectorBaseLayer = new VectorTileLayer({
  url: `https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Albers48Basemap/VectorTileServer`,
});

const basemap = new Basemap({
  baseLayers: [vectorBaseLayer],
  referenceLayers: [],
});

export { basemap };

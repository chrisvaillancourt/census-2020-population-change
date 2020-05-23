import VectorTileLayer from 'esri/layers/VectorTileLayer';
import Basemap from 'esri/Basemap';

const vectorBaseLayer = new VectorTileLayer({
  url: `https://www.arcgis.com/sharing/rest/content/items/2afe5b807fa74006be6363fd243ffb30/resources/styles/root.json`,
});
const vectorBaseReference = new VectorTileLayer({
  url: `https://www.arcgis.com/sharing/rest/content/items/ba52238d338745b1a355407ec9df6768/resources/styles/root.json`,
  opacity: 0.7,
});
const vectorDetailLayer = new VectorTileLayer({
  url: `https://www.arcgis.com/sharing/rest/content/items/97fa1365da1e43eabb90d0364326bc2d/resources/styles/root.json`,
  opacity: 0.35,
});

const basemap = new Basemap({
  baseLayers: [vectorBaseLayer, vectorDetailLayer],
  referenceLayers: [vectorBaseReference],
});

export { basemap };

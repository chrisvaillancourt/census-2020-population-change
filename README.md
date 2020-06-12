# ArcGIS JavaScript API Template App

A template for using [Esri's JS API](https://developers.arcgis.com/javascript/) with modern [module import syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), powered by [rollup](https://rollupjs.org/). Inspired by [this blog](https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/writing-modern-javascript-with-the-arcgis-api-for-javascript/) by Rene Rubalcava.

See it live [here](https://chrisvaillancourt.github.io/arcgis-js-rollup/).

## Usage

To build for local development:

_Note_: There seems to be an [issue](https://github.com/thgh/rollup-plugin-livereload/issues/46) with the livereload rollup plugin that prevents the browser from reloading automatically.

```sh
npm run serve
```

To build for production:

```sh
npm run build
```

To deploy with GitHub pages:

```sh
npm run deploy
```

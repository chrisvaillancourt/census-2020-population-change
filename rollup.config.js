/* eslint-disable no-undef */
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import browsersync from 'rollup-plugin-browsersync';
import styles from 'rollup-plugin-styles';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Builds based on environment
const OUTPUT =
  process.env.BUILD === 'development' ? 'output/dev' : 'output/dist';
const SOURCEMAP = process.env.BUILD === 'development' ? 'inline' : false;
const MINIFY = process.env.BUILD === 'development' ? null : terser();
const minifyCss = process.env.BUILD === 'development' ? false : true;
const SERVER =
  process.env.BUILD === 'development'
    ? [serve(OUTPUT), browsersync({ server: OUTPUT })]
    : [];

export default {
  input: './src/index.js',
  output: {
    dir: OUTPUT,
    format: 'amd',
    sourcemap: SOURCEMAP,
    entryFileNames: '[name].js',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    del({ targets: OUTPUT }),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    styles({
      mode: 'extract',
      minimize: minifyCss,
      url: {
        publicPath: '../assets/',
      },
    }),
    MINIFY,

    copy({
      targets: [{ src: 'public/*', dest: OUTPUT }],
    }),
    ...SERVER,
  ],
};

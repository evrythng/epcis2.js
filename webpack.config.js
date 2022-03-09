const { resolve } = require('path');

const path = resolve(__dirname, 'dist');
const entry = './src/epcis2.polyfill.js';
const library = 'epcis2';

const browserConfig = {
  entry,
  output: {
    path,
    library,
    filename: 'epcis2.browser.js',
    libraryTarget: 'var',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-throw-expressions',
          ],
        },
      },
    ],
  },
};

const nodeConfig = {
  entry,
  target: 'node',
  output: {
    path,
    library,
    filename: 'epcis2.node.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-throw-expressions',
          ],
        },
      },
    ],
  },
};

module.exports = [browserConfig, nodeConfig];

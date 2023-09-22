const { resolve } = require('path');

const path = resolve(__dirname, 'dist');
const entry = './src/epcis2.polyfill.js';

const getCommonConfig = (outputFileName) => ({
  entry,
  output: {
    path,
    filename: outputFileName,
    libraryTarget: 'commonjs2',
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
});

const varProfile = {
  ...getCommonConfig('epcis2.var.js'),
  output: {
    path,
    library: 'epcis2',
    filename: 'epcis2.var.js',
    libraryTarget: 'var',
  }
}

const browserConfig = {
  ...getCommonConfig('epcis2.browser.js'),
  target: 'web',
};

const nodeConfig = {
  ...getCommonConfig('epcis2.node.js'),
  target: 'node',
};

module.exports = [browserConfig, nodeConfig, varProfile];

const { resolve } = require('path')

const path = resolve(__dirname, 'dist')
const entry = './src/index.js'
const library = 'epcis2'

const browserConfig = {
  entry: entry,
  output: {
    path: path,
    library: library,
    filename: 'epcis2.browser.js',
    libraryTarget: 'var'
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
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  }
}

const nodeConfig = {
  entry: entry,
  target: 'node',
  output: {
    path: path,
    library: library,
    filename: 'epcis2.node.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
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
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  }
}

module.exports = [browserConfig, nodeConfig]

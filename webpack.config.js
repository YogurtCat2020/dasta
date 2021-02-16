const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const {path, configWebpack} = require('../util')
const config = {
  author: 'YogurtCat',
  date: '2020-',
  name: 'dasta',
  version: '1.1.0',
  repository: {
    git: 'https://github.com/YogurtCat2020/dasta'
  }
}


module.exports = [
  configWebpack({
    path: path(__dirname),
    config,
    webpack,
    TerserPlugin,
    entry: 'src/index.ts',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    min: false,
    externals: {
      '@yogurtcat/lib': 'commonjs2 @yogurtcat/lib'
    }
  }),
  configWebpack({
    path: path(__dirname),
    config,
    webpack,
    TerserPlugin,
    entry: 'src/index.ts',
    filename: 'index.min.js',
    libraryTarget: 'global',
    library: 'dasta',
    min: true,
    externals: {
      '@yogurtcat/lib': 'global $yogurtcat$lib'
    }
  })
]

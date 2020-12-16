
const license = config => `${config.name}.js v${config.version}
(c) ${config.date} ${config.author}
Released under the MIT License.`


const webpackConfig = ({
  path,
  config,
  webpack,
  TerserPlugin,
  entry,
  filename,
  min,
  externals
}) => {
  const r = {
    entry: path(entry),
    output: {
      libraryTarget: 'umd',
      path: path('dist'),
      filename
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader'
      }]
    },
    plugins: [
      new webpack.BannerPlugin({
        entryOnly: true,
        banner: license(config)
      })
    ]
  }

  if(!min) {
    r.mode = 'development'
    r.devtool = false
  } else {
    r.mode = 'production'
    r.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false
        })
      ]
    }
  }

  if(externals) r.externals = externals

  return r
}


module.exports = webpackConfig

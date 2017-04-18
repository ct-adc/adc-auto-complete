var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, "./example"),
  entry: {
    simple:'./simple/index.js',
    double:'./double/index.js'
  },
  output: {
    path: path.resolve(__dirname, './asset'),
    publicPath: '/asset/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce:'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "jshint-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules:[path.resolve(__dirname, 'src/js/component'),path.resolve(__dirname, 'src/js/module'),'node_modules'],
    extensions: ['.js', '.json','.vue','.css','.scss'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

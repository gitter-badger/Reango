import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import HappyPack from 'happypack';

const root = process.cwd();
const clientInclude = [path.join(root, 'src', 'client'), path.join(root, 'src', 'universal')];

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'isomorphic-relay',
  'isomorphic-relay-router'
];

const prefetches = [
  'universal/modules/Todos/TodoApp.js'
];

const prefetchPlugins = prefetches.map(specifier => new webpack.PrefetchPlugin(specifier));


export default {
  context: path.join(root, 'src'),
  entry: {
    app: [
      'babel-polyfill',
      './client/client'
    ],
    vendor
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, 'build'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.join(root, 'src'), 'node_modules', path.join(root, 'build')]
  },
  plugins: [
    ...prefetchPlugins,
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      {
        names: ['vendor', 'manifest'],
        minChunks: Infinity
      }
    ),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 50000}),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}, comments: /(?:)/}),
    new AssetsPlugin({path: path.join(root, 'build'), filename: 'assets.json'}),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(
      {
        '__CLIENT__': true,
        '__PRODUCTION__': true,
        'process.env.NODE_ENV': JSON.stringify('production')
      }
    ),
    new HappyPack(
      {
        loaders: ['babel'],
        threads: 4,
        verbose: false
      }
    )
  ],

  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?\S*)?$/, loader: 'url-loader?limit=10000'},
      {test: /\.(eot|ttf|wav|mp3)(\?\S*)?$/, loader: 'file-loader'},
      {
        test: /\.js$/,
        loader: 'happypack/loader',
        include: clientInclude
      }
    ]
  }
};

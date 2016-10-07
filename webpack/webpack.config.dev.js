import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

const root = process.cwd();
const clientInclude = [
  path.join(root, 'src', 'client'),
  path.join(root, 'src', 'universal')
];

const prefetches = [
  'universal/modules/Todos/TodoApp.js'
];

const prefetchPlugins = prefetches.map(specifier => new webpack.PrefetchPlugin(specifier));


const babelQuery = {
  plugins: [
    ['transform-decorators-legacy'],
    ['react-transform', {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }]
    }]
  ]
};

export default {
  // devtool: 'source-maps',
  debug: true,
  devtool: 'eval',
  context: path.join(root, 'src'),
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client/client'
    ]
  },
  output: {
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, 'build'),
    publicPath: '/static/'
  },
  plugins: [
    ...prefetchPlugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__CLIENT__': true,
      '__PRODUCTION__': false,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HappyPack({
      loaders: ['babel'],
      threads: 4,
      verbose: false
    })
  ],
  resolve: {
    extensions: ['.js'],
    modules: [path.join(root, 'src'), 'node_modules']
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?\S*)?$/, loader: 'url-loader?limit=10000'},
      {test: /\.(eot|ttf|wav|mp3)(\?\S*)?$/, loader: 'file-loader'},
      {
        test: /\.js$/,
        loader: 'happypack/loader',
        query: babelQuery,
        include: clientInclude
      }
    ]
  }
};

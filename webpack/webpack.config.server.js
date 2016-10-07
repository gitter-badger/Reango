import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

const root = process.cwd();
const serverInclude = [path.join(root, 'src', 'server'), path.join(root, 'src', 'universal')];

export default {
  context: path.join(root, 'src'),
  entry: {
    prerender: './universal/routes/index'
  },
  target: 'node',
  output: {
    path: path.join(root, 'build'),
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  externals: [
    (context, request, callback) => {
      callback(
        null, !/^((|.|..|shared)\/|!|-!)/.test(request)
      );
    }
  ],
  resolve: {
    extensions: ['.js'],
    modules: [path.join(root, 'src'), 'node_modules', path.join(root, 'build')]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new webpack.DefinePlugin({
      '__CLIENT__': false,
      '__PRODUCTION__': true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HappyPack({
      loaders: ['babel'],
      threads: 4,
      verbose: false
    })
  ],
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000'
      },
      {test: /\.(eot|ttf|wav|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
      {
        test: /\.js$/,
        loader: 'happypack/loader',
        include: serverInclude
      },
    ]
  }
};

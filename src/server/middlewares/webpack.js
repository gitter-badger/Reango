import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../webpack/webpack.config.dev';

const webpackCompiler = webpack(webpackConfig);

const webpackDev = webpackDevMiddleware(webpackCompiler, {noInfo: true, publicPath: webpackConfig.output.publicPath});

const webpackHot = webpackHotMiddleware(webpackCompiler);

export default {
  webpackDev, webpackHot
};

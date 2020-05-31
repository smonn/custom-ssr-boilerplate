import LoadableWebpackPlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import merge from 'webpack-merge';
import parsePort from '../src/shared/utils/parsePort';
import { DEV, DIST, SRC } from './constants';
import shared from './shared';

const port = parsePort(process.env.PORT) + 1;

const client = merge(shared, {
  name: 'client',
  devtool: DEV ? 'eval-source-map' : 'source-map',
  entry: {
    app: DEV
      ? ['react-hot-loader/patch', path.resolve(SRC, 'client', 'app')]
      : ['react-hot-loader/patch', path.resolve(SRC, 'client', 'app')],
  },
  target: 'web',
  output: {
    publicPath: DEV ? `http://localhost:${port}/static/` : `/static/`,
    path: path.resolve(DIST, 'static'),
    filename: '[name].js',
  },
  devServer: DEV
    ? {
        compress: true,
        hot: true,
        noInfo: true,
        overlay: true,
        port,
        publicPath: `http://localhost:${port}/static/`,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    : undefined,
  plugins: DEV
    ? [
        new MiniCssExtractPlugin(),
        new LoadableWebpackPlugin({
          // This is required for loadable to pick up the client side assets
          writeToDisk: {
            filename: path.resolve(DIST, 'static'),
          },
        }),
      ]
    : [new MiniCssExtractPlugin(), new LoadableWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        exclude: /\.module\.(css)$/,
        use: DEV
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: { auto: true },
                },
              },
            ]
          : [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: { auto: true },
                },
              },
            ],
      },
    ],
  },
});

export default client;

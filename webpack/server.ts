import path from 'path';
import StartServerWebpackPlugin from 'start-server-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import webpackNodeExternals from 'webpack-node-externals';
import { DEV, DIST, SRC } from './constants';
import shared from './shared';

const server = merge(shared, {
  name: 'server',
  devtool: DEV ? 'eval-source-map' : undefined,
  entry: {
    server: DEV
      ? [
          'webpack/hot/signal',
          'react-hot-loader/patch',
          path.resolve(SRC, 'server'),
        ]
      : ['react-hot-loader/patch', path.resolve(SRC, 'server')],
  },
  target: 'node',
  output: {
    path: DIST,
    filename: '[name].js',
  },
  externals: [
    webpackNodeExternals({
      whitelist: DEV ? ['webpack/hot/signal'] : [],
    }),
  ],
  plugins: DEV
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new StartServerWebpackPlugin({
          name: 'server.js',
          nodeArgs: process.env.INSPECT
            ? ['--require=source-map-support/register', '--inspect']
            : ['--require=source-map-support/register'],
          signal: true,
        }),
      ]
    : [],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        exclude: /\.module\.(css)$/,
        use: ['css-loader'],
      },
    ],
  },
});

export default server;

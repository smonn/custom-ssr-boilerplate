import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import merge from 'webpack-merge';
import { DEV } from './constants';

const shared = merge({
  context: process.cwd(),
  watch: DEV,
  stats: DEV ? 'errors-warnings' : 'normal',
  mode: DEV ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: DEV
    ? undefined
    : {
        minimizer: [new TerserPlugin(), new OptimizeCssPlugin()],
      },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: DEV,
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: true,
    }),
    new MiniCssExtractPlugin(),
  ],
});

export default shared;

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
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
    ],
  },
  plugins: DEV
    ? [
        new ForkTsCheckerWebpackPlugin({
          eslint: true,
        }),
      ]
    : [],
});

export default shared;

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
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
});

export default shared;

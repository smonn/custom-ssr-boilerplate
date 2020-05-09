const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
// const isProduction = env === 'production';
const isDevelopment = env === 'development';
const isTest = env === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.6',
        modules: isTest ? undefined : false,
        targets: isTest
          ? {
              node: true,
            }
          : undefined,
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
        development: isDevelopment,
      },
    ],
  ],
  plugins: ['@loadable/babel-plugin', 'react-hot-loader/babel'],
};

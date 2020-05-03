import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import StartServerWebpackPlugin from "start-server-webpack-plugin";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import WebpackBar from "webpackbar";

const dev = process.env.NODE_ENV !== "production";
const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

const config: webpack.Configuration = {
  context: __dirname,
  mode: dev ? "development" : "production",
  devtool: dev ? "eval-source-map" : undefined,
  watch: dev,
  stats: dev ? "errors-warnings" : "normal",
  entry: {
    server: dev
      ? ["webpack/hot/signal", path.resolve(src, "server")]
      : path.resolve(src, "server"),
  },
  target: "node",
  output: {
    path: dist,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/signal"],
    }),
  ],
  plugins: dev
    ? [
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new StartServerWebpackPlugin({
          name: "server.js",
          nodeArgs: ["--inspect"],
          signal: true,
        }),
      ]
    : [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};

export default config;

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import StartServerWebpackPlugin from "start-server-webpack-plugin";
import webpack from "webpack";
import merge from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";
import WebpackBar from "webpackbar";
import { DEV, DIST, SRC } from "./constants";
import shared from "./shared";

const server = merge(shared, {
  name: "server",
  devtool: DEV ? "eval-source-map" : undefined,
  entry: {
    server: DEV
      ? ["webpack/hot/signal", path.resolve(SRC, "server")]
      : path.resolve(SRC, "server"),
  },
  target: "node",
  output: {
    path: DIST,
    filename: "[name].js",
  },
  externals: [
    webpackNodeExternals({
      whitelist: ["webpack/hot/signal"],
    }),
  ],
  plugins: DEV
    ? [
        new WebpackBar(),
        // new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new StartServerWebpackPlugin({
          name: "server.js",
          nodeArgs: ["-r", "source-map-support/register", "--inspect"],
          signal: true,
        }),
      ]
    : [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
});

export default server;

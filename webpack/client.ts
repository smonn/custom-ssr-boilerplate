import LoadableWebpackPlugin from "@loadable/webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import merge from "webpack-merge";
import WebpackBar from "webpackbar";
// import parsePort from "../src/shared/utils/parsePort";
import { DEV, DIST, SRC } from "./constants";
import shared from "./shared";

// const port = parsePort(process.env.PORT) + 1;

const client = merge(shared, {
  name: "client",
  devtool: DEV ? "eval-source-map" : "source-map",
  entry: {
    client: DEV ? [path.resolve(SRC, "client")] : path.resolve(SRC, "client"),
  },
  target: "web",
  output: {
    publicPath: `/static/`,
    path: path.resolve(DIST, "static"),
    filename: "[name].js",
  },
  devServer: DEV
    ? {
        compress: true,
        // HMR is currently not working as expected
        // It's loading from the wrong host:port combo for some reason
        hot: true,
        // hotOnly: true,
        // noInfo: true,
        overlay: true,
        port: 3001,
        publicPath: "/static/",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        // must be set to true for HMR to fully work?
        // ideally we want to turn this off to avoid writing a lot of files to disk...
        writeToDisk: true,
        // writeToDisk: (filePath: string) => {
        //   return /hot-update\.(js|json)$/.test(filePath);
        // },
      }
    : undefined,
  plugins: DEV
    ? [
        new ForkTsCheckerWebpackPlugin(),
        new LoadableWebpackPlugin({
          writeToDisk: {
            filename: path.resolve(DIST, "static"),
          },
        }),
        new WebpackBar(),
      ]
    : [new ForkTsCheckerWebpackPlugin(), new LoadableWebpackPlugin()],
});

export default client;

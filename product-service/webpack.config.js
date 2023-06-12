const path = require("path");
const slsWebpack = require("serverless-webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "production",
  entry: slsWebpack.lib.entries,
  target: "node",
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader",
        type: "javascript/auto",
      },
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: [
          [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".webpack"),
            path.resolve(__dirname, ".serverless"),
          ],
        ],
      },
    ],
  },
};

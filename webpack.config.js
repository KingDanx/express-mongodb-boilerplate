const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = [
  {
    name: "index",
    entry: "./index.js",
    target: "node",
    mode: "production",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.bundle.js",
    },
    externals: [nodeExternals()],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  },
];

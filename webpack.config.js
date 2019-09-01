const path = require("path");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    index: "./bci2k.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: path.resolve(__dirname, "dist"),
    library: "BCI2K",
    libraryTarget: "umd",
    globalObject: "this"
  },
  mode: devMode ? "development" : "production",
  devtool: devMode ? "inline-source-map" : "source-map",
  externals: ['websocket'],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-proposal-class-properties",
          ]
        }
      }
    }]
  }
};
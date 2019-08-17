const path = require("path");

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
  externals: {
    websocket: "WebSocket"
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};

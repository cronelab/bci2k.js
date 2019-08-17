const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    bci2k: "./src/bci2k.js",
    node_bci2k: "./src/node_bci2k.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: path.resolve(__dirname, "dist")
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

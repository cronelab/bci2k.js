const path = require('path');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './src/bci2k.js',
  mode: devMode ? "development" : "production",
  output: {
    filename: 'bci2k.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'BCI2K',
    libraryTarget: 'umd',
    globalObject: 'this'
    },
    externals: {
        'websocket': 'WebSocket'
      },
      node: {
        fs: 'empty'
      },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
};
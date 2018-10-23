const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/index.ts",
  target: 'node',
  output: {
      filename: "index.js",
      library: "index",
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, './')
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js", '.json', '.jsx']
  },
  module: {
    rules: [
      { 
        test: /\.ts$/, 
        loader: "ts-loader", 
        options: {
        transpileOnly: false
        } 
      }
    ]
  },
  externals: [nodeExternals()]
}

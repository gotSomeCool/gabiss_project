const path = require('path');
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader:"awesome-typescript-loader"
      },{
        enforce: "pre",
        test: /\.js$/,
        loader:"source-map-loader"
      },{
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer:{
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}
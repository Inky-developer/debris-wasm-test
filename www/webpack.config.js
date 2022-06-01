const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "production",
  experiments: {
    asyncWebAssembly: true,
  },
  performance: {
    maxAssetSize: 2_000_000,
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: ['index.html'] }),
    new CopyWebpackPlugin({ patterns: ['style.css'] }),
    new CopyWebpackPlugin({ patterns: ['github_logo.png'] }),
  ],
};

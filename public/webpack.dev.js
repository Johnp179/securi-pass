const {merge} = require("webpack-merge");
const base = require("./webpack.common.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
    mode: "development",

    devtool: 'eval-source-map',
    
    devServer: {
          static: './dist',
          historyApiFallback: true,   
    },
    plugins:[
      new HtmlWebpackPlugin({
        title : "Password Manager",
        template: "./index.html"
      }),
      // new BundleAnalyzerPlugin(),
      
    ],

})
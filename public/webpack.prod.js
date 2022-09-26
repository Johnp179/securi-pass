const {merge} = require("webpack-merge");
const base = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base,{
    mode: "production",

    plugins:[
      new HtmlWebpackPlugin({
        title : "Password Manager",
        template: "./index.html"
      }),
      
    ],

    optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      }
})
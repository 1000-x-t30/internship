'use strict';
const path = require('path');
const webpack = require('webpack');

/**
 * WebpackによるJSコンパイル設定
 * @type {Object}
 *
 * modeをproductionにすると圧縮された状態で出力される
 * 通常はdevelopmentを設定しておく
 */
module.exports = {
  mode: "development",
  entry: "./origin/_js/script.js", // 結合のメインとなるJSファイルパス
  output: {
  	path: path.resolve(__dirname, '/public/_asset/js'), // 出力先ディレクトリ
    filename: "script.js" // 出力時のファイル名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader:'style-loader',
            options: {
              insertAt: {
                before: '#stylecss' // 結合したスタイルのDOM内での出力先
              }
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }]
      }
    ]
  },
  plugins: [
  	new webpack.ProvidePlugin({
  		$: path.resolve(__dirname, './origin/_js/vender/jquery-3.6.0.min.js'),
  		jQuery: path.resolve(__dirname, './origin/_js/vender/jquery-3.6.0.min.js'),
  	})
  ]
}

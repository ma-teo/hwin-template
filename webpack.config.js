const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals')
const WebpackBeforeBuildPlugin = require('before-build-webpack')
const NodemonPlugin = require('nodemon-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const start = Date.now()

class WaitPlugin extends WebpackBeforeBuildPlugin {
  constructor(file, interval = 100, timeout = 10000) {
    super(function(stats, callback) {
      function poll() {
        if (fs.existsSync(file) && fs.statSync(file).mtime > start) {
          callback()
        } else if (Date.now() - start > timeout) {
          throw Error("Maybe it just wasn't meant to be.")
        } else {
          setTimeout(poll, interval)
        }
      }

      poll()
    })
  }
}

const clientConfig = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, './build/public'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      filename: 'assets.json',
      removeFullPathAutoPrefix: true,
      entrypoints: true
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

const serverConfig = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WaitPlugin('./build/assets.json'),
    new NodemonPlugin(),
    new BrowserSyncPlugin({
      proxy: 'localhost:5000',
      ui: false
    })
  ]
}

module.exports = [
  clientConfig,
  serverConfig
]

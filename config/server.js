const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')

const development = env => {
  return {
    mode: env.NODE_ENV,
    watch: env.NODE_ENV !== 'production',
    entry: './src/server.js',
    output: {
      path: path.resolve(__dirname, '../build/server'),
      filename: 'main.js',
      hotUpdateChunkFilename: '[id].[fullhash:8].js',
      hotUpdateMainFilename: '[runtime].[fullhash:8].json'
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
      new CleanWebpackPlugin(),
      new RunNodeWebpackPlugin(),
      new BrowserSyncPlugin({
        proxy: 'localhost:5000',
        ui: false
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
    watch: env.NODE_ENV !== 'production',
    entry: './src/server.js',
    output: {
      path: path.resolve(__dirname, '../build/server'),
      filename: 'main.js'
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
      new CleanWebpackPlugin()
    ]
  }
}

module.exports = env => env.NODE_ENV === 'production' ? production(env) : development(env)

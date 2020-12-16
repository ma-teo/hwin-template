const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')

const development = env => {
  return {
    watch: true,
    mode: env.NODE_ENV,
    entry: {
      server: './src/server.js'
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].js',
      hotUpdateChunkFilename: '[id].[fullhash:8].js',
      hotUpdateMainFilename: '[runtime].[fullhash:8].json',
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
      new RunNodeWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map'
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
    entry: {
      server: './src/server.js'
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].js'
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
    devtool: 'source-map'
  }
}

module.exports = env => env.NODE_ENV === 'production' ? production(env) : development(env)

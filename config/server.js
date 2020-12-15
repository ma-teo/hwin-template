const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')

const development = env => {
  return {
    mode: env.NODE_ENV,
    watch: true,
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
      new CleanWebpackPlugin(),
      new RunNodeWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
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

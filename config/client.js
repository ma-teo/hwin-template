const path = require('path')
const WebpackHookPlugin = require('webpack-hook-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const development = env => {
  return {
    mode: env.NODE_ENV,
    entry: path.resolve(process.cwd(), 'src/client.js'),
    output: {
      path: path.resolve(process.cwd(), 'build/public'),
      filename: 'js/[name].js',
      hotUpdateChunkFilename: 'js/[id].[fullhash:8].js',
      hotUpdateMainFilename: 'js/[runtime].[fullhash:8].json',
      publicPath: 'http://localhost:5000/'
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
            'style-loader',
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
      new WebpackHookPlugin({
        onBuildEnd: ['webpack --env NODE_ENV=development --config config/server.js']
      }),
      new AssetsPlugin({
        path: path.resolve(process.cwd(), 'build'),
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
    },
    devServer: {
      compress: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      hotOnly: true,
      port: 5000
    },
    devtool: 'source-map'
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
    entry: path.resolve(process.cwd(), 'src/client.js'),
    output: {
      path: path.resolve(process.cwd(), 'build/public'),
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
      new WebpackHookPlugin({
        onBuildEnd: ['webpack --env NODE_ENV=production --config config/server.js']
      }),
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
        path: path.resolve(process.cwd(), 'build'),
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
    },
    devtool: 'source-map'
  }
}

module.exports = env => env.NODE_ENV === 'production' ? production(env) : development(env)

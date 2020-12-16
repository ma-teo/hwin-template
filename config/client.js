const path = require('path')
const WebpackHookPlugin = require('webpack-hook-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const development = env => {
  return {
    mode: env.NODE_ENV,
    entry: './src/client.js',
    output: {
      path: path.resolve(__dirname, '../build/public'),
      filename: 'js/[name].js',
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
        onBuildEnd: ['npm run dev:server']
      }),
      new AssetsPlugin({
        path: path.resolve(__dirname, '../build'),
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
      hotOnly: true,
      open: true,
      port: 5000,
      proxy: {
        '/': 'http://localhost:3000'
      }
    },
    devtool: 'source-map'
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
    entry: './src/client.js',
    output: {
      path: path.resolve(__dirname, '../build/public'),
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
        onBuildEnd: ['npm run build:server']
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
        path: path.resolve(__dirname, '../build'),
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
}

module.exports = env => env.NODE_ENV === 'production' ? production(env) : development(env)

const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, '../build'),
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
  }
}

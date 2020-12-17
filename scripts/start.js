#!/usr/bin/env node
const webpack = require('webpack')
const clientConfig = require('../config/client')
const serverConfig = require('../config/server')

process.env.NODE_ENV = 'development'

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

clientCompiler.watch((err, stats) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(stats)

  serverCompiler.watch((err, stats) => {
    if (err) {
      console.log(err)
      return
    }
  
    console.log(stats)
  })
})

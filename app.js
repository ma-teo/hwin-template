require('@babel/register')
const express = require('express')
const { requestHandler } = require('./src/server')

express()
  .use(express.static('build'))
  .get('*', (req, res) => res.send(requestHandler()))
  .listen(3000)

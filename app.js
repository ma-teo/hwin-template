require('@babel/register')
const express = require('express')
const { render } = require('./src/server')

express()
  .use(express.static('build'))
  .get('*', (req, res) => {
    const html = render(req)
    html.includes('<h1>Error</h1>') ? res.status(404) : res.status(200)
    res.send(html)
  })
  .listen(3000)

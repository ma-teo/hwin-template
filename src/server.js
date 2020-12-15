import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import Document from './document'

const render = req => `<!doctype html>${renderToString(
  <StaticRouter location={req.url}>
    <Document />
  </StaticRouter>
)}`

express()
  .use(express.static('build/client'))
  .get('*', (req, res) => {
    const html = render(req)
    html.includes('<h1>Error</h1>') ? res.status(404) : res.status(200)
    res.send(html)
  })
  .listen(5000, () => console.log('Running at http://localhost:5000'))

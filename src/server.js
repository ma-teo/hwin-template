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
  .use(express.static(process.env.STATIC_PATH))
  .get('*', (req, res) => {
    const html = render(req)
    html.includes('<h1>Error</h1>') ? res.status(404) : res.status(200)
    res.send(html)
  })
  .listen(3000, () => console.log('Running at http://localhost:3000/'))
  .on('error', () => process.exit(1))

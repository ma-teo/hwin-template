import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import Document from './document'

export const render = req => `<!doctype html>${renderToString(
  <StaticRouter location={req.url}>
    <Document />
  </StaticRouter>
)}`

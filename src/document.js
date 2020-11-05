import React from 'react'
import chunks from '../build/chunks.json'

const Document = ({children}) => (
  <html lang="pl">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Hello World</title>
      {chunks.main.css && <link rel="stylesheet" href={chunks.main.css} />}
    </head>
    <body>
      <div id="app">{children}</div>
      {chunks.main.js.map(js => <script key={js} src={js} />)}
    </body>
  </html>
)

export default Document

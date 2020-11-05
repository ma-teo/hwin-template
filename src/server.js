import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Document from './document'
import App from './app'

export const requestHandler = () => {
  const markup = renderToStaticMarkup(
    <Document>
      <App />
    </Document>
  )

  return `<!doctype html>${markup}`
}

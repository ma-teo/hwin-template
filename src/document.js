import App from './app'
import assets from '../build/assets'

const Document = () => (
  <html lang="pl">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Hello World</title>
      {assets.main.css && <link rel="stylesheet" href={assets.main.css} />}
    </head>
    <body>
      <div id="app">
        <App />
      </div>
      {assets.main.js.map(js => <script key={js} src={js} />)}
    </body>
  </html>
)

export default Document

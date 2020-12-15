import App from './app'
const assets = process.env.NODE_ENV === 'production' ? require('../build/server/assets') : undefined

const Document = () => (
  <html lang="pl">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Hello World</title>
      {process.env.NODE_ENV === 'production' && <link rel="stylesheet" href={assets.main.css} />}
    </head>
    <body>
      <div id="app">
        <App />
      </div>
      {
        process.env.NODE_ENV === 'production'
        ? assets.main.js.map(js => <script key={js} src={js} />)
        : <script src="http://localhost:5000/js/main.js" />
      }
    </body>
  </html>
)

export default Document

import App from './app'
import assets from '../build/assets'

const Document = () => (
  <html lang="pl">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Hello World</title>
      {assets.main.js?.toString().split(',').map(js => <script key={js} src={js} defer={true} />)}
      {assets.main.css?.toString().split(',').map(css => <link rel="stylesheet" key={css} href={css} />)}
    </head>
    <body>
      <div id="app">
        <App />
      </div>
    </body>
  </html>
)

export default Document

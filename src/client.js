import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import './app.scss'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

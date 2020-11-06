import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import './app.scss'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('app'))

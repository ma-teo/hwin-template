import React from 'react'
import { hydrate } from 'react-dom'

import App from './app'
import './app.scss'

hydrate(<App />, document.getElementById('app'))

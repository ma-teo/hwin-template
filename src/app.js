import { useRoutes } from 'react-router-dom'

import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Error from './pages/error'

const App = () => useRoutes([
  { path: '/', element: <Home /> },
  { path: 'about', element: <About /> },
  { path: 'contact', element: <Contact /> },
  { path: '*', element: <Error /> },
])

export default App

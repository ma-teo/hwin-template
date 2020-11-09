import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Error from './pages/error'

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='about' element={<About />} />
    <Route path='contact' element={<Contact />} />
    <Route path='*' element={<Error />} />
  </Routes>
)

export default App

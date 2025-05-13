import { Route, Routes } from 'react-router-dom'
import './App.css'
import CenterLayout from './assets/layouts/CenterLayout'
import PortalLayout from './assets/layouts/PortalLayout'

function App() {


  return (
    <Routes>
      <Route path='/' element={<PortalLayout />} />
    </Routes>
  )
}

export default App

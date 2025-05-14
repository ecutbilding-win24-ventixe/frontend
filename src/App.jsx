import { Route, Routes } from 'react-router-dom'
import './App.css'
import CenterLayout from './assets/layouts/CenterLayout'
import PortalLayout from './assets/layouts/PortalLayout'
import Login from './assets/pages/Login'
import SignUp from './assets/pages/SignUp'

function App() {


  return (
    <Routes>
      <Route path='/' element={<PortalLayout />} />

      <Route path='/' element={<CenterLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
      
    </Routes>
  )
}

export default App

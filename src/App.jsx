import { Route, Routes } from 'react-router-dom'
import './App.css'
import CenterLayout from './assets/layouts/CenterLayout'
import PortalLayout from './assets/layouts/PortalLayout'
import Login from './assets/pages/Login'
import SignUp from './assets/pages/SignUp'
import EventContext from './assets/contexts/EventContext'
import EventDetails from './assets/components/Event/EventDetails'
import BookingEvent from './assets/contexts/BookingEvent'

function App() {


  return (
    <Routes>
      <Route path='/' element={<PortalLayout />} >
        <Route path="/events" element={<EventContext /> } />
        <Route path="/events/:id" element={<EventDetails /> } />
        <Route path="/events/booking/:id" element={<BookingEvent /> } />
      </Route>

      <Route path='/' element={<CenterLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
      
    </Routes>
  )
}

export default App

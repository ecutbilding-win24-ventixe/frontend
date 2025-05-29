import { Route, Routes } from 'react-router-dom'
import './App.css'
import CenterLayout from './assets/layouts/CenterLayout'
import PortalLayout from './assets/layouts/PortalLayout'
import Login from './assets/pages/Login'
import VerificationEmail from './assets/pages/VerificationEmail'
import SignUp from './assets/pages/SignUp'
import EventContext from './assets/contexts/EventContext'
import EventDetails from './assets/components/Event/EventDetails'
import BookingEvent from './assets/contexts/BookingEvent'
import RouteControl from './RouteControl'
import CustomersList from './assets/components/Users/CustomersList'
import Dashboard from './assets/components/Dashboard'


function App() {


  return (
    <Routes>
      <Route path='/' element={<RouteControl><PortalLayout /></RouteControl>} >
        <Route path='/' element={<Dashboard />} />
        <Route path="/events" element={<EventContext /> } />
        <Route path="/events/:id" element={<EventDetails /> } />
        <Route path="/events/booking/:id" element={<BookingEvent /> } />
        <Route path="/bookings" element={<BookingEvent /> } />
        <Route path="/customers" element={<CustomersList /> } />
      </Route>

      <Route path='/' element={<CenterLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/verification-email' element={<VerificationEmail />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
      
    </Routes>
  )
}

export default App

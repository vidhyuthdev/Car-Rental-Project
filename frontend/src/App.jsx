import React from 'react'
import Landing from './Pages/LandingPage/Landing'
import AuthPage from './Pages/AuthenticationPage/AuthPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import Layout from './Pages/Layout'
import BookCar from './Pages/BookCar/BookCar'
import UserBookings from './Pages/UserBookings/UserBookings'
import UserProfile from './Pages/UserProfile/UserProfile'
import AdminLayout from './AdminLayout'
import Approvals from './Pages/Admin/Approvals'
import ManageCars from './Pages/Admin/ManageCars'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route element={<Layout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/book' element={<BookCar />} />
          <Route path='/my-bookings' element={<UserBookings />} />
          <Route path='/profile' element={<UserProfile />} />
        </Route>

        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<AuthPage />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='approvals' element={<Approvals/>} />
          <Route path='manage-cars' element={<ManageCars/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

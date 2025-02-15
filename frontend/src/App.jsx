import React from 'react'
import Landing from './Pages/LandingPage/Landing'
import AuthPage from './Pages/AuthenticationPage/AuthPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
const App=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App

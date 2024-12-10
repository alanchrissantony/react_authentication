import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from './components/pages/profile'
import Signup from './components/pages/signup'
import Signin from './components/pages/signin'
import Dashboard from './components/admin/pages/dashboard'
import AdminSignin from './components/admin/pages/signin'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Profile/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin' element={<Dashboard/>}/>
          <Route path='/admin/signin' element={<AdminSignin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

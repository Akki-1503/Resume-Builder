import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import NavBar from './components/navbar'
import { startGetUserAccount } from './actions/userAction'
import RegistrationForm from "./components/registrationForm"
import LoginForm from "./components/loginForm"
import AccountInfo from "./components/accountInfo"
import Home from "./components/home"
import ForgotPassword from './components/forgotPassword'
import UpdateProfile from './components/updateProfile'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [role, setRole] = useState('')
  const dispatch = useDispatch()

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  const user = useSelector((state) => state.user.user)
  console.log(user, 'user')

  const userId = user?._id
  console.log(userId, 'userId')

  useEffect(() => {
    if (userLoggedIn) {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const userRole = decoded.role
      setRole(userRole)
    }
  }, [userLoggedIn])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth()
      dispatch(startGetUserAccount())
    }
  }, [dispatch])

  return (
    <div>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} role={role} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm handleAuth={handleAuth} />} />
          <Route path="/account" element={<AccountInfo />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile/:userId" element={<UpdateProfile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

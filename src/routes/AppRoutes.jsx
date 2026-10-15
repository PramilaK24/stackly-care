import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import SignIn from '../pages/SignIn/SignIn'
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
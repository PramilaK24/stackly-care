import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import SignIn from '../pages/SignIn/SignIn'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
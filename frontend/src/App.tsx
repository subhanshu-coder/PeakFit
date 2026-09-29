import { Routes, Route } from 'react-router-dom'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import RequireAuth from '@/components/RequireAuth'

import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import SplitBuilder from '@/pages/SplitBuilder'
import Exercises from '@/pages/Exercises'
import Diet from '@/pages/Diet'
import Progress from '@/pages/Progress'
import AuthCallback from '@/pages/AuthCallback'

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const isOAuthCallback = params.has('code') || params.has('error') || params.has('error_description')

  return (
    <div className="min-h-screen bg-ink text-bone">
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={isOAuthCallback ? <AuthCallback /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth> 
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route  // user must be authenticated to access the SplitBuilder page
          path="/split-builder"
          element={
            <RequireAuth>
              <SplitBuilder />
            </RequireAuth>
          }
        />
        <Route // user must be authenticated to access the Exercises page
          path="/exercises"
          element={
            <RequireAuth>
              <Exercises />
            </RequireAuth>
          }
        />
        <Route
          path="/diet"
          element={
            <RequireAuth>
              <Diet />
            </RequireAuth>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireAuth>
              <Progress />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  )
}

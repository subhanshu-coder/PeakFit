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

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth> //this component will check if the user is authenticated before rendering the Dashboard component. If the user is not authenticated, it will redirect them to the login page.
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

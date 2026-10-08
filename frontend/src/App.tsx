import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import RequireAuth from '@/components/RequireAuth'
import { useAuthStore } from '@/store/auth'

import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import AuthCallback from '@/pages/AuthCallback'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const SplitBuilder = lazy(() => import('@/pages/SplitBuilder'))
const Exercises = lazy(() => import('@/pages/Exercises'))
const Diet = lazy(() => import('@/pages/Diet'))
const Progress = lazy(() => import('@/pages/Progress'))

export default function App() {
  const user = useAuthStore((state) => state.user)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  const params = new URLSearchParams(window.location.search)
  const isOAuthCallback = params.has('code') || params.has('error') || params.has('error_description')

  return (
    <div className="min-h-screen bg-ink text-bone">
      <CustomCursor />
      <Navbar />
      <main className={user ? 'app-main' : undefined}>
      <Suspense fallback={<div className="route-loading"><span className="status-dot" /> PREPARING YOUR TRAINING SPACE</div>}>
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
      </Suspense>
      </main>
    </div>
  )
}


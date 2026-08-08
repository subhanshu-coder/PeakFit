import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// @ts-ignore: allow side-effect CSS import when no type declarations are present
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/PeakFit">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
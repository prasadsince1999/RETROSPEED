import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { applyTheme, DEFAULT_THEME_ID } from './theme'

try {
  const raw = localStorage.getItem('retrospeed_user_v1')
  const parsed = raw ? JSON.parse(raw) : null
  applyTheme(parsed?.settings?.theme || DEFAULT_THEME_ID)
} catch {
  applyTheme(DEFAULT_THEME_ID)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { PreferencesProvider } from './context/Preferences.jsx'
import './styles/global.css'

// HashRouter keeps deep links working on GitHub Pages (no server rewrites there).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <PreferencesProvider><App /></PreferencesProvider>
    </HashRouter>
  </StrictMode>,
)

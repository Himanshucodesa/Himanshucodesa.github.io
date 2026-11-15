import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const [storyStep, setStoryStep] = useState(0)
  useEffect(() => {
    // Jump, don't glide: a new page should start at the top immediately.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setStoryStep(0)
  }, [pathname])

  return (
    <div className={`layout ${pathname === '/' ? 'layout--story' : ''}`}>
      <Header storyHasAdvanced={pathname === '/' && storyStep > 0} />
      <main className="main">
        {/* Keyed so each route fades in as a fresh page. */}
        <div key={pathname} className="page">
          <Outlet context={{ onStoryStepChange: setStoryStep }} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const [storyStep, setStoryStep] = useState(0)
  useEffect(() => {
    window.scrollTo(0, 0)
    setStoryStep(0)
  }, [pathname])

  return (
    <div className={`layout ${pathname === '/' ? 'layout--story' : ''}`}>
      <Header storyHasAdvanced={pathname === '/' && storyStep > 0} />
      <main className="main">
        <Outlet context={{ onStoryStepChange: setStoryStep }} />
      </main>
      <Footer />
    </div>
  )
}

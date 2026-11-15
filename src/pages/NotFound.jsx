import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container section page-top center">
      <h2>Out of frame.</h2>
      <p className="muted">That page doesn't exist.</p>
      <Link to="/" className="btn">Back home</Link>
    </section>
  )
}

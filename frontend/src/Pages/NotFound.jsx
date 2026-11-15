import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

export default function NotFound() {
  return <main className="not-found"><Logo /><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>We couldn't find that page.</h1><Link className="btn btn-primary" to="/">Back to home</Link></main>
}

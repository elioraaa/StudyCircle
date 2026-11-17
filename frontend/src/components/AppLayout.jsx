import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import Logo from './Logo.jsx'
import { initials } from '../utils/initials.js'

export default function AppLayout({ children }) {
  const { user, logout } = useAuth()
  return <div className="app-shell">
    <header className="app-topbar glass">
      <Logo />
      <nav aria-label="Main navigation"><Link to="/groups">Find groups</Link><Link to="/dashboard">Dashboard</Link></nav>
      <div className="app-account"><Link className="btn btn-primary" to="/groups/new">Create group</Link>
        {user ? <><span className="avatar" aria-label={user.name}>{initials(user)}</span><button className="btn btn-outline" onClick={logout}>Log out</button></> : <Link className="btn btn-outline" to="/login">Log in</Link>}
      </div>
    </header>
    <main className="app-content">{children}</main>
  </div>
}

import { useAuth } from '../context/useAuth.js'
import { initials } from '../utils/initials.js'
import MyGroupsList from '../components/MyGroupsList.jsx'

export default function Profile() {
  const { user, logout } = useAuth()
  const details = [
    ['Name', user?.name], ['Surname', user?.surname], ['Email', user?.email],
    ['Role', user?.role], ['Major', user?.major], ['Year', user?.year],
  ]
  return <section className="glass profile-panel">
    <header className="profile-heading"><span className="avatar profile-avatar profile-avatar-large">{initials(user)}</span><div><h1>{user?.name} {user?.surname}</h1><p>{user?.email}</p><span className="role-badge">{user?.role || 'Not set'}</span></div></header>
    <section className="profile-section"><h2>Account details</h2><dl className="profile-details">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || 'Not set'}</dd></div>)}</dl></section>
    <section className="profile-section"><h2>My groups</h2><MyGroupsList userId={user?.id} /></section>
    <div className="profile-actions"><div><button className="btn btn-outline" disabled>Edit profile</button><p>Editing profile is coming soon</p></div><button className="btn btn-outline logout-button" onClick={logout}>Log out</button></div>
  </section>
}

import { Link } from 'react-router-dom'

export default function Dashboard() {
  return <main className="dashboard-page"><h1>Dashboard</h1><p className="page-subtitle">Your study groups and requests will appear here.</p><Link className="btn btn-primary" to="/groups">Find a group</Link></main>
}

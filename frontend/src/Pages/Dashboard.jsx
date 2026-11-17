import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { stats, weeklyHours, timeByCourse, upcomingSessions } from '../data/dashboardMock.js'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import MyGroupsList from '../components/MyGroupsList.jsx'
import { initials } from '../utils/initials.js'

export default function Dashboard() {
  const { user } = useAuth()
  const [toast, setToast] = useState('')
  function showComingSoon() { setToast('Coming soon'); window.setTimeout(() => setToast(''), 2500) }
  function scrollTo(section) { document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return <div className="dashboard-layout">
    <div className="dashboard-main-column">
      <header className="dashboard-heading">
        <div><h1>Hi, {user?.name}</h1><p>Here's your study week.</p></div>
        <nav className="dashboard-tabs" aria-label="Dashboard sections">
          <button className="btn btn-primary btn-small" onClick={() => scrollTo('dashboard-overview')}>Overview</button>
          <button className="btn btn-outline btn-small" onClick={() => scrollTo('dashboard-groups')}>My groups</button>
          <button className="btn btn-outline btn-small" onClick={() => scrollTo('stat-pending-requests')}>Requests</button>
        </nav>
      </header>
      <section className="dashboard-stats" id="dashboard-overview" aria-label="Study overview">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
      <section className="dashboard-charts" aria-label="Study charts">
        <div className="glass-card dashboard-chart-card"><h2>Study hours per week</h2><BarChart data={weeklyHours} /></div>
        <div className="glass-card dashboard-chart-card"><h2>Time by course</h2><DonutChart data={timeByCourse} /></div>
      </section>
      <section className="glass-card sessions-card">
        <div className="section-heading"><h2>Upcoming sessions</h2><button className="btn btn-primary btn-small" onClick={showComingSoon}>+ Schedule session</button></div>
        {toast && <p className="dashboard-toast" role="status">{toast}</p>}
        <ul className="session-list">{upcomingSessions.map((session) => <li key={`${session.code}-${session.when}`}><span className="session-code">{session.code}</span><span className="session-topic">{session.topic}</span><span className="session-when">{session.when}</span><span className="session-where">{session.where}</span></li>)}</ul>
      </section>
    </div>
    <aside className="dashboard-side-column">
      <section className="glass-card mini-profile-card">
        <div className="mini-profile-top"><span className="avatar profile-avatar">{initials(user)}</span><div><h2>{user?.name} {user?.surname}</h2><p>{user?.email}</p></div></div>
        <dl className="mini-profile-details"><div><dt>Role</dt><dd>{user?.role || 'Not set'}</dd></div><div><dt>Major</dt><dd>{user?.major || 'Not set'}</dd></div><div><dt>Year</dt><dd>{user?.year || 'Not set'}</dd></div></dl>
        <Link className="btn btn-outline" to="/profile">View profile</Link>
      </section>
      <section className="glass-card dashboard-groups-card" id="dashboard-groups">
        <div className="section-heading"><h2>My groups</h2><Link className="btn btn-primary btn-small" to="/groups/new">+ New group</Link></div>
        <MyGroupsList userId={user?.id} compact />
      </section>
    </aside>
  </div>
}

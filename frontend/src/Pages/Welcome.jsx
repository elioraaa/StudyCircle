import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

const groups = [
  { code: 'CS301', title: 'Data Structures – exam prep', place: 'Online', time: 'Thu 18:00', members: '4/6' },
  { code: 'SE210', title: 'UML diagrams practice', place: 'In person', time: 'Mon 14:00', members: '3/5' },
  { code: 'MA201', title: 'Linear Algebra weekly review', place: 'In person', time: 'Wed 16:30', members: '5/8' },
]
const features = [
  { icon: 'search', title: 'Search by course', text: "Find groups for exactly the class you're taking." },
  { icon: 'clock', title: 'Fits your schedule', text: 'See when and where each group meets before you join.' },
  { icon: 'chat', title: 'Study together', text: 'Chat with your group and plan sessions in one place.' },
]

function FeatureIcon({ name }) {
  if (name === 'search') return <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  if (name === 'clock') return <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  return <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-2 2v-5.5a7.5 7.5 0 1 1 16-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}

export default function Welcome() {
  return <div className="welcome-shell">
    <header className="topbar"><Logo /><nav><Link className="nav-login" to="/login">Log in</Link><Link className="btn btn-primary" to="/signup">Sign up</Link></nav></header>
    <main>
      <section className="hero-layout">
        <div className="hero-copy"><p className="eyebrow">YOUR NEXT STUDY SESSION STARTS HERE</p><h1>Find your study group in minutes.</h1><p className="hero-text">Search groups by course, see when and where they meet, and join with one click.</p><div className="hero-actions"><Link className="btn btn-primary" to="/signup">Get started</Link><Link className="btn btn-outline" to="/login">I already have an account</Link></div></div>
        <div className="group-stack" aria-hidden="true">{groups.map((group, index) => <article className={`glass-card preview-card preview-${index + 1}`} key={group.code}><div className="preview-heading"><span>{group.code}</span><span className="members">{group.members}</span></div><h2>{group.title}</h2><div className="preview-meta"><span className="pill">{group.place}</span><span>{group.time}</span></div></article>)}</div>
      </section>
      <section className="features">{features.map((feature) => <article className="glass-card feature-card" key={feature.title}><span className="feature-icon"><FeatureIcon name={feature.icon} /></span><h2>{feature.title}</h2><p>{feature.text}</p></article>)}</section>
    </main>
    <footer>StudyCircle · UNYT Software Engineering project</footer>
  </div>
}

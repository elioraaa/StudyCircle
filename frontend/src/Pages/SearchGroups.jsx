import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as groupsApi from '../api/groups.js'
import GroupCard from '../components/GroupCard.jsx'

export default function SearchGroups() {
  const [groups, setGroups] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  const [query, setQuery] = useState(''); const [mode, setMode] = useState('all'); const [freeOnly, setFreeOnly] = useState(false)
  const load = useCallback(async () => { setLoading(true); setError(''); try { setGroups(await groupsApi.getGroups()) } catch { setError('We could not load groups right now. Please try again.') } finally { setLoading(false) } }, [])
  useEffect(() => { const timer = setTimeout(load, 0); return () => clearTimeout(timer) }, [load])
  const filtered = useMemo(() => groups.filter((group) => {
    const term = query.trim().toLowerCase()
    return (!term || group.courseCode.toLowerCase().includes(term) || group.topic.toLowerCase().includes(term)) && (mode === 'all' || group.mode === mode) && (!freeOnly || group.memberCount < group.maxSize)
  }), [groups, query, mode, freeOnly])
  return <section className="groups-page">
    <div className="page-heading"><p className="eyebrow">STUDY TOGETHER</p><h1>Find a study group</h1><p className="page-subtitle">Meet classmates, share ideas, and prepare for your next exam.</p></div>
    <div className="glass-card filter-bar"><label className="field">Search groups<input className="input" placeholder="Course code or topic" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <label className="field">Mode<select className="input" value={mode} onChange={(event) => setMode(event.target.value)}><option value="all">All modes</option><option value="online">Online</option><option value="in-person">In person</option></select></label>
      <label className="checkbox-field"><input type="checkbox" checked={freeOnly} onChange={(event) => setFreeOnly(event.target.checked)} />Only groups with free spots</label>
    </div>
    {loading ? <div className="group-grid">{[1, 2, 3].map((item) => <div className="glass-card skeleton-card" key={item} aria-label="Loading group" />)}</div> : error ? <div className="empty-state glass-card" role="alert"><p>{error}</p><button className="btn btn-primary" onClick={load}>Try again</button></div> : filtered.length ? <div className="group-grid">{filtered.map((group) => <GroupCard key={group.id} group={group} />)}</div> : <div className="empty-state glass-card"><h2>No groups match your search</h2><p>Try changing your filters, or start a group of your own.</p><Link className="btn btn-primary" to="/groups/new">Create group</Link></div>}
  </section>
}

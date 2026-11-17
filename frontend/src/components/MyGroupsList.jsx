import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGroups } from '../api/groups.js'

const tileColors = ['#BBF7D0', '#FED7AA', '#FDE68A', '#BFDBFE', '#E9D5FF']

export default function MyGroupsList({ userId, compact = false }) {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const load = useCallback(async () => {
    setLoading(true); setError(false)
    try {
      const allGroups = await getGroups()
      setGroups(allGroups.filter((group) => String(group.ownerId) === String(userId)))
    } catch { setError(true) }
    finally { setLoading(false) }
  }, [userId])
  useEffect(() => { const timer = setTimeout(load, 0); return () => clearTimeout(timer) }, [load])

  if (loading) return <p className="my-groups-message">Loading your groups...</p>
  if (error) return <div className="my-groups-message" role="alert"><p>We could not load your groups.</p><button className="btn btn-outline" onClick={load}>Try again</button></div>
  if (!groups.length) return <div className="my-groups-message"><p>You don't own any groups yet</p><Link className="btn btn-outline" to="/groups/new">Create your first group</Link></div>

  return <ul className={`my-groups-list ${compact ? 'compact' : ''}`}>
    {groups.map((group, index) => <li key={group.id}><Link to={`/groups/${group.id}`} className="my-group-row">
      <span className="group-tile" style={{ backgroundColor: tileColors[index % tileColors.length] }} aria-label={group.courseCode}>{group.courseCode}</span>
      <span className="my-group-copy"><strong>{group.topic}</strong><span className="owner-badge">Owner</span></span>
      <span className="my-group-count">{group.memberCount}/{group.maxSize}</span>
    </Link></li>)}
  </ul>
}

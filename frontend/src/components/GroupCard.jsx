import { Link } from 'react-router-dom'

export default function GroupCard({ group }) {
  const full = group.memberCount >= group.maxSize
  return <article className="group-card glass-card">
    <div className="group-card-meta"><span className="course-code">{group.courseCode}</span><div className="badge-row"><span className="mode-badge">{group.mode === 'online' ? 'Online' : 'In person'}</span>{full && <span className="full-badge">Full</span>}</div></div>
    <h2>{group.topic}</h2><p className="group-owner">By {group.owner?.name} {group.owner?.surname}</p>
    <p className="member-count">{group.memberCount} / {group.maxSize} members</p>
    <Link className="btn btn-outline group-view" to={`/groups/${group.id}`}>View group</Link>
  </article>
}

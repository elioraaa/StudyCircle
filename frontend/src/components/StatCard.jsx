export default function StatCard({ stat }) {
  return <article className="glass-card stat-card" id={stat.id}><p>{stat.label}</p><strong>{stat.value}</strong><span>{stat.note}</span></article>
}

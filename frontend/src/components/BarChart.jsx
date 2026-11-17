export default function BarChart({ data }) {
  const maxHours = Math.max(...data.map((item) => item.hours), 1)
  const description = data.map((item) => `${item.label}, ${item.hours} hours`).join('; ')
  return <div className="bar-chart" role="img" aria-label={`Study hours per week: ${description}`}>
    {data.map((item) => <div className="bar-chart-column" key={item.label}>
      <span className="bar-chart-value">{item.hours}h</span>
      <div className="bar-chart-bar" title={`${item.hours} hours`} style={{ height: `${item.hours / maxHours * 170}px`, backgroundColor: item.hours === maxHours ? '#3FB950' : 'rgba(255,255,255,0.18)' }} />
      <span className="bar-chart-label">{item.label}</span>
    </div>)}
  </div>
}

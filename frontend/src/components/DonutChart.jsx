const circumference = 2 * Math.PI * 15.9

export default function DonutChart({ data }) {
  const segments = data.reduce((result, item) => {
    const dash = item.percent / 100 * circumference
    const offset = result.length ? result[result.length - 1].offset + result[result.length - 1].dash : 0
    result.push({ item, dash, offset })
    return result
  }, [])
  return <div className="donut-chart-wrap">
    <svg className="donut-chart" viewBox="0 0 42 42" role="img" aria-label={`Time by course: ${data.map((item) => `${item.course} ${item.percent}%`).join(', ')}`}>
      <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
      {segments.map(({ item, dash, offset }) => <circle key={item.course} cx="21" cy="21" r="15.9" fill="none" stroke={item.color} strokeWidth="6" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} transform="rotate(-90 21 21)" />)}
    </svg>
    <ul className="donut-legend">{data.map((item) => <li key={item.course}><span className="legend-dot" style={{ backgroundColor: item.color }} /><span>{item.course}</span><strong>{item.percent}%</strong></li>)}</ul>
  </div>
}

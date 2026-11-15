import { Link } from 'react-router-dom'

export default function Logo() {
  return <Link className="brand" to="/" aria-label="StudyCircle home"><span className="brand-ring" />StudyCircle</Link>
}

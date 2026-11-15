import { Link } from "react-router-dom";

export default function Logo() {
  return <Link className="logo" to="/" aria-label="StudyCircle home"><span className="logo-mark" aria-hidden="true" />StudyCircle</Link>;
}

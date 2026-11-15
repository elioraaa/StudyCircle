import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="simple-page"><h1>Page not found</h1><Link className="link" to="/">Back to home</Link></main>;
}

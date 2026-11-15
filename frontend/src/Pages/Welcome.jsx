import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const groups = [
  { code: "CS301", title: "Data Structures – exam prep", mode: "Online", when: "Thu 18:00", members: "4/6" },
  { code: "SE210", title: "UML diagrams practice", mode: "In person", when: "Mon 14:00", members: "3/5" },
  { code: "MA201", title: "Linear Algebra weekly review", mode: "In person", when: "Wed 16:30", members: "5/8" },
];
const features = [
  { icon: <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M8 10.5h5M10.5 8v5" /></svg>, title: "Search by course", text: "Find groups for exactly the class you're taking." },
  { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>, title: "Fits your schedule", text: "See when and where each group meets before you join." },
  { icon: <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6" /></svg>, title: "Study together", text: "Chat with your group and plan sessions in one place." },
];

export default function Welcome() {
  return <div className="welcome-page">
    <header className="topbar"><Logo /><nav aria-label="Account"><Link className="top-login" to="/login">Log in</Link><Link className="btn btn-primary top-signup" to="/signup">Sign up</Link></nav></header>
    <main>
      <section className="hero"><div className="hero-copy"><span className="eyebrow">BETTER TOGETHER</span><h1>Find your study group in minutes.</h1><p>Search groups by course, see when and where they meet, and join with one click.</p><div className="hero-actions"><Link className="btn btn-primary" to="/signup">Get started</Link><Link className="btn btn-outline" to="/login">I already have an account</Link></div></div>
        <div className="group-stack" aria-hidden="true">{groups.map((group, index) => <article className={`glass-card preview-card card-${index + 1}`} key={group.code}><div className="preview-top"><span className="course-code">{group.code}</span><span className="mode-pill">{group.mode}</span></div><h2>{group.title}</h2><div className="preview-bottom"><span>{group.when}</span><span>{group.members} members</span></div></article>)}</div>
      </section>
      <section className="features" aria-label="How StudyCircle helps">{features.map((feature) => <article className="glass-card feature-card" key={feature.title}><div className="feature-icon" aria-hidden="true">{feature.icon}</div><h2>{feature.title}</h2><p>{feature.text}</p></article>)}</section>
    </main>
    <footer>StudyCircle · UNYT Software Engineering project</footer>
  </div>;
}

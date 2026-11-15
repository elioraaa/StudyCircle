import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { forgotPassword } from "../api/auth";
import { validEmail } from "../components/AuthForm";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(""); const [submitting, setSubmitting] = useState(false); const [sent, setSent] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault(); setError(""); setNetworkError("");
    if (!email.trim()) { setError("Email is required"); return; }
    if (!validEmail(email)) { setError("Enter a valid email address"); return; }
    setSubmitting(true);
    try { await forgotPassword(email); setSent(true); }
    catch (requestError) { if (requestError.response) setSent(true); else setNetworkError("Something went wrong. Try again."); }
    finally { setSubmitting(false); }
  }
  return <main className="auth-page"><section className="glass auth-panel">
    <Logo />
    {sent ? <div className="success-state"><div className="success-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg></div><h1>Check your email</h1><p className="auth-subtitle">If an account exists for {email}, we sent a reset link.</p><Link className="btn btn-outline full-width button-link" to="/login">Back to log in</Link></div> : <>
      <h1>Forgot your password?</h1><p className="auth-subtitle">Enter your email and we'll send you a reset link.</p>
      <form onSubmit={handleSubmit} noValidate><div className="field"><label htmlFor="email">Email</label><input className={`input${error ? " input-error" : ""}`} id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />{error && <small className="error-text" role="alert">{error}</small>}</div>
        {networkError && <p className="form-error" role="alert">{networkError}</p>}<button className="btn btn-primary full-width" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send reset link"}</button>
      </form>
    </>}
    {!sent && <p className="auth-bottom"><Link className="link" to="/login">Back to log in</Link></p>}
  </section></main>;
}

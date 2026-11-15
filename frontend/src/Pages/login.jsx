import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { FormError, PasswordField, validEmail } from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!validEmail(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Password is required";
    setErrors(next); setFormError("");
    if (Object.keys(next).length) return;
    setSubmitting(true);
    try { await login({ email, password }); navigate("/dashboard"); }
    catch (error) { setFormError(error.response?.status === 401 ? "Wrong email or password" : "Something went wrong. Try again."); }
    finally { setSubmitting(false); }
  }

  return <main className="auth-page"><section className="glass auth-panel">
    <Logo /><h1>Welcome back</h1><p className="auth-subtitle">Log in to see your study groups.</p>
    <form onSubmit={handleSubmit} noValidate>
      <div className="field"><label htmlFor="email">Email</label><input className={`input${errors.email ? " input-error" : ""}`} id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />{errors.email && <small className="error-text" role="alert">{errors.email}</small>}</div>
      <PasswordField id="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} />
      <div className="forgot-row"><Link className="link" to="/forgot-password">Forgot password?</Link></div>
      <FormError>{formError}</FormError>
      <button className="btn btn-primary full-width" type="submit" disabled={submitting}>{submitting ? "Logging in..." : "Log in"}</button>
    </form>
    <p className="auth-bottom">Don't have an account? <Link className="link" to="/signup">Sign up</Link></p>
  </section></main>;
}

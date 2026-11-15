import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { FormError, PasswordField, validEmail } from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { user, register } = useAuth(); const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", surname: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({}); const [formError, setFormError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const update = (key) => (event) => setValues({ ...values, [key]: event.target.value });
  if (user) return <Navigate to="/dashboard" replace />;
  const strength = values.password.length >= 8 && /\d/.test(values.password) ? (values.password.length >= 12 ? 3 : 2) : values.password ? 1 : 0;

  async function handleSubmit(event) {
    event.preventDefault(); const next = {};
    if (!values.name.trim()) next.name = "Name is required";
    if (!values.surname.trim()) next.surname = "Surname is required";
    if (!values.email.trim()) next.email = "Email is required"; else if (!validEmail(values.email)) next.email = "Enter a valid email address";
    if (!values.password) next.password = "Password is required"; else if (values.password.length < 8 || !/\d/.test(values.password)) next.password = "Use at least 8 characters and one number";
    if (!values.confirm) next.confirm = "Please confirm your password"; else if (values.confirm !== values.password) next.confirm = "Passwords do not match";
    setErrors(next); setFormError(""); if (Object.keys(next).length) return;
    setSubmitting(true);
    try { await register({ name: values.name, surname: values.surname, email: values.email, password: values.password }); navigate("/dashboard"); }
    catch (error) { if (error.response?.status === 409) setErrors((current) => ({ ...current, email: "This email is already registered" })); else setFormError("Something went wrong. Try again."); }
    finally { setSubmitting(false); }
  }

  return <main className="auth-page"><section className="glass auth-panel signup-panel">
    <Logo /><h1>Create your account</h1><p className="auth-subtitle">Join study groups for your courses.</p>
    <form onSubmit={handleSubmit} noValidate>
      <div className="name-row">{["name", "surname"].map((key) => <div className="field" key={key}><label htmlFor={key}>{key === "name" ? "Name" : "Surname"}</label><input className={`input${errors[key] ? " input-error" : ""}`} id={key} value={values[key]} onChange={update(key)} autoComplete={key === "name" ? "given-name" : "family-name"} />{errors[key] && <small className="error-text" role="alert">{errors[key]}</small>}</div>)}</div>
      <div className="field"><label htmlFor="email">Email</label><input className={`input${errors.email ? " input-error" : ""}`} id="email" type="email" autoComplete="email" value={values.email} onChange={update("email")} />{errors.email && <small className="error-text" role="alert">{errors.email}</small>}<small className="hint">Use your university email</small></div>
      <PasswordField id="password" label="Password" value={values.password} onChange={update("password")} error={errors.password} hint="At least 8 characters, one number" />
      <div className="strength" aria-label={`Password strength: ${["empty", "weak", "okay", "strong"][strength]}`}><span className={strength >= 1 ? `strength-${strength}` : ""} /><span className={strength >= 2 ? `strength-${strength}` : ""} /><span className={strength >= 3 ? "strength-3" : ""} /></div>
      <PasswordField id="confirm" label="Confirm password" value={values.confirm} onChange={update("confirm")} error={errors.confirm} />
      <FormError>{formError}</FormError><button className="btn btn-primary full-width" type="submit" disabled={submitting}>{submitting ? "Creating account..." : "Create account"}</button>
    </form><p className="auth-bottom">Already have an account? <Link className="link" to="/login">Log in</Link></p>
  </section></main>;
}

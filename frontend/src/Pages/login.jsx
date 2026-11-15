import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import PasswordEye from '../components/PasswordEye.jsx'
import { useAuth } from '../context/useAuth.js'

function emailIsValid(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!email.trim()) nextErrors.email = 'Email is required'
    else if (!emailIsValid(email)) nextErrors.email = 'Enter a valid email address'
    if (!password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)
    setServerError('')
    if (Object.keys(nextErrors).length) return
    setSubmitting(true)
    try { await login({ email, password }); navigate('/dashboard') }
    catch (error) { setServerError(error.response?.status === 401 ? 'Wrong email or password' : 'Something went wrong. Try again.') }
    finally { setSubmitting(false) }
  }

  return <main className="auth-page"><section className="auth-panel glass"><Logo /><h1>Welcome back</h1><p className="auth-subtitle">Log in to see your study groups.</p>
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <label className="field">Email<input className={`input ${errors.email ? 'input-error' : ''}`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} />{errors.email && <span className="error-text" role="alert">{errors.email}</span>}</label>
      <label className="field">Password<span className="password-wrap"><input className={`input ${errors.password ? 'input-error' : ''}`} type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} /><button className="eye-button" type="button" aria-label="Show password" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}><PasswordEye hidden={!showPassword} /></button></span>{errors.password && <span className="error-text" role="alert">{errors.password}</span>}</label>
      <div className="forgot-link"><Link className="link" to="/forgot-password">Forgot password?</Link></div>
      {serverError && <p className="form-server-error" role="alert">{serverError}</p>}
      <button className="btn btn-primary submit-button" disabled={submitting}>{submitting ? 'Logging in...' : 'Log in'}</button>
    </form>
    <p className="auth-bottom">Don't have an account? <Link className="link" to="/signup">Sign up</Link></p>
  </section></main>
}

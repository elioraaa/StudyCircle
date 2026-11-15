import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { forgotPassword } from '../api/auth.js'

function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [requestError, setRequestError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setRequestError('')
    if (!email.trim()) return setError('Email is required')
    if (!validEmail(email)) return setError('Enter a valid email address')
    setSubmitting(true)
    try { await forgotPassword(email); setSent(true) }
    catch { setRequestError('Something went wrong. Try again.') }
    finally { setSubmitting(false) }
  }

  return <main className="auth-page"><section className="auth-panel glass"><Logo />
    {sent ? <div className="success-state"><span className="success-icon"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h1>Check your email</h1><p className="auth-subtitle">If an account exists for {email}, we sent a reset link.</p><Link className="btn btn-outline submit-button" to="/login">Back to log in</Link></div> : <><h1>Forgot your password?</h1><p className="auth-subtitle">Enter your email and we'll send you a reset link.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate><label className="field">Email<input className={`input ${error ? 'input-error' : ''}`} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(error)} />{error && <span className="error-text" role="alert">{error}</span>}</label>{requestError && <p className="form-server-error" role="alert">{requestError}</p>}<button className="btn btn-primary submit-button" disabled={submitting}>{submitting ? 'Sending...' : 'Send reset link'}</button></form>
    </>}
    <p className="auth-bottom"><Link className="link" to="/login">Back to log in</Link></p>
  </section></main>
}

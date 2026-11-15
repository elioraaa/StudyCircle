import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/useAuth.js'
import PasswordEye from '../components/PasswordEye.jsx'

function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }

export default function Signup() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const strength = form.password.length >= 8 && /\d/.test(form.password) ? 3 : form.password.length >= 8 || /\d/.test(form.password) ? 2 : form.password ? 1 : 0

  async function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.surname.trim()) next.surname = 'Surname is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!validEmail(form.email)) next.email = 'Enter a valid email address'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8 || !/\d/.test(form.password)) next.password = 'Use at least 8 characters and one number'
    if (!form.confirm) next.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitting(true)
    try {
      await register({ name: form.name, surname: form.surname, email: form.email, password: form.password })
      navigate('/dashboard')
    } catch (error) {
      if (error.response?.status === 409) setErrors({ email: 'This email is already registered' })
      else setErrors({ form: 'Something went wrong. Try again.' })
    } finally { setSubmitting(false) }
  }

  const field = (key, label, type = 'text', extra = {}) => <label className="field">{label}<input className={`input ${errors[key] ? 'input-error' : ''}`} type={type} value={form[key]} onChange={update(key)} autoComplete={extra.autoComplete} aria-invalid={Boolean(errors[key])} />{extra.hint && <span className="field-hint">{extra.hint}</span>}{errors[key] && <span className="error-text" role="alert">{errors[key]}</span>}</label>

  return <main className="auth-page"><section className="auth-panel glass signup-panel"><Logo /><h1>Create your account</h1><p className="auth-subtitle">Join study groups for your courses.</p>
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="name-row">{field('name', 'Name', 'text', { autoComplete: 'given-name' })}{field('surname', 'Surname', 'text', { autoComplete: 'family-name' })}</div>
      {field('email', 'Email', 'email', { autoComplete: 'email', hint: 'Use your university email' })}
      <label className="field">Password<span className="password-wrap"><input className={`input ${errors.password ? 'input-error' : ''}`} type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} autoComplete="new-password" aria-invalid={Boolean(errors.password)} /><button className="eye-button" type="button" aria-label="Show password" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}><PasswordEye hidden={!showPassword} /></button></span><span className="field-hint">At least 8 characters, one number</span><span className="strength-meter" aria-label={`Password strength: ${['empty', 'weak', 'okay', 'strong'][strength]}`}>{[1, 2, 3].map((part) => <span key={part} className={strength >= part ? `strength-${strength}` : ''} />)}</span>{errors.password && <span className="error-text" role="alert">{errors.password}</span>}</label>
      <label className="field">Confirm password<span className="password-wrap"><input className={`input ${errors.confirm ? 'input-error' : ''}`} type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={update('confirm')} autoComplete="new-password" aria-invalid={Boolean(errors.confirm)} /><button className="eye-button" type="button" aria-label="Show password" aria-pressed={showConfirm} onClick={() => setShowConfirm(!showConfirm)}><PasswordEye hidden={!showConfirm} /></button></span>{errors.confirm && <span className="error-text" role="alert">{errors.confirm}</span>}</label>
      {errors.form && <p className="form-server-error" role="alert">{errors.form}</p>}
      <button className="btn btn-primary submit-button" disabled={submitting}>{submitting ? 'Creating account...' : 'Create account'}</button>
    </form>
    <p className="auth-bottom">Already have an account? <Link className="link" to="/login">Log in</Link></p>
  </section></main>
}

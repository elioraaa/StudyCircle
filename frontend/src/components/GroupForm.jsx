import { useState } from 'react'

const emptyGroup = { courseCode: '', topic: '', description: '', maxSize: 6, mode: 'online' }

export default function GroupForm({ initial = emptyGroup, submitLabel, busyLabel, onSubmit }) {
  const [values, setValues] = useState({ ...emptyGroup, ...initial })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [serverError, setServerError] = useState('')
  function change(event) { setValues({ ...values, [event.target.name]: event.target.value }) }
  async function submit(event) {
    event.preventDefault()
    const next = {}
    if (!values.courseCode.trim()) next.courseCode = 'Enter a course code.'
    if (!values.topic.trim()) next.topic = 'Enter a topic.'
    if (!Number.isInteger(Number(values.maxSize)) || Number(values.maxSize) < 2 || Number(values.maxSize) > 20) next.maxSize = 'Choose a size from 2 to 20.'
    setErrors(next); setServerError('')
    if (Object.keys(next).length) return
    setBusy(true)
    try { await onSubmit({ ...values, courseCode: values.courseCode.trim(), topic: values.topic.trim(), description: values.description.trim(), maxSize: Number(values.maxSize) }) }
    catch (error) { if (error.response?.status === 401) window.location.assign('/login'); else setServerError(error.response?.data?.message || error.response?.data?.error || 'We could not save this group. Please try again.') }
    finally { setBusy(false) }
  }
  return <form className="group-form" onSubmit={submit} noValidate>
    <label className="field">Course code<input className={`input ${errors.courseCode ? 'input-error' : ''}`} name="courseCode" placeholder="e.g. CS301" value={values.courseCode} onChange={change} />{errors.courseCode && <span className="error-text" role="alert">{errors.courseCode}</span>}</label>
    <label className="field">Topic<input className={`input ${errors.topic ? 'input-error' : ''}`} name="topic" value={values.topic} onChange={change} />{errors.topic && <span className="error-text" role="alert">{errors.topic}</span>}</label>
    <label className="field">Description <span className="field-hint">Optional</span><textarea className="input textarea" name="description" value={values.description} onChange={change} rows="4" /></label>
    <label className="field">Max size<input className={`input ${errors.maxSize ? 'input-error' : ''}`} type="number" min="2" max="20" name="maxSize" value={values.maxSize} onChange={change} />{errors.maxSize && <span className="error-text" role="alert">{errors.maxSize}</span>}</label>
    <fieldset className="mode-field"><legend>Mode</legend><div className="mode-options"><button type="button" className={`mode-option ${values.mode === 'online' ? 'selected' : ''}`} onClick={() => setValues({ ...values, mode: 'online' })}>Online</button><button type="button" className={`mode-option ${values.mode === 'in-person' ? 'selected' : ''}`} onClick={() => setValues({ ...values, mode: 'in-person' })}>In person</button></div></fieldset>
    {serverError && <p className="error-text" role="alert">{serverError}</p>}
    <button className="btn btn-primary submit-button" disabled={busy}>{busy ? busyLabel : submitLabel}</button>
  </form>
}

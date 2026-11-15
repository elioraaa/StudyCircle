import { useState } from "react";

export function PasswordField({ id, label, value, onChange, error, hint }) {
  const [visible, setVisible] = useState(false);
  return <div className="field">
    <label htmlFor={id}>{label}</label>
    <div className="password-wrap">
      <input className={`input${error ? " input-error" : ""}`} id={id} type={visible ? "text" : "password"} value={value} onChange={onChange} autoComplete={id === "password" ? "current-password" : "new-password"} />
      <button className="eye-button" type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible(!visible)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
      </button>
    </div>
    {hint && <small className="hint">{hint}</small>}{error && <small className="error-text" role="alert">{error}</small>}
  </div>;
}

export function FormError({ children }) {
  return children ? <p className="form-error" role="alert">{children}</p> : null;
}

export function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

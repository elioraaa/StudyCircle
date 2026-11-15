export default function PasswordEye({ hidden = false }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    {hidden && <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.7" />}
  </svg>
}

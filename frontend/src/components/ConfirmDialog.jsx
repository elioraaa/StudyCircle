export default function ConfirmDialog({ onCancel, onConfirm, busy }) {
  return <div className="dialog-backdrop" role="presentation"><section className="confirm-dialog glass" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">Delete this group?</h2><p>This action cannot be undone.</p><div className="dialog-actions"><button className="btn btn-outline" onClick={onCancel}>Cancel</button><button className="btn btn-danger" onClick={onConfirm} disabled={busy}>{busy ? 'Deleting...' : 'Delete group'}</button></div></section></div>
}

import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as groupsApi from '../api/groups.js'
import * as membershipApi from '../api/memberships.js'
import { useAuth } from '../context/useAuth.js'
import { initials } from '../utils/initials.js'
import GroupForm from '../components/GroupForm.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function GroupDetails() {
  const { id } = useParams(); const navigate = useNavigate(); const { user } = useAuth()
  const [group, setGroup] = useState(null); const [membership, setMembership] = useState(null); const [members, setMembers] = useState([]); const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true); const [notFound, setNotFound] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState(''); const [editing, setEditing] = useState(false); const [confirming, setConfirming] = useState(false); const [busy, setBusy] = useState(false)
  const owner = membership?.status === 'OWNER'; const full = group && group.memberCount >= group.maxSize
  const load = useCallback(async () => {
    setLoading(true); setError(''); setNotFound(false)
    try {
      const result = await groupsApi.getGroup(id); setGroup(result)
      if (user) {
        const statusResult = await membershipApi.getMembership(id); setMembership(statusResult)
        const accepted = await membershipApi.getMembers(id); setMembers(accepted)
        if (statusResult.status === 'OWNER') { try { setRequests(await membershipApi.getJoinRequests(id)) } catch { setRequests([]); setError('Join requests are temporarily unavailable.') } }
        else setRequests([])
      } else { setMembership(null); setMembers([]); setRequests([]) }
    } catch (err) { if (err.response?.status === 404) setNotFound(true); else setError('We could not load this group. Please try again.') }
    finally { setLoading(false) }
  }, [id, user])
  useEffect(() => { const timer = setTimeout(load, 0); return () => clearTimeout(timer) }, [load])
  async function join() { setBusy(true); setError(''); try { await membershipApi.joinGroup(id); setMembership({ status: 'PENDING' }); setNotice('Request sent') } catch (err) { setError(err.response?.data?.message || 'We could not send your request. Please try again.') } finally { setBusy(false) } }
  async function save(details) { const updated = await groupsApi.updateGroup(id, details); setGroup(updated); setEditing(false) }
  async function removeGroup() { setBusy(true); try { await groupsApi.deleteGroup(id); navigate('/groups') } catch (err) { setError(err.response?.data?.message || 'We could not delete this group.') ; setConfirming(false) } finally { setBusy(false) } }
  async function respond(request, status) { try { await membershipApi.updateMembership(request.id, status); setRequests((current) => current.filter((item) => item.id !== request.id)); setMembers(await membershipApi.getMembers(id)); setGroup(await groupsApi.getGroup(id)) } catch { setError('We could not update that request. Please try again.') } }
  if (loading) return <p className="detail-message">Loading group...</p>
  if (notFound) return <div className="empty-state glass-card"><h1>Group not found</h1><Link className="link" to="/groups">Back to groups</Link></div>
  if (error && !group) return <div className="empty-state glass-card" role="alert"><p>{error}</p><button className="btn btn-primary" onClick={load}>Try again</button></div>
  if (!group) return null
  return <section className="details-page">
    <div className="details-main">
      <article className="glass detail-panel">
        {editing && owner ? <><h1>Edit group</h1><GroupForm initial={group} submitLabel="Save changes" busyLabel="Saving..." onSubmit={save} /><button className="btn btn-outline cancel-edit" onClick={() => setEditing(false)}>Cancel</button></> : <>
          <div className="group-card-meta"><span className="course-code">{group.courseCode}</span><span className="mode-badge">{group.mode === 'online' ? 'Online' : 'In person'}</span></div><h1>{group.topic}</h1><p className="detail-description">{group.description || 'No description provided.'}</p><p className="group-owner">Created by {group.owner?.name} {group.owner?.surname}</p><p className="member-count">{group.memberCount} / {group.maxSize} members</p><div className="progress-track" role="progressbar" aria-valuenow={group.memberCount} aria-valuemin="0" aria-valuemax={group.maxSize}><span style={{ width: `${Math.min(100, group.memberCount / group.maxSize * 100)}%` }} /></div>
        </>}
      </article>
      <section className="glass-card people-card"><h2>Members</h2>{members.length ? <ul className="people-list">{members.map((person) => <li key={person.id}><span className="avatar">{initials(person)}</span><span>{person.name} {person.surname}</span></li>)}</ul> : <p className="muted">{user ? 'Member details are unavailable.' : 'Log in to view members.'}</p>}</section>
      {owner && <section className="glass-card requests-card"><h2>Join requests</h2>{requests.length ? <ul className="request-list">{requests.map((request) => <li key={request.id}><div><strong>{request.user.name} {request.user.surname}</strong><span>{request.user.email}</span></div><div className="request-actions"><button className="btn btn-primary btn-small" onClick={() => respond(request, 'ACCEPTED')}>Accept</button><button className="btn btn-outline btn-small" onClick={() => respond(request, 'REJECTED')}>Decline</button></div></li>)}</ul> : <p className="muted">No pending requests</p>}</section>}
    </div>
    <aside className="detail-aside"><div className="glass-card action-card"><h2>Join this group</h2>{!user ? <Link className="btn btn-primary" to="/login">Log in to join</Link> : owner ? <><p>You own this group</p><button className="btn btn-outline" onClick={() => setEditing(true)}>Edit</button><button className="btn btn-danger" onClick={() => setConfirming(true)}>Delete</button></> : membership?.status === 'PENDING' ? <button className="btn btn-outline" disabled>Request sent – waiting for the owner</button> : membership?.status === 'ACCEPTED' ? <p className="member-success">You are a member</p> : membership?.status === 'REJECTED' ? <p>Your request was declined</p> : full ? <button className="btn btn-outline" disabled>Group is full</button> : <button className="btn btn-primary" onClick={join} disabled={busy}>{busy ? 'Sending...' : 'Request to join'}</button>}{notice && <p role="status" className="member-success">{notice}</p>}{error && <p role="alert" className="error-text">{error}</p>}</div></aside>
    {confirming && <ConfirmDialog onCancel={() => setConfirming(false)} onConfirm={removeGroup} busy={busy} />}
  </section>
}

import { useNavigate } from 'react-router-dom'
import * as groupsApi from '../api/groups.js'
import GroupForm from '../components/GroupForm.jsx'

export default function CreateGroup() {
  const navigate = useNavigate()
  async function create(details) { const group = await groupsApi.createGroup(details); navigate(`/groups/${group.id}`) }
  return <section className="form-page"><div className="glass create-panel"><p className="eyebrow">MAKE A PLAN</p><h1>Create a study group</h1><p className="page-subtitle">Set up a space to learn together.</p><GroupForm submitLabel="Create group" busyLabel="Creating..." onSubmit={create} /></div></section>
}

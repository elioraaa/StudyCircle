import client from './client.js'

export async function joinGroup(id) { return (await client.post(`/groups/${id}/join`)).data }
export async function getMembership(id) { return (await client.get(`/groups/${id}/membership`)).data }
export async function getMembers(id) { return (await client.get(`/groups/${id}/members`)).data }
export async function getJoinRequests(id) { return (await client.get(`/groups/${id}/requests`)).data }
export async function updateMembership(id, status) { return (await client.patch(`/memberships/${id}`, { status })).data }

import client from './client.js'

export async function getGroups() { return (await client.get('/groups')).data }
export async function getGroup(id) { return (await client.get(`/groups/${id}`)).data }
export async function createGroup(details) { return (await client.post('/groups', details)).data }
export async function updateGroup(id, details) { return (await client.patch(`/groups/${id}`, details)).data }
export async function deleteGroup(id) { return (await client.delete(`/groups/${id}`)).data }

// The original starter tracked this file under Api/; keep the import compatible
// with that existing path while the new auth module lives in the lowercase api folder.
import client from '../Api/client.js'

export async function register(details) {
  const response = await client.post('/auth/register', details)
  return response.data
}
export async function login(details) {
  const response = await client.post('/auth/login', details)
  return response.data
}
export async function getMe() {
  const response = await client.get('/auth/me')
  return response.data
}
export async function forgotPassword(email) {
  const response = await client.post('/auth/forgot-password', { email })
  return response.data
}

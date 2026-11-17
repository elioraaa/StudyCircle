export function initials(user) {
  return [user?.name, user?.surname].filter(Boolean).map((part) => part[0]).join('').toUpperCase() || '?'
}

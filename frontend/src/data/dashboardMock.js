// TEMPORARY mock data – replace with real API calls when the backend endpoints exist
export const stats = [
  { label: 'Groups joined', value: '5', note: '+2 this month' },
  { label: 'Sessions this week', value: '3', note: 'next: Thu' },
  { label: 'Study hours (month)', value: '35h', note: '+8h' },
  { label: 'Pending requests', value: '2', note: 'to review', id: 'stat-pending-requests' },
]
export const weeklyHours = [
  { label: 'W1', hours: 6 }, { label: 'W2', hours: 9 }, { label: 'W3', hours: 7 },
  { label: 'W4', hours: 12 }, { label: 'W5', hours: 8 }, { label: 'W6', hours: 10 }, { label: 'W7', hours: 5 },
]
export const timeByCourse = [
  { course: 'CS301', percent: 38, color: '#3FB950' }, { course: 'SE210', percent: 27, color: 'var(--accent)' },
  { course: 'MA201', percent: 22, color: '#F5A524' }, { course: 'Other', percent: 13, color: '#E4E4E7' },
]
export const upcomingSessions = [
  { code: 'CS301', topic: 'Data Structures – exam prep', when: 'Thu 18:00', where: 'Google Meet' },
  { code: 'SE330', topic: 'Cloud computing midterm', when: 'Sat 11:00', where: 'Zoom' },
  { code: 'SE210', topic: 'UML diagrams practice', when: 'Mon 14:00', where: 'Room B203' },
]

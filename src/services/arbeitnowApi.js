const API_URL = 'https://www.arbeitnow.com/api/job-board-api'

export async function getArbeitnowJobs() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch Arbeitnow jobs')
  }

  const data = await response.json()

  return data.data
}
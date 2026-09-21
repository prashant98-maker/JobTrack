const API_URL = 'https://remotive.com/api/remote-jobs'

export async function getJobs() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  const data = await response.json()

  return data.jobs
}
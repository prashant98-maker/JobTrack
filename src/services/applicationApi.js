const API_URL =
  'https://jobtrack-a7zd.onrender.com/api/applications'

export async function getApplications() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch applications')
  }

  return response.json()
}

export async function createApplication(application) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  })

  if (!response.ok) {
    throw new Error('Failed to create application')
  }

  return response.json()
}

export async function updateApplication(id, application) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  })

  if (!response.ok) {
    throw new Error('Failed to update application')
  }

  return response.json()
}

export async function deleteApplication(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete application')
  }

  return response.json()
}
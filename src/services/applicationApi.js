const API_URL =
  'https://jobtrack-a7zd.onrender.com/api/applications'

function getToken() {
  return localStorage.getItem('jobtrack_token')
}

function getHeaders() {
  const token = getToken()

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function getApplications() {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch applications')
  }

  return response.json()
}

export async function createApplication(application) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
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
    headers: getHeaders(),
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
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete application')
  }

  return response.json()
}

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getApplications,
  updateApplication,
} from '../services/applicationApi'

function EditApplication() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] = useState(null)

  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    location: '',
    applicationDate: '',
    status: 'Applied',
    jobLink: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    async function loadApplication() {
      try {
        const applications = await getApplications()

        const foundApplication = applications.find(
          (item) => item._id === id
        )

        if (!foundApplication) {
          return
        }

        setApplication(foundApplication)

        setFormData({
          company: foundApplication.company,
          jobTitle: foundApplication.role,
          location: foundApplication.location,
          applicationDate: foundApplication.appliedDate,
          status: foundApplication.status,
          jobLink: foundApplication.jobUrl,
        })
      } catch {
        setError('Failed to load application.')
      }
    }

    loadApplication()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !formData.company ||
      !formData.jobTitle ||
      !formData.location ||
      !formData.applicationDate
    ) {
      setError('Please fill all required fields.')
      return
    }

    try {
      await updateApplication(id, {
        company: formData.company,
        role: formData.jobTitle,
        location: formData.location,
        status: formData.status,
        appliedDate: formData.applicationDate,
        jobUrl: formData.jobLink,
      })

      navigate('/applications')
    } catch {
      setError('Failed to update application. Please try again.')
    }
  }

  if (!application && !error) {
    return (
      <main className="min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
            <p className="text-gray-500">
              Loading application...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!application && error) {
    return (
      <main className="min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
            <div className="text-4xl">🔍</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Application not found
            </h2>

            <p className="mt-2 text-gray-500">
              The application you are looking for does not exist.
            </p>

            <Link
              to="/applications"
              className="inline-block mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Back to Applications
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-10">

        <Link
          to="/applications"
          className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition"
        >
          ← Back to Applications
        </Link>

        <section className="mt-5 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10">
            <p className="text-blue-100 font-medium">
              JobTrack
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
              Edit Application
            </h1>

            <p className="mt-3 text-blue-100">
              Update your application details and current status.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-8"
        >
          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title *
              </label>

              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Date *
              </label>

              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Link
              </label>

              <input
                type="url"
                name="jobLink"
                value={formData.jobLink}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full px-5 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  )
}

export default EditApplication
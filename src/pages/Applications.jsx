import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getApplications,
  deleteApplication,
} from '../services/applicationApi'
import ApplicationCard from '../components/ApplicationCard'

function Applications() {
  const [applications, setApplications] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications()

        const formattedApplications = data.map((application) => ({
          id: application._id,
          company: application.company,
          jobTitle: application.role,
          location: application.location,
          status: application.status,
          applicationDate: application.appliedDate,
          jobLink: application.jobUrl,
        }))

        setApplications(formattedApplications)
      } catch {
        setApplications([])
      }
    }

    loadApplications()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id)

      const updatedApplications = applications.filter(
        (application) => application.id !== id
      )

      setApplications(updatedApplications)
    } catch {
      alert('Failed to delete application. Please try again.')
    }
  }

  const filteredApplications = applications.filter((application) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      application.company.toLowerCase().includes(searchText) ||
      application.jobTitle.toLowerCase().includes(searchText)

    const matchesStatus =
      statusFilter === 'All' ||
      application.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">

        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10">
            <p className="text-blue-100 font-medium">
              Your job search
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
              My Applications
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Keep all your job applications organized and
              track their progress in one place.
            </p>

            <Link
              to="/applications/add"
              className="inline-block mt-6 px-5 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              + Add Application
            </Link>
          </div>

          <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        </section>

        {/* Search and Filter */}
        <section className="mt-6 bg-white/90 backdrop-blur rounded-2xl border border-white shadow-lg p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              🔎
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Search Applications
              </h2>

              <p className="text-sm text-gray-500">
                Find applications by company or job title
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by company or job title"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </section>

        {/* Application Count */}
        <section className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Your Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
          </div>
        </section>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="mt-5 bg-white rounded-2xl border shadow-sm p-10 text-center">
            <div className="text-4xl">📋</div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No applications yet
            </h3>

            <p className="mt-2 text-gray-500">
              Start tracking your job applications.
            </p>

            <Link
              to="/applications/add"
              className="inline-block mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Add Your First Application
            </Link>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="mt-5 bg-white rounded-2xl border shadow-sm p-10 text-center">
            <div className="text-4xl">🔍</div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No matching applications
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default Applications
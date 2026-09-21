import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { getApplications } from '../services/applicationApi'

function Dashboard() {
  const [applications, setApplications] = useState([])

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
          createdAt: application.createdAt,
        }))

        setApplications(formattedApplications)
      } catch {
        setApplications([])
      }
    }

    loadApplications()
  }, [])

  const totalApplications = applications.length

  const applied = applications.filter(
    (application) => application.status === 'Applied'
  ).length

  const interviews = applications.filter(
    (application) => application.status === 'Interview'
  ).length

  const selected = applications.filter(
    (application) => application.status === 'Selected'
  ).length

  const rejected = applications.filter(
    (application) => application.status === 'Rejected'
  ).length

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <p className="text-blue-100 font-medium">
              Welcome to JobTrack
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
              Manage your job search smarter.
            </h1>

            <p className="mt-4 text-blue-100 text-sm sm:text-base leading-7">
              Track applications, discover new opportunities and
              monitor your job search progress from one place.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/jobs"
                className="text-center px-5 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                Find Jobs
              </Link>

              <Link
                to="/applications/add"
                className="text-center px-5 py-3 rounded-xl bg-blue-500/40 border border-white/30 text-white font-semibold hover:bg-blue-500/60 transition"
              >
                Add Application
              </Link>
            </div>
          </div>

          <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        </section>

        {/* Stats */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Application Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your current job search statistics
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              title="Total Applications"
              value={totalApplications}
            />

            <StatCard
              title="Applied"
              value={applied}
            />

            <StatCard
              title="Interviews"
              value={interviews}
            />

            <StatCard
              title="Selected"
              value={selected}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              title="Rejected"
              value={rejected}
            />
          </div>
        </section>

        {/* Recent Applications */}
        <section className="mt-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-white p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest job applications
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/applications"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
              >
                View All
              </Link>

              <Link
                to="/applications/add"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                + Add Application
              </Link>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="mt-6 rounded-xl bg-gray-50 border border-dashed p-10 text-center">
              <p className="text-gray-500">
                No applications yet.
              </p>

              <Link
                to="/applications/add"
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                Add your first application
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {applications
                .slice(0, 5)
                .map((application) => (
                  <div
                    key={application.id}
                    className="group border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {application.jobTitle}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {application.company}
                        </p>
                      </div>

                      <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

export default Dashboard
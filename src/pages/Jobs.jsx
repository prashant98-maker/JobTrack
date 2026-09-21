import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobs } from '../services/jobApi'
import { getArbeitnowJobs } from '../services/arbeitnowApi'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    async function loadJobs() {
      try {
        const [remotiveJobs, arbeitnowJobs] =
          await Promise.all([
            getJobs(),
            getArbeitnowJobs(),
          ])

        const remotiveData = remotiveJobs.map((job) => ({
          ...job,
          detailsId: `remotive-${job.id}`,
          company: job.company_name,
          jobLocation:
            job.candidate_required_location || 'Remote',
        }))

        const arbeitnowData = arbeitnowJobs.map((job) => ({
          ...job,
          detailsId: `arbeitnow-${job.slug}`,
          company: job.company_name,
          jobLocation: job.location || 'Remote',
        }))

        setJobs([
          ...remotiveData,
          ...arbeitnowData,
        ])
      } catch (error) {
        setError('Unable to load jobs')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase()
    const locationText = location.toLowerCase()

    const title = (job.title || '').toLowerCase()
    const company = (job.company || '').toLowerCase()
    const jobLocation = (job.jobLocation || '').toLowerCase()

    const matchesSearch =
      title.includes(searchText) ||
      company.includes(searchText)

    const matchesLocation =
      jobLocation.includes(locationText)

    return matchesSearch && matchesLocation
  })

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">

        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10">
            <p className="text-blue-100 font-medium">
              Explore opportunities
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
              Find Your Next Job
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Search through real job listings from multiple
              job APIs and find opportunities that match your skills.
            </p>
          </div>

          <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        </section>

        {/* Search */}
        <section className="mt-6 bg-white/90 backdrop-blur rounded-2xl border border-white shadow-lg p-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              🔎
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Search Jobs
              </h2>

              <p className="text-sm text-gray-500">
                Search by job title, company or location
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by job title or company"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <input
              type="text"
              placeholder="Filter by location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="mt-8 bg-white rounded-2xl border shadow-sm p-10 text-center">
            <p className="text-gray-600 font-medium">
              Loading jobs...
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Finding available opportunities
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl">
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Jobs */}
        {!loading && !error && (
          <section className="mt-8">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Jobs
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredJobs.length} jobs
                </p>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="mt-5 bg-white rounded-2xl border shadow-sm p-10 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  No jobs found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try changing your search or location filter.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                  <article
                    key={job.detailsId}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                        {job.company?.charAt(0)?.toUpperCase() || 'J'}
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                        Available
                      </span>
                    </div>

                    <div className="mt-5 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {job.title}
                      </h3>

                      <p className="mt-2 text-gray-600 font-medium">
                        {job.company}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        {job.jobLocation}
                      </p>
                    </div>

                    <Link
                      to={`/jobs/${job.detailsId}`}
                      className="mt-5 w-full text-center px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                      View Details →
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  )
}

export default Jobs
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getJobs } from '../services/jobApi'
import { getArbeitnowJobs } from '../services/arbeitnowApi'
import { createApplication } from '../services/applicationApi'

function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    async function loadJob() {
      try {
        const [remotiveJobs, arbeitnowJobs] =
          await Promise.all([
            getJobs(),
            getArbeitnowJobs(),
          ])

        let foundJob = null

        if (id.startsWith('remotive-')) {
          const jobId = Number(id.replace('remotive-', ''))

          foundJob = remotiveJobs.find(
            (item) => item.id === jobId
          )
        }

        if (id.startsWith('arbeitnow-')) {
          const jobSlug = id.replace('arbeitnow-', '')

          foundJob = arbeitnowJobs.find(
            (item) => item.slug === jobSlug
          )
        }

        if (!foundJob) {
          setError('Job not found')
          return
        }

        setJob(foundJob)
      } catch {
        setError('Unable to load job details')
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id])

  const handleTrackJob = async () => {
    if (!job || tracked) {
      return
    }

    try {
      await createApplication({
        company: job.company_name || job.company || 'Unknown Company',
        role: job.title || 'Unknown Role',
        location:
          job.candidate_required_location ||
          job.location ||
          'Remote',
        status: 'Applied',
        appliedDate: new Date()
          .toISOString()
          .split('T')[0],
        jobUrl: job.url || '',
      })

      setTracked(true)

      navigate('/applications')
    } catch {
      setError('Failed to track this job. Please try again.')
    }
  }

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)]">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
            <p className="text-gray-600 font-medium">
              Loading job details...
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Please wait while we load the job information.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-64px)]">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {error}
            </h2>

            <p className="mt-2 text-gray-500">
              The job you are looking for is not available.
            </p>

            <Link
              to="/jobs"
              className="inline-block mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">

        <Link
          to="/jobs"
          className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition"
        >
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <section className="mt-5 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <p className="text-blue-100 font-medium">
              Job Opportunity
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
              {job.title}
            </h1>

            <p className="mt-4 text-lg text-blue-50 font-medium">
              {job.company_name}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-sm">
                {job.candidate_required_location ||
                  job.location ||
                  'Remote'}
              </span>

              {job.job_type && (
                <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-sm">
                  {job.job_type}
                </span>
              )}
            </div>
          </div>

          <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        </section>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Job Description
              </h2>

              <div
                className="mt-5 text-gray-700 leading-7 break-words"
                dangerouslySetInnerHTML={{
                  __html:
                    job.description ||
                    'No description available.',
                }}
              />
            </div>

            {job.tags && job.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  Skills & Requirements
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </section>

          {/* Job Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-gray-900">
                Job Summary
              </h2>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Company
                  </p>

                  <p className="mt-1 text-gray-800 font-medium">
                    {job.company_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Location
                  </p>

                  <p className="mt-1 text-gray-800 font-medium">
                    {job.candidate_required_location ||
                      job.location ||
                      'Remote'}
                  </p>
                </div>

                {job.job_type && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                      Job Type
                    </p>

                    <p className="mt-1 text-gray-800 font-medium">
                      {job.job_type}
                    </p>
                  </div>
                )}

                {job.salary && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                      Salary
                    </p>

                    <p className="mt-1 text-gray-800 font-medium">
                      {job.salary}
                    </p>
                  </div>
                )}

              </div>

              <div className="mt-7 space-y-3">

                <button
                  type="button"
                  onClick={handleTrackJob}
                  disabled={tracked}
                  className={`w-full px-5 py-3 rounded-xl text-white font-semibold transition ${
                    tracked
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                  }`}
                >
                  {tracked ? 'Job Tracked' : 'Track This Job'}
                </button>

                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                  >
                    Apply for this Job
                  </a>
                )}

              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}

export default JobDetails
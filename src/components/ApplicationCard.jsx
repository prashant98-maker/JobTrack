import { Link } from 'react-router-dom'

function ApplicationCard({ application, onDelete }) {
  const statusStyles = {
    Applied: 'bg-blue-50 text-blue-600',
    Interview: 'bg-yellow-50 text-yellow-600',
    Selected: 'bg-green-50 text-green-600',
    Rejected: 'bg-red-50 text-red-600',
  }

  const statusClass =
    statusStyles[application.status] ||
    'bg-gray-50 text-gray-600'

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
          {application.company?.charAt(0)?.toUpperCase() || 'J'}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
        >
          {application.status}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {application.jobTitle}
        </h3>

        <p className="mt-2 text-gray-600 font-medium">
          {application.company}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {application.location}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Applied on: {application.applicationDate}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          to={`/applications/edit/${application.id}`}
          className="text-center px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(application.id)}
          className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>

      {application.jobLink && (
        <a
          href={application.jobLink}
          target="_blank"
          rel="noreferrer"
          className="block mt-3 text-center px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
        >
          Open Job →
        </a>
      )}
    </article>
  )
}

export default ApplicationCard
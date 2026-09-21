function StatCard({ title, value }) {
  const cardStyles = {
    'Total Applications': {
      text: 'text-blue-600',
      bar: 'bg-blue-600',
    },
    Applied: {
      text: 'text-indigo-600',
      bar: 'bg-indigo-600',
    },
    Interviews: {
      text: 'text-yellow-600',
      bar: 'bg-yellow-500',
    },
    Selected: {
      text: 'text-green-600',
      bar: 'bg-green-600',
    },
    Rejected: {
      text: 'text-red-600',
      bar: 'bg-red-600',
    },
  }

  const style = cardStyles[title] || {
    text: 'text-gray-600',
    bar: 'bg-gray-600',
  }

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 p-5">
      <div
        className={`absolute left-0 top-0 h-full w-1 ${style.bar}`}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <div
          className={`w-2.5 h-2.5 rounded-full ${style.bar}`}
        />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <h3 className="text-3xl font-bold text-gray-900">
          {value}
        </h3>

        <span
          className={`text-xs font-semibold ${style.text}`}
        >
          Current
        </span>
      </div>

      <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full w-1/2 rounded-full ${style.bar} opacity-70`}
        />
      </div>
    </div>
  )
}

export default StatCard
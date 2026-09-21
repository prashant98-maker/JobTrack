import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem('jobtrack_token')
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup'

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
    }`

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('jobtrack_token')
    localStorage.removeItem('jobtrack_user')
    closeMenu()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          <Link
            to={token ? '/' : '/login'}
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              J
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                JobTrack
              </h1>

              <p className="hidden sm:block text-[10px] text-gray-400 -mt-1">
                Job Application Tracker
              </p>
            </div>
          </Link>

          {!isAuthPage && token && (
            <>
              <div className="hidden md:flex items-center gap-2">
                <NavLink to="/" className={linkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/jobs" className={linkClass}>
                  Find Jobs
                </NavLink>

                <NavLink to="/applications" className={linkClass}>
                  Applications
                </NavLink>

                <Link
                  to="/applications/add"
                  className="ml-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-md transition"
                >
                  + Add Application
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition text-xl"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? '?' : '?'}
              </button>
            </>
          )}
        </div>

        {!isAuthPage && token && menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-2">

              <NavLink
                to="/"
                className={linkClass}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/jobs"
                className={linkClass}
                onClick={closeMenu}
              >
                Find Jobs
              </NavLink>

              <NavLink
                to="/applications"
                className={linkClass}
                onClick={closeMenu}
              >
                Applications
              </NavLink>

              <Link
                to="/applications/add"
                onClick={closeMenu}
                className="mt-2 text-center px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                + Add Application
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 text-center px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-red-50 hover:text-red-600 transition"
              >
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

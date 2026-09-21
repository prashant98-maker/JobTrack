import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import JobDetails from './pages/JobDetails'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/add" element={<AddApplication />} />
        <Route
          path="/applications/edit/:id"
          element={<EditApplication />}
        />
      </Routes>
    </div>
  )
}

export default App
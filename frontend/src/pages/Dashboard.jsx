import { useState } from "react"
import { Menu, X } from "lucide-react" // icons (lucide-react is already in Vite+Tailwind templates)
import {useNavigate} from 'react-router-dom';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 shadow p-4">
          <h2 className="text-xl font-bold mb-6">My Web App</h2>
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/employees')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-200"
            >
              Employees
            </button>
            <button
              onClick={() => navigate('/attendance')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-200"
            >
              Attendance
            </button>
            <button
              onClick={() => navigate('/salary')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-200"
            >
              Salary
            </button>
            <button
              onClick={() => navigate('/advance')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-200"
            >
              Advances
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Employees
              </h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-700">
                Present Today
              </h2>
              <p className="text-3xl font-bold text-green-600 mt-2">98</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-700">
                Pending Salaries
              </h2>
              <p className="text-3xl font-bold text-red-600 mt-2">22</p>
            </div>
          </div>

          {/* Charts / Reports Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow h-64 flex items-center justify-center text-gray-400">
              [Attendance Chart]
            </div>
            <div className="bg-white p-6 rounded-xl shadow h-64 flex items-center justify-center text-gray-400">
              [Salary Report]
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

import {useNavigate} from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Haazri lagao</h1>
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
          <button onClick={ () => {navigate("/login")} } className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 flex-grow">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Manage Attendance & Salaries with Ease
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our app helps factories keep track of employees, attendance, and salary calculations 
            effortlessly with a modern web interface.
          </p>
          <button onClick={ () => {navigate("/signup")} } className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          {/* Placeholder for image/illustration */}
          <div className="w-80 h-60 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl font-semibold">
            [App Image]
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Attendance Tracking</h4>
              <p className="text-gray-600">Easily manage daily attendance records for all employees.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Salary Calculation</h4>
              <p className="text-gray-600">Automated monthly salary generation with deductions & bonuses.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Reports & Analytics</h4>
              <p className="text-gray-600">Generate detailed reports to analyze workforce productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} MyWebApp. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage;
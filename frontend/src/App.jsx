import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import SignUp from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import LandingPage from "./pages/LandingPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Attendance from "./pages/Attendance.jsx"
import Employees from "./pages/Employees.jsx"
import Salary from "./pages/Salary.jsx"
import ViewAttendance from "./pages/ViewAttendance.jsx"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
      </Routes>
    </Router>
  )
}

export default App;

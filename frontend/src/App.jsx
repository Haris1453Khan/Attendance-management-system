import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Attendance from "./pages/Attendance.jsx";
import ViewAttendance from "./pages/ViewAttendance.jsx";
import AddAttendance from "./pages/AddAttendance.jsx";
import Advance from "./pages/Advance.jsx";
import AddAdvance from "./pages/AddAdvance.jsx";
import ViewAdvance from "./pages/ViewAddvance.jsx";
import DeleteAdvance from "./pages/DeleteAdvance.jsx";
import DeleteAttendance from "./pages/DeleteAttendance.jsx";
import CalculateSalary from "./pages/CalculateSalary.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        <Route path="/employees" 
        element={<ProtectedRoute><Employees /></ProtectedRoute>} />
      
        <Route path="/attendance" 
        element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        
        <Route path="/view-attendance" 
        element={<ProtectedRoute><ViewAttendance /></ProtectedRoute>} />
        
        <Route path="/add-attendance" 
        element={<ProtectedRoute><AddAttendance /></ProtectedRoute>} />
        
        <Route path="/delete-attendance" 
        element={<ProtectedRoute><DeleteAttendance /></ProtectedRoute>} />
        
        <Route path="/advance" 
        element={<ProtectedRoute><Advance /></ProtectedRoute>} />
        
        <Route path="/add-advance" 
        element={<ProtectedRoute><AddAdvance /></ProtectedRoute>} />
        
        <Route path="/view-advance" 
        element={<ProtectedRoute><ViewAdvance /></ProtectedRoute>} />
        
        <Route path="/delete-advance" 
        element={<ProtectedRoute><DeleteAdvance /></ProtectedRoute>} />
        
        <Route path="/calculate-salary" 
        element={<ProtectedRoute><CalculateSalary /></ProtectedRoute>} />
      
      </Routes>
    </Router>
  )
}

export default App;

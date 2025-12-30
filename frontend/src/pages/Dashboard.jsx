// File: ./pages/Dashboard.jsx

import { useNavigate } from "react-router-dom";
import {
  Users,
  CalendarCheck,
  DollarSign,
  Wallet,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Handles user logout
  const handleLogout = () => {
    // 1. Remove the token from local storage to end the session
    localStorage.removeItem("token");
    // 2. Redirect the user to the login page
    navigate("/login");
  };

  // Array to hold navigation button data for easy mapping
  const navItems = [
    {
      label: "Employees",
      path: "/employees",
      icon: <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />,
      description: "Manage employee details, add new hires, and update records.",
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: <CalendarCheck className="h-12 w-12 mx-auto mb-4 text-blue-600" />,
      description: "Mark daily attendance, view monthly reports, and manage leaves.",
    },
    {
      label: "Salary",
      path: "/calculate-salary",
      icon: <DollarSign className="h-12 w-12 mx-auto mb-4 text-blue-600" />,
      description: "Calculate monthly salaries and view payment history.",
    },
    {
      label: "Advances",
      path: "/advance",
      icon: <Wallet className="h-12 w-12 mx-auto mb-4 text-blue-600" />,
      description: "Track and manage salary advances given to employees.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md py-4 px-6 md:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Haazri lagao
        </h1>
        <div className="flex items-center gap-4">
          {/* <span className="hidden sm:block text-gray-700 font-medium">
            Welcome
          </span> */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area with Navigation Buttons */}
      <main className="p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
            Dashboard
          </h2>
          {/* Responsive Grid for Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {item.icon}
                <h3 className="text-xl font-bold text-gray-800">
                  {item.label}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
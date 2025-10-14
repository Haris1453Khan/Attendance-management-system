import { useState } from "react";
import AddAttendance from "./AddAttendance.jsx";
import ViewAttendance from "./ViewAttendance.jsx";

export default function Attendance() {
  const [activePage, setActivePage] = useState("main"); // main | add | view

  if (activePage === "add") {
    return <AddAttendance  onBack={() => setActivePage("main")}/>;
  }

  if (activePage === "view") {
    return <ViewAttendance  onBack={() => setActivePage("main")}/>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Attendance Management
        </h1>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            onClick={() => setActivePage("view")}
          >
            View Attendance
          </button>

          <button
            className="w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200 cursor-pointer"
            onClick={() => setActivePage("add")}
          >
            Add Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

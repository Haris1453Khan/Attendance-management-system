import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios.js";

export default function ViewAttendance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    month: "",
    empName: "",
  });

  const [attendance, setAttendance] = useState([]);

  // ✅ Correct API Request for GET with params
  const handleSearch = async () => {
    try {
      const { data } = await API.get("/attendance", { params: formData });
      setAttendance(data);
      alert("Attendance fetched successfully!");
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching attendance", error);
      alert(error.response?.data?.message || "Failed while fetching attendance.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Attendance Records
        </h1>

        {/* Filter Section */}
        <div className="w-full bg-gray-50 p-4 rounded-xl shadow-inner flex flex-col md:flex-row gap-4">
          {/* Month */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">Select Month:</label>
            <input
              type="month"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">Employee Name:</label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={formData.empName}
              onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end w-full md:w-1/3">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Search
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Time In</th>
                <th className="px-4 py-2 text-left">Time Out</th>
                <th className="px-4 py-2 text-left">Bonus</th>
                <th className="px-4 py-2 text-left">Stitches</th>
                <th className="px-4 py-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((attend, index) => (
                  <tr key={attend._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{attend.name}</td>
                    <td className="px-4 py-2">{new Date(attend.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{attend.status}</td>
                    <td className="px-4 py-2">{attend.timeIn}</td>
                    <td className="px-4 py-2">{attend.timeOut}</td>
                    <td className="px-4 py-2">{attend.bonus}</td>
                    <td className="px-4 py-2">{attend.stitches}</td>
                    <td className="px-4 py-2">{attend.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/attendance")}
          className="text-blue-600 underline text-sm hover:text-blue-800 mt-2 self-start"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

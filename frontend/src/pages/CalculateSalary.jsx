import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios.js";

export default function CalculateSalary() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    month: "",
    name: "",
  });

  const [salaryData, setSalaryData] = useState(null);

  const calculateSalary = async () => {
    try {
      const { data } = await API.post("/salary", formData);
      const salary = data.salary || data;
      setSalaryData(salary);
      if (data.message) {
        alert(data.message);
      } else {
        alert("Salary Calculated successfully!");
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Error calculating salary",
        error,
      );
      alert(
        error.response?.data?.message || "Failed while calculating salary.",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Calculate Salary
        </h1>

        {/* Filter Section */}
        <div className="w-full bg-gray-50 p-4 rounded-xl shadow-inner flex flex-col md:flex-row gap-4">
          {/* Month */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">
              Select Month:
            </label>
            <input
              type="month"
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-gray-700 font-medium mb-1">
              Employee Name:
            </label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Calculate Button */}
          <div className="flex items-end w-full md:w-1/3">
            <button
              onClick={calculateSalary}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-left">Present</th>
                <th className="px-4 py-2 text-left">Absent</th>
                <th className="px-4 py-2 text-left">Half Day</th>
                <th className="px-4 py-2 text-left">Extra Day</th>
                <th className="px-4 py-2 text-left">Bonus</th>
                <th className="px-4 py-2 text-left">Advance</th>
                <th className="px-4 py-2 text-left">Salary</th>
              </tr>
            </thead>
            <tbody>
              {salaryData ? (
                <tr key={salaryData._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{formData.name}</td>
                  <td className="px-4 py-2">
                    {Number.isFinite(Number(salaryData.month))
                      ? Number(salaryData.month) + 1
                      : "-"}
                  </td>
                  <td className="px-4 py-2">{salaryData.year}</td>
                  <td className="px-4 py-2">{salaryData.presentDays}</td>
                  <td className="px-4 py-2">{salaryData.absentDays}</td>
                  <td className="px-4 py-2">{salaryData.halfDays}</td>
                  <td className="px-4 py-2">{salaryData.extraDays}</td>
                  <td className="px-4 py-2">{salaryData.bonuses}</td>
                  <td className="px-4 py-2">{salaryData.advances}</td>
                  <td className="px-4 py-2">{salaryData.netSalary}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No calculations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 underline text-sm hover:text-blue-800 mt-2 self-start"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

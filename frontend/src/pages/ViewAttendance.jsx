import {useNavigate} from "react-router-dom";

export default function ViewAttendance() {

  const navigate = useNavigate();

  // Example static data (replace with real data later)
  const attendanceData = [
    { id: 1, name: "Ali Khan", date: "2025-08-30", status: "Present" },
    { id: 2, name: "Sara Ahmed", date: "2025-08-30", status: "Absent" },
    { id: 3, name: "Usman Ali", date: "2025-08-30", status: "Leave" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl flex flex-col gap-6 justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Attendance Records
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{record.id}</td>
                  <td className="px-4 py-2">{record.name}</td>
                  <td className="px-4 py-2">{record.date}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      record.status === "Present"
                        ? "text-green-600"
                        : record.status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                <button
                onClick={() => navigate("/attendance")}
                className="text-blue-600 underline text-sm hover:text-blue-800 cursor-pointer"
                >
                ← Back
                </button>
      </div>
    </div>
  );
}

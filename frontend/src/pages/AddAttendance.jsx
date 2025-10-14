export default function AddAttendance({ onBack }) {
  return (
    <div className="bg-gray-100 min-h-screen p-8 justify-center items-center flex">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Attendance Sheet</h1>
          <div className="flex items-center space-x-2 text-gray-500">
            <span className="font-medium">Date:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Employees</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
                <th scope="col" className="px-6 py-3 text-center">Time In</th>
                <th scope="col" className="px-6 py-3 text-center">Time Out</th>
                <th scope="col" className="px-6 py-3 text-center">Bonus</th>
                <th scope="col" className="px-6 py-3 text-center">Stitches</th>
                <th scope="col" className="px-6 py-3 text-center">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Alice Johnson
                </th>
                <td className="px-6 py-4 text-center">
                  <select className="text-blue-600 rounded-md focus:ring-blue-500">
                    <option value="present" selected>Present</option>
                    <option value="absent" className="text-red-500">Absent</option>
                    <option value="half_day">Half Day</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="time" className="p-1 border rounded-md focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="time" className="p-1 border rounded-md focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="number" className="p-1 border rounded-md focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="number" className="p-1 border rounded-md focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="text" className="p-1 border rounded-md focus:ring-blue-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center mt-6 gap-3">
          <input
            type="submit"
            value="Add"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          />
          <button
            onClick={onBack}
            className="text-blue-600 underline text-sm hover:text-blue-800 cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

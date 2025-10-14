export default function Salary() {
  const salaries = [
    { id: 1, name: "Ali Khan", daysWorked: 25, rate: 1000 },
    { id: 2, name: "Sara Ahmed", daysWorked: 28, rate: 1500 },
    { id: 3, name: "Usman Malik", daysWorked: 20, rate: 900 },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Salary Management</h1>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Employee</th>
            <th className="py-3 px-4">Days Worked</th>
            <th className="py-3 px-4">Rate (PKR)</th>
            <th className="py-3 px-4">Total Salary</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="py-3 px-4">{emp.id}</td>
              <td className="py-3 px-4">{emp.name}</td>
              <td className="py-3 px-4">{emp.daysWorked}</td>
              <td className="py-3 px-4">{emp.rate}</td>
              <td className="py-3 px-4 font-semibold text-blue-600">
                {emp.daysWorked * emp.rate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

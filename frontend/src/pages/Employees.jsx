export default function Employees() {
  const employees = [
    { id: 1, name: "Ali Khan", role: "Worker", status: "Active" },
    { id: 2, name: "Sara Ahmed", role: "Supervisor", status: "Active" },
    { id: 3, name: "Usman Malik", role: "Worker", status: "Inactive" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employees</h1>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="py-3 px-4">{emp.id}</td>
              <td className="py-3 px-4">{emp.name}</td>
              <td className="py-3 px-4">{emp.role}</td>
              <td className="py-3 px-4">{emp.status}</td>
              <td className="py-3 px-4 space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { useEffect, useState } from "react";
import API from "../api/axios.js";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    baseSalary: "",
    joinDate: "",
    isActive: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Fetch Employees
  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/employees");
      setEmployees(data);
    } catch (err) {
      console.error("Fetch employees error:", err);
      alert(err.response?.data?.message || "Failed to fetch employees");
    }
  };

  // ✅ Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const {data} = await API.put(`/employees/${editId}`, formData);
        alert(data.message || "Employee updated successfully");
      } else {
        const {data} = await API.post("/employees/", formData);
        alert(data.message || "Employee added successfully");
      }

      setFormData({ name: "", phone: "", baseSalary: "" , joinDate: "" , isActive: ""});
      setIsEditing(false);
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  // ✅ Delete Employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      
      setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee._id !== id)
      );
      
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  // ✅ Start Editing
  const handleEdit = (employee) => {
    const formattedDate = new Date(employee.joinDate).toISOString().split('T')[0];
    setIsEditing(true);
    setEditId(employee._id);
    setFormData({
      name: employee.name,
      phone: employee.phone,
      baseSalary: employee.baseSalary,
      joinDate: formattedDate,
      isActive: employee.isActive
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Employee Management
        </h1>

        {/* Add / Update Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="phone"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="date"
            placeholder="Join date"
            name="joinDate"
            value={formData.joinDate}
            onChange={(e) =>
              setFormData({ ...formData, joinDate: e.target.value })
            }
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Base Salary"
            name="baseSalary"
            value={formData.baseSalary}
            onChange={(e) =>
              setFormData({ ...formData, baseSalary: e.target.value })
            }
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="isActive"
            value={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.value })
            }
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {/* Optional: A disabled default option */}
            <option value="" disabled>Select Status</option>
            
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button
            type="submit"
            className={`sm:col-span-2 py-3 font-semibold text-white rounded-xl transition duration-200 shadow-md ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
        </form>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Join Date</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">isActive</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4">{emp.phone}</td>
                  <td className="px-6 py-4">{new Date(emp.joinDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{emp.baseSalary}</td>
                  <td className="px-6 py-4">{emp.isActive === true || emp.isActive === "true" ? "✅" : "❌"}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

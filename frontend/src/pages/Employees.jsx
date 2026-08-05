import { useEffect, useState } from "react";
import API from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import { Edit2, Trash2, Search, UserPlus, Users, Calendar, Phone, DollarSign } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input, { Select } from "../components/ui/Input.jsx";
import Badge from "../components/ui/Badge.jsx";

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
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/employees");
      setEmployees(data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch employees");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/employees/${editId}`, formData);
        alert("Employee updated successfully");
      } else {
        await API.post("/employees/", formData);
        alert("Employee added successfully");
      }
      setFormData({
        name: "",
        phone: "",
        baseSalary: "",
        joinDate: "",
        isActive: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/employees/${id}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  const handleEdit = (employee) => {
    const formattedDate = new Date(employee.joinDate)
      .toISOString()
      .split("T")[0];
    setIsEditing(true);
    setEditId(employee._id);
    setFormData({
      name: employee.name,
      phone: employee.phone,
      baseSalary: employee.baseSalary,
      joinDate: formattedDate,
      isActive: String(employee.isActive),
    });
  };

  const filteredEmployees = employees
    .filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate));

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Layout title="Employee Directory">
      <div className="space-y-8">
        {/* Add/Edit Employee Form Card */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white shadow-clay-button">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#332F3A]">
              {isEditing ? "Edit Employee Profile" : "Register New Employee"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Input
              label="Name"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Phone"
              icon={Phone}
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <Input
              label="Join Date"
              icon={Calendar}
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              required
            />

            <Input
              label="Base Salary (₹)"
              icon={DollarSign}
              type="number"
              placeholder="Monthly base salary"
              value={formData.baseSalary}
              onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
              required
            />

            <Select
              label="Status"
              value={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.value })}
              required
            >
              <option value="">Select Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>

            <div className="flex items-end">
              <Button
                type="submit"
                variant={isEditing ? "success" : "primary"}
                className="w-full"
              >
                {isEditing ? "Update Profile" : "Add Employee"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Employee Directory Data Table */}
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#2563EB] flex items-center justify-center text-white shadow-clay-button">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-[#332F3A]">
                  Registered Team
                </h3>
                <p className="text-xs font-semibold text-[#635F69]">
                  {employees.length} total employees recorded
                </p>
              </div>
            </div>

            <div className="w-full sm:w-72">
              <Input
                icon={Search}
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-[#EFEBF5]/60 p-1 shadow-clay-pressed">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#332F3A]/10 text-xs font-black uppercase tracking-wider text-[#635F69] font-heading">
                  <th className="py-4 px-5">Employee</th>
                  <th className="py-4 px-5">Phone</th>
                  <th className="py-4 px-5">Joined</th>
                  <th className="py-4 px-5">Base Salary</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332F3A]/5 text-sm font-medium text-[#332F3A]">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-[#635F69] font-medium">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr
                      key={emp._id}
                      className="hover:bg-white/80 transition-colors duration-150 rounded-xl"
                    >
                      <td className="py-4 px-5 font-bold font-heading text-[#332F3A]">
                        {emp.name}
                      </td>
                      <td className="py-4 px-5 text-[#635F69]">{emp.phone}</td>
                      <td className="py-4 px-5 text-[#635F69]">
                        {new Date(emp.joinDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-5 font-bold text-[#7C3AED]">
                        ₹{emp.baseSalary}
                      </td>
                      <td className="py-4 px-5">
                        {emp.isActive === true || emp.isActive === "true" ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="danger">Inactive</Badge>
                        )}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="p-2 rounded-xl bg-white text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition shadow-clay-sm"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(emp._id)}
                            className="p-2 rounded-xl bg-white text-red-500 hover:bg-red-500 hover:text-white transition shadow-clay-sm"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

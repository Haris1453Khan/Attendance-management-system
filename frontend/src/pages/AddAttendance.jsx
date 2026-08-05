import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { CalendarCheck, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AddAttendance() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [attendanceData, setAttendanceData] = useState([]);
  const [fdate, setFdate] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fdate) {
      showToast("Please select a date.", "error");
      return;
    }
    const payload = {
      date: fdate,
      records: attendanceData,
    };

    try {
      await API.post("/attendance", payload);
      showToast("Attendance added successfully!", "success");
      navigate("/attendance");
    } catch (error) {
      console.error("Failed while adding attendance.", error);
      showToast(error.response?.data?.message || "Failed to add attendance.", "error");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await API.get("/employees");
        setEmployees(data);
        const initialAttendance = data.map((emp) => ({
          employeeId: emp._id,
          status: "P",
          timeIn: "",
          timeOut: "",
          bonus: 0,
          stitches: 0,
          note: "",
        }));
        setAttendanceData(initialAttendance);
      } catch (error) {
        console.error("Fetch employees error:", error);
        showToast(error.response?.data?.message || "Failed to fetch employees", "error");
      }
    };
    fetchEmployees();
  }, []);

  const handleInputChange = (index, event) => {
    const newAttendanceData = [...attendanceData];
    newAttendanceData[index][event.target.name] = event.target.value;
    setAttendanceData(newAttendanceData);
  };

  return (
    <Layout title="Mark Daily Attendance">
      <div className="space-y-6">
        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#332F3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white shadow-clay-button">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-[#332F3A]">
                    Daily Attendance Sheet
                  </h3>
                  <p className="text-xs font-semibold text-[#635F69]">
                    Select date & enter records for all employees
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-64">
                <Input
                  label="Attendance Date"
                  type="date"
                  value={fdate}
                  onChange={(e) => setFdate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Attendance Sheet Data Table */}
            <div className="overflow-x-auto rounded-2xl bg-[#EFEBF5]/60 p-2 shadow-clay-pressed">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#332F3A]/10 text-xs font-black uppercase tracking-wider text-[#635F69] font-heading">
                    <th className="py-4 px-4">Employee</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-center">Time In</th>
                    <th className="py-4 px-4 text-center">Time Out</th>
                    <th className="py-4 px-4 text-center">Bonus (₹)</th>
                    <th className="py-4 px-4 text-center">Stitches</th>
                    <th className="py-4 px-4 text-center">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#332F3A]/5 text-sm font-medium text-[#332F3A]">
                  {employees.map((emp, index) => (
                    <tr key={emp._id} className="hover:bg-white/80 transition-colors">
                      <td className="py-4 px-4 font-bold font-heading text-[#332F3A]">
                        {emp.name}
                      </td>
                      <td className="py-4 px-4 text-center min-w-[130px]">
                        <select
                          required
                          name="status"
                          value={attendanceData[index]?.status || "P"}
                          onChange={(e) => handleInputChange(index, e)}
                          className="w-full h-11 bg-white text-[#332F3A] font-bold text-xs rounded-xl shadow-clay-sm border border-white px-3 transition outline-none cursor-pointer focus:ring-2 focus:ring-[#7C3AED]"
                        >
                          <option value="P" className="text-emerald-600">Present (P)</option>
                          <option value="A" className="text-red-500">Absent (A)</option>
                          <option value="HD" className="text-amber-600">Half Day (HD)</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="time"
                          name="timeIn"
                          value={attendanceData[index]?.timeIn || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          className="h-11 px-3 bg-white text-[#332F3A] font-medium text-xs rounded-xl shadow-clay-sm border border-white outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="time"
                          name="timeOut"
                          value={attendanceData[index]?.timeOut || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          className="h-11 px-3 bg-white text-[#332F3A] font-medium text-xs rounded-xl shadow-clay-sm border border-white outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          name="bonus"
                          value={attendanceData[index]?.bonus || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="0"
                          className="w-24 h-11 px-3 bg-white text-[#332F3A] font-medium text-xs rounded-xl shadow-clay-sm border border-white outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          name="stitches"
                          value={attendanceData[index]?.stitches || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="0"
                          className="w-24 h-11 px-3 bg-white text-[#332F3A] font-medium text-xs rounded-xl shadow-clay-sm border border-white outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="text"
                          name="note"
                          value={attendanceData[index]?.note || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Note..."
                          className="w-32 h-11 px-3 bg-white text-[#332F3A] font-medium text-xs rounded-xl shadow-clay-sm border border-white outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#332F3A]/10">
              <Button
                variant="secondary"
                onClick={() => navigate("/attendance")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Actions
              </Button>

              <Button type="submit" variant="primary" size="lg" className="gap-2">
                <CheckCircle2 className="w-5 h-5" /> Submit Attendance Sheet
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

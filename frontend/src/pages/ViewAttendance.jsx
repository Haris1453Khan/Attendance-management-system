import { useState } from "react";
import API from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Badge from "../components/ui/Badge.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { Printer, Search, Calendar, User } from "lucide-react";

export default function ViewAttendance() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({ month: "", empName: "" });
  const [attendance, setAttendance] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await API.get("/attendance", { params: formData });
      const records = Array.isArray(data) ? data : (data.records || []);
      const sortedRecords = [...records].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setAttendance(sortedRecords);
      showToast(`Found ${sortedRecords.length} attendance records`, "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to fetch attendance", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const getStatusBadge = (status) => {
    if (status === "P") return <Badge variant="success">Present</Badge>;
    if (status === "A") return <Badge variant="danger">Absent</Badge>;
    if (status === "HD") return <Badge variant="warning">Half Day</Badge>;
    return <Badge variant="gray">{status}</Badge>;
  };

  return (
    <Layout title="View Attendance History">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="space-y-6">
        {/* Search Filters Card */}
        <Card className="p-6 sm:p-8 no-print">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#2563EB] flex items-center justify-center text-white shadow-clay-button">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#332F3A]">
              Filter Attendance Logs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              label="Select Month"
              icon={Calendar}
              type="month"
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
              required
            />

            <Input
              label="Employee Name"
              icon={User}
              type="text"
              placeholder="Filter by name..."
              value={formData.empName}
              onChange={(e) =>
                setFormData({ ...formData, empName: e.target.value })
              }
              required
            />

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                variant="primary"
                className="w-full gap-2"
              >
                <Search className="w-5 h-5" /> Search Logs
              </Button>
            </div>
          </div>
        </Card>

        {/* Print Action Bar */}
        {attendance.length > 0 && (
          <div className="flex justify-end no-print">
            <Button
              onClick={() => window.print()}
              variant="success"
              className="gap-2"
            >
              <Printer className="w-5 h-5" /> Print Sheet
            </Button>
          </div>
        )}

        {/* Printable Data Card */}
        <Card className="print-area p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#332F3A]/10">
            <h3 className="text-xl font-bold font-heading text-[#332F3A]">
              Attendance Records ({attendance.length})
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-[#EFEBF5]/60 p-1 shadow-clay-pressed">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#332F3A]/10 text-xs font-black uppercase tracking-wider text-[#635F69] font-heading">
                  <th className="py-4 px-4">#</th>
                  <th className="py-4 px-4">Employee</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Time In</th>
                  <th className="py-4 px-4">Time Out</th>
                  <th className="py-4 px-4">Bonus</th>
                  <th className="py-4 px-4">Stitches</th>
                  <th className="py-4 px-4">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332F3A]/5 text-sm font-medium text-[#332F3A]">
                {attendance.length > 0 ? (
                  attendance.map((attend, index) => (
                    <tr
                      key={attend._id}
                      className="hover:bg-white/80 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-[#635F69]">
                        {index + 1}
                      </td>
                      <td className="py-4 px-4 font-bold font-heading text-[#332F3A]">
                        {attend.name}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {formatDate(attend.date)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(attend.status)}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {attend.timeIn || "-"}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {attend.timeOut || "-"}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#10B981]">
                        ₹{attend.bonus || 0}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {attend.stitches || 0}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {attend.note || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-8 text-[#635F69] font-medium"
                    >
                      No attendance records found. Use the filters above to search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

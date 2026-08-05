import { useState } from "react";
import API from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Badge from "../components/ui/Badge.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { Printer, Calculator, Calendar, User, DollarSign } from "lucide-react";

export default function CalculateSalary() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({ month: "", name: "" });
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateSalary = async () => {
    if (!formData.month || !formData.name) {
      showToast("Please select a month and enter an employee name.", "error");
      return;
    }
    try {
      setLoading(true);
      const { data } = await API.post("/salary", formData);
      setSalaryData(data.salary || data);
      showToast("Salary calculated successfully!", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to calculate salary", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Payroll & Salary Calculator">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="space-y-6">
        {/* Calculation Control Form Card */}
        <Card className="p-6 sm:p-8 no-print">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center text-white shadow-clay-button">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#332F3A]">
              Monthly Payroll Engine
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
              placeholder="Enter employee name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <div className="flex items-end">
              <Button
                onClick={calculateSalary}
                variant="primary"
                disabled={loading}
                className="w-full gap-2"
              >
                <Calculator className="w-5 h-5" />{" "}
                {loading ? "Calculating..." : "Compute Salary"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Print Action Bar */}
        {salaryData && (
          <div className="flex justify-end no-print">
            <Button
              onClick={() => window.print()}
              variant="success"
              className="gap-2"
            >
              <Printer className="w-5 h-5" /> Print Payslip
            </Button>
          </div>
        )}

        {/* Salary Result Breakdown Card */}
        <Card className="print-area p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white shadow-clay-button">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#332F3A]">
                Salary Breakdown
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-[#EFEBF5]/60 p-1 shadow-clay-pressed">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#332F3A]/10 text-xs font-black uppercase tracking-wider text-[#635F69] font-heading">
                  <th className="py-4 px-4">Employee</th>
                  <th className="py-4 px-4">Month</th>
                  <th className="py-4 px-4">Year</th>
                  <th className="py-4 px-4">Present</th>
                  <th className="py-4 px-4">Absent</th>
                  <th className="py-4 px-4">Half Day</th>
                  <th className="py-4 px-4">Extra Day</th>
                  <th className="py-4 px-4">Bonus</th>
                  <th className="py-4 px-4">Advance</th>
                  <th className="py-4 px-4">Net Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332F3A]/5 text-sm font-medium text-[#332F3A]">
                {salaryData ? (
                  <tr className="hover:bg-white/80 transition-colors">
                    <td className="py-4 px-4 font-bold font-heading text-[#332F3A]">
                      {formData.name}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#7C3AED]">
                      {Number(salaryData.month) + 1}
                    </td>
                    <td className="py-4 px-4 text-[#635F69]">
                      {salaryData.year}
                    </td>
                    <td className="py-4 px-4 font-semibold text-emerald-600">
                      {salaryData.presentDays}
                    </td>
                    <td className="py-4 px-4 font-semibold text-red-500">
                      {salaryData.absentDays}
                    </td>
                    <td className="py-4 px-4 font-semibold text-amber-600">
                      {salaryData.halfDays}
                    </td>
                    <td className="py-4 px-4 text-[#635F69]">
                      {salaryData.extraDays}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#10B981]">
                      ₹{salaryData.bonuses}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#F59E0B]">
                      ₹{salaryData.advances}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="success" className="text-sm py-1.5 px-4 font-black">
                        ₹{salaryData.netSalary}
                      </Badge>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center py-8 text-[#635F69] font-medium"
                    >
                      No salary calculation yet. Select a month & employee above to compute.
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

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { Search, Calendar, User, ArrowLeft } from "lucide-react";

export default function ViewAdvance() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    month: "",
    name: "",
  });
  const [advance, setAdvance] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await API.get("/advance", { params: formData });
      const records = Array.isArray(data) ? data : (data.advances || []);
      const sortedRecords = [...records].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setAdvance(sortedRecords);
      showToast(`Found ${sortedRecords.length} advance records`, "success");
    } catch (error) {
      console.error("Error fetching advance", error);
      showToast(error.response?.data?.message || "Failed while fetching advance.", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Layout title="Advance Records History">
      <div className="space-y-6">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white shadow-clay-button">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#332F3A]">
              Search Salary Advance History
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              label="Select Month"
              icon={Calendar}
              type="month"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              required
            />

            <Input
              label="Employee Name"
              icon={User}
              type="text"
              placeholder="Filter by name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                variant="primary"
                className="w-full gap-2"
              >
                <Search className="w-5 h-5" /> Search Payouts
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#332F3A]/10">
            <h3 className="text-xl font-bold font-heading text-[#332F3A]">
              Advance Payout Logs ({advance.length})
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-[#EFEBF5]/60 p-1 shadow-clay-pressed">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#332F3A]/10 text-xs font-black uppercase tracking-wider text-[#635F69] font-heading">
                  <th className="py-4 px-4">#</th>
                  <th className="py-4 px-4">Employee</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Advance Amount</th>
                  <th className="py-4 px-4">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332F3A]/5 text-sm font-medium text-[#332F3A]">
                {advance.length > 0 ? (
                  advance.map((adv, index) => (
                    <tr key={adv._id} className="hover:bg-white/80 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#635F69]">
                        {index + 1}
                      </td>
                      <td className="py-4 px-4 font-bold font-heading text-[#332F3A]">
                        {formData.name || adv.name}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {formatDate(adv.date)}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#F59E0B]">
                        ₹{adv.amount}
                      </td>
                      <td className="py-4 px-4 text-[#635F69]">
                        {adv.note || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-[#635F69] font-medium">
                      No advance records found. Select month & employee name to search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 flex justify-start">
            <Button
              variant="secondary"
              onClick={() => navigate("/advance")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Actions
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
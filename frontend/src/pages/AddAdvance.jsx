import { useState } from "react";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { Wallet, Calendar, User, DollarSign, ArrowLeft } from "lucide-react";

export default function AddAdvance() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    amount: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name || !formData.amount) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    try {
      setLoading(true);
      await API.post("/advance", formData);
      showToast("Advance added successfully.", "success");
      setFormData({ date: "", name: "", amount: "", note: "" });
      navigate("/advance");
    } catch (error) {
      console.error("Failed to add advance.", error);
      showToast(error.response?.data?.message || "Failed to add advance", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Issue Salary Advance">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center text-white shadow-clay-button">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-[#332F3A]">
                Record New Advance Payment
              </h3>
              <p className="text-xs font-semibold text-[#635F69]">
                Log an advance issued to an employee to deduct from monthly payroll
              </p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Date Issued"
                icon={Calendar}
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />

              <Input
                label="Employee Name"
                icon={User}
                type="text"
                placeholder="Full employee name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Advance Amount (₹)"
                icon={DollarSign}
                type="number"
                placeholder="Amount in INR"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />

              <Input
                label="Note (Optional)"
                type="text"
                placeholder="Reason or reference..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#332F3A]/10">
              <Button
                variant="secondary"
                onClick={() => navigate("/advance")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Actions
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
              >
                {loading ? "Recording..." : "Record Advance"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

import { useState } from "react";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Trash2, Calendar, User, ArrowLeft } from "lucide-react";

export default function DeleteAdvance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name) {
      alert("Please fill in both Date and Employee Name.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this advance record?")) {
      return;
    }

    try {
      setLoading(true);
      await API.delete("/advance", { params: formData });
      alert("Advance deleted successfully.");
      setFormData({ date: "", name: "" });
    } catch (error) {
      console.error("Failed to delete advance.", error);
      alert(error.response?.data?.message || "Failed to delete advance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Delete Advance Log">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#EF4444] flex items-center justify-center text-white shadow-clay-button">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-[#332F3A]">
                Erase Advance Record
              </h3>
              <p className="text-xs font-semibold text-[#635F69]">
                Provide date and employee name to delete advance log
              </p>
            </div>
          </div>

          <form onSubmit={handleDelete} className="space-y-6">
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
              placeholder="Enter exact employee name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

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
                variant="danger"
                size="lg"
                disabled={loading}
                className="gap-2"
              >
                <Trash2 className="w-5 h-5" /> {loading ? "Deleting..." : "Delete Entry"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

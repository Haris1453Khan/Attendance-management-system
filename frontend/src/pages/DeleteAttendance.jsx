import { useState } from "react";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { Trash2, Calendar, User, ArrowLeft } from "lucide-react";

export default function DeleteAttendance() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    date: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name) {
      showToast("Please fill in both Date and Employee Name.", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this attendance record?")) {
      return;
    }
    try {
      setLoading(true);
      await API.delete("/attendance", { params: formData });
      showToast("Attendance deleted successfully.", "success");
      setFormData({ date: "", name: "" });
    } catch (error) {
      console.error("Failed to delete attendance.", error);
      showToast(error.response?.data?.message || "Failed to delete attendance", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Delete Attendance Entry">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#332F3A]/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#EF4444] flex items-center justify-center text-white shadow-clay-button">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-[#332F3A]">
                Remove Attendance Log
              </h3>
              <p className="text-xs font-semibold text-[#635F69]">
                Specify date and employee name to erase record
              </p>
            </div>
          </div>

          <form onSubmit={handleDelete} className="space-y-6">
            <Input
              label="Select Date"
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
                onClick={() => navigate("/attendance")}
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

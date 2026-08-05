import { useState } from "react";
import API, { setAccessToken } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Shield, ArrowRight, Sparkles } from "lucide-react";
import BlobBackground from "../components/ui/BlobBackground";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input, { Select } from "../components/ui/Input";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/user/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setAccessToken(data.token);
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1FA] text-[#332F3A] px-4 py-12 relative overflow-hidden">
      <BlobBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clay-button mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black font-heading tracking-tight text-[#332F3A]">
            Create Account
          </h1>
          <p className="text-[#635F69] font-medium text-base mt-1">
            Join Haazri Lagao to manage your team
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              icon={User}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />

            <Input
              label="Email"
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              icon={Lock}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Input
              label="Confirm Password"
              icon={Lock}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-[#332F3A]/10">
            <p className="text-[#635F69] text-sm font-medium">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#7C3AED] font-bold font-heading hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-[#635F69] hover:text-[#332F3A] text-sm font-bold font-heading transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

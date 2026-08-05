import API, { setAccessToken } from "../api/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowRight, Sparkles } from "lucide-react";
import BlobBackground from "../components/ui/BlobBackground.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import { useToast } from "../components/ui/Toast.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/user/login", { username, password });
      setAccessToken(data.token);
      showToast("Login successful! Welcome back.", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1FA] text-[#332F3A] px-4 relative overflow-hidden">
      <BlobBackground />

      <div className="w-full max-w-md relative z-10 my-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clay-button mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black font-heading tracking-tight text-[#332F3A]">
            Welcome Back
          </h1>
          <p className="text-[#635F69] font-medium text-base mt-1">
            Sign in to access your Haazri dashboard
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              icon={User}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />

            <Input
              label="Password"
              icon={Lock}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-[#332F3A]/10">
            <p className="text-[#635F69] text-sm font-medium">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#7C3AED] font-bold font-heading hover:underline"
              >
                Sign Up
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

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import BlobBackground from "../components/ui/BlobBackground.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing from the link.");
      return;
    }

    const verify = async () => {
      try {
        const { data } = await API.get("/user/verify-email", {
          params: { token },
        });
        setStatus("success");
        setMessage(data.message || "Email verified successfully!");
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Verification link is invalid or has expired."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1FA] text-[#332F3A] px-4 py-12 relative overflow-hidden">
      <BlobBackground />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clay-button mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black font-heading tracking-tight text-[#332F3A]">
            Email Verification
          </h1>
        </div>

        <Card className="p-8 sm:p-10 text-center">
          {status === "loading" && (
            <div className="space-y-6 py-6">
              <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center mx-auto animate-spin">
                <Loader2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-[#332F3A]">
                Verifying Account...
              </h3>
              <p className="text-[#635F69] font-medium text-base">
                Please wait while we validate your email verification link.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6 py-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#34D399] to-[#10B981] text-white flex items-center justify-center mx-auto shadow-clay-button animate-clay-breathe">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black font-heading text-[#332F3A]">
                  Email Verified!
                </h3>
                <p className="text-[#635F69] font-medium text-base max-w-sm mx-auto">
                  {message}
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => navigate("/login")}
                  variant="primary"
                  size="lg"
                  className="w-full gap-2"
                >
                  Proceed to Login <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-6 py-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F87171] to-[#EF4444] text-white flex items-center justify-center mx-auto shadow-clay-button">
                <XCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black font-heading text-[#332F3A]">
                  Verification Failed
                </h3>
                <p className="text-red-500 font-bold text-base max-w-sm mx-auto">
                  {message}
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => navigate("/signup")}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Back to Sign Up
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

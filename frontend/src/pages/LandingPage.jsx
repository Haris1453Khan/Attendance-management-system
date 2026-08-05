import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import BlobBackground from "../components/ui/BlobBackground";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F1FA] text-[#332F3A] flex flex-col relative overflow-hidden">
      <BlobBackground />

      {/* Floating Glass Clay Header */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 z-20">
        <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-clay-card px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white shadow-clay-button">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black font-heading tracking-tight text-[#332F3A]">
              Haazri Lagao
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white/80 shadow-clay-sm text-xs font-bold font-heading text-[#7C3AED]">
                <Zap className="w-4 h-4 text-[#F59E0B]" />
                Next-Gen Claymorphic Payroll & HR Suite
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black font-heading text-[#332F3A] leading-[1.1] tracking-tight">
                Effortless{" "}
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#DB2777] to-[#0EA5E9] bg-clip-text text-transparent">
                  Attendance & Payroll
                </span>{" "}
                for Modern Workplaces.
              </h2>

              <p className="text-lg sm:text-xl text-[#635F69] font-medium leading-relaxed max-w-2xl">
                Track daily employee attendance, automate salary calculations, and manage advance payments seamlessly with a tactile, soft-touch interface.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto"
                >
                  Get Started Free <ArrowRight className="w-5 h-5 ml-1" />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto"
                >
                  Explore Dashboard
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-bold text-[#635F69] font-heading">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Enterprise Ready
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" /> Real-time Reports
                </span>
              </div>
            </div>

            {/* Right Interactive Clay Orbs & Stat Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-6 relative">
              <Card hoverable className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#2563EB] flex items-center justify-center text-white shadow-clay-button mb-4">
                  <Users className="w-7 h-7" />
                </div>
                <p className="text-xs font-bold font-heading uppercase text-[#635F69] tracking-wider">
                  Active Team
                </p>
                <p className="text-3xl font-black font-heading text-[#332F3A] mt-1">
                  150+
                </p>
                <p className="text-xs text-[#10B981] font-semibold mt-2">
                  ↑ 14 added this month
                </p>
              </Card>

              <Card hoverable className="p-6 mt-8 sm:mt-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center text-white shadow-clay-button mb-4">
                  <CalendarCheck className="w-7 h-7" />
                </div>
                <p className="text-xs font-bold font-heading uppercase text-[#635F69] tracking-wider">
                  Attendance
                </p>
                <p className="text-3xl font-black font-heading text-[#332F3A] mt-1">
                  98.5%
                </p>
                <p className="text-xs text-[#7C3AED] font-semibold mt-2">
                  High punctuality
                </p>
              </Card>

              <Card hoverable className="p-6 -mt-4 sm:-mt-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F472B6] to-[#DB2777] flex items-center justify-center text-white shadow-clay-button mb-4">
                  <DollarSign className="w-7 h-7" />
                </div>
                <p className="text-xs font-bold font-heading uppercase text-[#635F69] tracking-wider">
                  Monthly Payroll
                </p>
                <p className="text-3xl font-black font-heading text-[#332F3A] mt-1">
                  ₹5L+
                </p>
                <p className="text-xs text-[#635F69] font-semibold mt-2">
                  Auto calculated
                </p>
              </Card>

              <Card hoverable className="p-6 mt-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white shadow-clay-button mb-4">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <p className="text-xs font-bold font-heading uppercase text-[#635F69] tracking-wider">
                  Productivity
                </p>
                <p className="text-3xl font-black font-heading text-[#332F3A] mt-1">
                  +12%
                </p>
                <p className="text-xs text-[#10B981] font-semibold mt-2">
                  Quarterly increase
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center text-xs font-bold font-heading text-[#635F69]">
          © {new Date().getFullYear()} Haazri Lagao. Tactile High-Fidelity Claymorphism Edition.
        </div>
      </footer>
    </div>
  );
}

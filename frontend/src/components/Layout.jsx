import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API, { clearAccessToken } from "../api/axios.js";
import {
  Users,
  CalendarCheck,
  DollarSign,
  Wallet,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import BlobBackground from "./ui/BlobBackground.jsx";
import Button from "./ui/Button.jsx";

export default function Layout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await API.post("/user/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAccessToken();
      navigate("/login");
    }
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Employees", path: "/employees", icon: Users },
    { label: "Attendance", path: "/attendance", icon: CalendarCheck },
    { label: "Salary", path: "/calculate-salary", icon: DollarSign },
    { label: "Advances", path: "/advance", icon: Wallet },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F4F1FA] text-[#332F3A] flex relative">
      <BlobBackground />

      {/* Sidebar - Desktop Floating Clay Container */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 fixed h-[calc(100vh-2rem)] top-4 left-4 z-30 bg-white/80 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-clay-card p-6 flex-between">
        <div className="space-y-6">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white shadow-clay-button">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-heading text-[#332F3A] leading-tight">
                Haazri Lagao
              </h1>
              <p className="text-xs font-semibold text-[#635F69]">
                Payroll & HR Clay
              </p>
            </div>
          </div>

          <div className="h-px bg-[#332F3A]/10 my-4" />

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[20px] font-heading font-bold text-sm transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-clay-button scale-[1.02]"
                      : "text-[#635F69] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] hover:translate-x-1"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#EFEBF5] text-[#7C3AED]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button at bottom */}
        <div className="mt-auto pt-6 border-t border-[#332F3A]/10">
          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#332F3A]/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-2xl z-50 transform transition-transform duration-300 p-6 flex flex-col justify-between shadow-2xl lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#332F3A]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white shadow-clay-button">
                <Building2 className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold font-heading text-[#332F3A]">
                Haazri Lagao
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-[#EFEBF5] rounded-xl text-[#635F69]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] font-heading font-bold text-sm transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-clay-button"
                      : "text-[#635F69] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#332F3A]/10">
          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Top Header Card */}
        <header className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[28px] shadow-clay-card px-6 py-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 bg-[#EFEBF5] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] rounded-2xl transition shadow-clay-sm text-[#332F3A]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-black font-heading tracking-tight text-[#332F3A]">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#EFEBF5] px-4 py-2 rounded-2xl text-xs font-bold font-heading text-[#635F69] shadow-clay-pressed">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              Active Workspace
            </div>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

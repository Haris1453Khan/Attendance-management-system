import { useNavigate } from "react-router-dom";
import { Users, CalendarCheck, DollarSign, Wallet, ArrowUpRight, Sparkles } from "lucide-react";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Employees",
      path: "/employees",
      icon: Users,
      description: "Manage employee records and profiles",
      gradient: "from-[#60A5FA] to-[#2563EB]",
      badge: "150+ Total",
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
      description: "Mark and view daily attendance records",
      gradient: "from-[#A78BFA] to-[#7C3AED]",
      badge: "98.5% Today",
    },
    {
      label: "Salary",
      path: "/calculate-salary",
      icon: DollarSign,
      description: "Calculate monthly salaries and payouts",
      gradient: "from-[#34D399] to-[#059669]",
      badge: "Monthly Payroll",
    },
    {
      label: "Advances",
      path: "/advance",
      icon: Wallet,
      description: "Manage and record salary advance requests",
      gradient: "from-[#FBBF24] to-[#D97706]",
      badge: "Advance Log",
    },
  ];

  return (
    <Layout title="Dashboard Overview">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#DB2777] text-white p-8 sm:p-10 shadow-clay-deep relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold font-heading text-white">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              Haazri Lagao Workspace
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight">
              Welcome back to your HR Portal!
            </h2>
            <p className="text-white/80 font-medium text-base max-w-xl">
              Quickly navigate to attendance tracking, salary processing, and employee records with your high-fidelity clay interface.
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </Card>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-left w-full focus:outline-none"
              >
                <Card hoverable className="p-6 group h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-clay-button group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#EFEBF5] text-[#635F69] group-hover:bg-[#7C3AED] group-hover:text-white flex items-center justify-center transition-colors shadow-clay-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-[#332F3A] mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm font-medium text-[#635F69]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#332F3A]/10 flex items-center justify-between">
                    <span className="text-xs font-extrabold font-heading text-[#7C3AED] uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

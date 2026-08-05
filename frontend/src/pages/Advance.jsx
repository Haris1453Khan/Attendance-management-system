import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Card from "../components/ui/Card.jsx";
import { Eye, Plus, Trash2 } from "lucide-react";

export default function Advance() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "View Advances Log",
      description: "Search and review monthly employee salary advance payouts",
      icon: Eye,
      path: "/view-advance",
      gradient: "from-[#FBBF24] to-[#D97706]",
    },
    {
      title: "Issue New Advance",
      description: "Record a new salary advance for an employee",
      icon: Plus,
      path: "/add-advance",
      gradient: "from-[#34D399] to-[#059669]",
    },
    {
      title: "Delete Advance Record",
      description: "Remove incorrect advance transactions",
      icon: Trash2,
      path: "/delete-advance",
      gradient: "from-[#F87171] to-[#EF4444]",
    },
  ];

  return (
    <Layout title="Salary Advances Workspace">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="text-left w-full focus:outline-none"
              >
                <Card hoverable className="p-8 h-full flex flex-col justify-between group">
                  <div>
                    <div
                      className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-clay-button mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-[#332F3A] mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm font-medium text-[#635F69]">
                      {action.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#332F3A]/10 flex items-center justify-between">
                    <span className="text-xs font-bold font-heading text-[#7C3AED] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      Open Module →
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

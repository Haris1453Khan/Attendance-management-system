import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3200); // Auto-dismiss after 3.2 seconds
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Top Center Toast Stack */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 w-full max-w-md px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-full flex items-center justify-between gap-3 px-5 py-4 rounded-[22px] shadow-clay-card border border-white/80 backdrop-blur-xl transition-all duration-300 animate-clay-float-delayed ${
              toast.type === "success"
                ? "bg-gradient-to-r from-[#D1FAE5]/95 to-[#A7F3D0]/95 text-[#065F46]"
                : toast.type === "error"
                ? "bg-gradient-to-r from-[#FEE2E2]/95 to-[#FECACA]/95 text-[#991B1B]"
                : "bg-gradient-to-r from-[#E0F2FE]/95 to-[#BAE6FD]/95 text-[#075985]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {toast.type === "success" && <CheckCircle2 className="w-6 h-6 text-[#10B981]" />}
                {toast.type === "error" && <AlertCircle className="w-6 h-6 text-[#EF4444]" />}
                {toast.type === "info" && <Info className="w-6 h-6 text-[#0EA5E9]" />}
              </div>
              <p className="text-sm font-bold font-heading leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition"
            >
              <X className="w-4 h-4 opacity-70" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

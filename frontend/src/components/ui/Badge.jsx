export default function Badge({
  children,
  variant = "info",
  className = "",
}) {
  const variants = {
    success: "bg-[#D1FAE5] text-[#065F46] border border-[#10B981]/20 shadow-sm",
    warning: "bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/20 shadow-sm",
    danger: "bg-[#FEE2E2] text-[#991B1B] border border-[#EF4444]/20 shadow-sm",
    info: "bg-[#E0F2FE] text-[#075985] border border-[#0EA5E9]/20 shadow-sm",
    purple: "bg-[#F3E8FF] text-[#6B21A8] border border-[#7C3AED]/20 shadow-sm",
    gray: "bg-[#EFEBF5] text-[#635F69] border border-[#635F69]/20 shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold font-heading uppercase tracking-wider ${
        variants[variant] || variants.info
      } ${className}`}
    >
      {children}
    </span>
  );
}

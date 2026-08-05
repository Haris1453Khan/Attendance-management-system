export default function Card({
  children,
  className = "",
  hoverable = false,
  glass = true,
  padding = "p-6 sm:p-8",
  ...props
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] text-[#332F3A] shadow-clay-card border border-white/70 ${
        glass ? "bg-white/80 backdrop-blur-xl" : "bg-white"
      } ${padding} ${
        hoverable ? "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-clay-deep" : ""
      } ${className}`}
      {...props}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

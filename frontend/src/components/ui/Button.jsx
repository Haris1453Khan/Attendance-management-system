export default function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-[20px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none active:scale-[0.92] active:shadow-clay-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7C3AED]/30";

  const variants = {
    primary:
      "bg-gradient-to-br from-[#9333EA] via-[#7C3AED] to-[#6D28D9] text-white shadow-clay-button hover:shadow-clay-button-hover hover:-translate-y-1",
    secondary:
      "bg-white text-[#332F3A] shadow-clay-sm hover:shadow-clay-card hover:-translate-y-1 border border-white/80",
    success:
      "bg-gradient-to-br from-[#34D399] to-[#10B981] text-white shadow-clay-button hover:shadow-clay-button-hover hover:-translate-y-1",
    danger:
      "bg-gradient-to-br from-[#F87171] to-[#EF4444] text-white shadow-clay-button hover:shadow-clay-button-hover hover:-translate-y-1",
    ghost:
      "text-[#332F3A] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] hover:-translate-y-0.5",
    outline:
      "border-2 border-[#7C3AED]/30 bg-white/60 text-[#7C3AED] hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 hover:-translate-y-1 shadow-clay-sm",
  };

  const sizes = {
    sm: "h-11 px-4 text-xs gap-2 rounded-2xl",
    default: "h-14 px-6 text-base gap-2.5 rounded-[20px]",
    lg: "h-16 px-8 text-lg gap-3 rounded-[24px]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.default
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

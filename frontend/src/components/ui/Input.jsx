export default function Input({
  label,
  error,
  icon: Icon,
  className = "",
  id,
  type = "text",
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-[#635F69] font-heading px-1"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-[#635F69] pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full h-14 bg-[#EFEBF5] text-[#332F3A] font-medium text-base rounded-2xl shadow-clay-pressed border-0 px-5 transition-all duration-200 outline-none placeholder:text-[#635F69]/60 focus:bg-white focus:ring-4 focus:ring-[#7C3AED]/20 focus:shadow-clay-sm ${
            Icon ? "pl-12" : ""
          } ${error ? "ring-2 ring-red-400" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-bold text-red-500 px-1 font-heading">
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  error,
  children,
  className = "",
  id,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-bold uppercase tracking-wider text-[#635F69] font-heading px-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full h-14 bg-[#EFEBF5] text-[#332F3A] font-medium text-base rounded-2xl shadow-clay-pressed border-0 px-5 transition-all duration-200 outline-none focus:bg-white focus:ring-4 focus:ring-[#7C3AED]/20 focus:shadow-clay-sm cursor-pointer ${
          error ? "ring-2 ring-red-400" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-xs font-bold text-red-500 px-1 font-heading">
          {error}
        </p>
      )}
    </div>
  );
}

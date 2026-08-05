export default function BlobBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none">
      {/* Top Left Violet Blob */}
      <div className="absolute -top-[10%] -left-[10%] h-[55vh] w-[55vh] rounded-full bg-[#8B5CF6]/15 blur-3xl animate-clay-float" />
      
      {/* Top Right Pink Blob */}
      <div className="absolute -top-[5%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-[#EC4899]/12 blur-3xl animate-clay-float-delayed" />
      
      {/* Bottom Left Sky Blue Blob */}
      <div className="absolute -bottom-[10%] -left-[5%] h-[60vh] w-[60vh] rounded-full bg-[#0EA5E9]/12 blur-3xl animate-clay-float-delayed" />

      {/* Center Soft Emerald Ambient Glow */}
      <div className="absolute top-[40%] right-[20%] h-[45vh] w-[45vh] rounded-full bg-[#10B981]/10 blur-3xl animate-clay-float" />
    </div>
  );
}

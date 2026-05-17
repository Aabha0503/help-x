const toneMap = {
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  high: "border-orange-400/30 bg-orange-400/10 text-orange-200",
  medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  info: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  neutral: "border-slate-400/20 bg-slate-400/10 text-slate-200"
};

export default function StatusBadge({ children, tone = "neutral", pulse = false }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium ${toneMap[tone] || toneMap.neutral}`}>
      {pulse && <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-current" /></span>}
      {children}
    </span>
  );
}

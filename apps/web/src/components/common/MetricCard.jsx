export default function MetricCard({ label, value, change, icon: Icon, tone = "cyan" }) {
  const tones = {
    cyan: "from-cyan-400/20 to-cyan-400/5 text-cyan-200",
    rose: "from-rose-400/20 to-rose-400/5 text-rose-200",
    emerald: "from-emerald-400/20 to-emerald-400/5 text-emerald-200",
    amber: "from-amber-400/20 to-amber-400/5 text-amber-200"
  };

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </div>
        {Icon && <div className={`grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br ${tones[tone]}`}><Icon size={21} /></div>}
      </div>
      {change && <p className="mt-4 text-xs text-slate-400">{change}</p>}
    </section>
  );
}

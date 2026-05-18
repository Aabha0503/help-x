import { MapPin, Radio, Activity } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

const toneBySeverity = {
  critical: "critical",
  high: "high",
  medium: "medium"
};

export default function AlertCard({ alert }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.055]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-white">{alert.id}</h3>
            <StatusBadge tone={toneBySeverity[alert.severity]} pulse={alert.severity === "critical"}>{alert.severity}</StatusBadge>
          </div>
          <p className="mt-1 text-sm text-slate-400">{alert.driver} - {alert.vehicle}</p>
        </div>
        <span className="text-xs text-slate-500">{alert.time}</span>
      </div>

      <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div className="flex items-center gap-2"><MapPin size={15} className="text-cyan-300" />{alert.location}</div>
        <div className="flex items-center gap-2"><Activity size={15} className="text-amber-300" />{alert.sensors}</div>
        <div className="flex items-center gap-2"><Radio size={15} className="text-emerald-300" />AI {alert.confidence}%</div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>AI confidence</span>
          <span>{alert.confidence}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 transition-all duration-700" style={{ width: `${alert.confidence}%` }} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-sm font-medium text-slate-200">{alert.status}</p>
        <button className="rounded-md bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" type="button">Open</button>
      </div>
    </article>
  );
}

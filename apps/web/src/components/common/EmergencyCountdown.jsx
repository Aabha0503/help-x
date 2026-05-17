import { TimerReset } from "lucide-react";

export default function EmergencyCountdown({ seconds = 18 }) {
  const progress = Math.max(0, Math.min(100, (seconds / 30) * 100));

  return (
    <div className="rounded-lg border border-rose-400/25 bg-rose-500/10 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-rose-400 text-slate-950">
            <TimerReset size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-rose-100">Emergency countdown</p>
            <p className="text-xs text-rose-100/70">Awaiting mobile cancellation</p>
          </div>
        </div>
        <p className="text-3xl font-semibold tabular-nums text-white">{seconds}s</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-rose-950">
        <div className="h-full rounded-full bg-rose-300 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

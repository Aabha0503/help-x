import { useEffect, useState } from "react";
import { Pause, TimerReset, XCircle } from "lucide-react";

export default function EmergencyCountdown({ initialSeconds = 30, seconds }) {
  const [remaining, setRemaining] = useState(seconds ?? initialSeconds);
  const visibleSeconds = seconds ?? remaining;
  const progress = Math.max(0, Math.min(100, (visibleSeconds / initialSeconds) * 100));

  useEffect(() => {
    if (seconds !== undefined) return undefined;

    const interval = window.setInterval(() => {
      setRemaining((current) => (current <= 1 ? initialSeconds : current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [initialSeconds, seconds]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-rose-400/25 bg-rose-500/10 p-4" role="timer" aria-label={`Emergency cancellation countdown ${visibleSeconds} seconds remaining`}>
      <div className="absolute inset-0 animate-pulse bg-rose-400/5" />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-rose-400 text-slate-950 shadow-lg shadow-rose-500/30">
            <TimerReset size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-rose-100">Emergency countdown</p>
            <p className="text-xs text-rose-100/70">Awaiting mobile cancellation</p>
          </div>
        </div>
        <p className="text-3xl font-semibold tabular-nums text-white">{visibleSeconds}s</p>
      </div>
      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-rose-950">
        <div className="h-full rounded-full bg-rose-300 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="relative mt-4 grid grid-cols-2 gap-3">
        <button className="inline-flex items-center justify-center gap-2 rounded-md border border-rose-300/30 px-3 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-400/10" type="button">
          <XCircle size={16} />
          Cancel alert
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5" type="button">
          <Pause size={16} />
          Hold
        </button>
      </div>
    </div>
  );
}

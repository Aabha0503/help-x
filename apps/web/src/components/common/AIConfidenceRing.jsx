import { useId } from "react";

export default function AIConfidenceRing({ value = 0, label = "AI confidence", size = 112 }) {
  const gradientId = useId();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`${label}: ${value}%`}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
          transform="rotate(-90 60 60)"
        />
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <text x="60" y="56" textAnchor="middle" className="fill-white text-2xl font-semibold">
          {value}
        </text>
        <text x="60" y="75" textAnchor="middle" className="fill-slate-400 text-xs">
          percent
        </text>
      </svg>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">Confidence combines impact force, speed drop, roll angle, and GPS movement stability.</p>
      </div>
    </div>
  );
}

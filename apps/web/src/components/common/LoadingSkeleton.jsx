export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3" aria-label="Loading dashboard data">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="h-3 animate-pulse rounded bg-slate-800" />
            <div className="h-3 animate-pulse rounded bg-slate-800" />
            <div className="h-3 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

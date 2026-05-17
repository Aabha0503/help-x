export default function EmptyState({ title = "No data available", message = "Backend returned an empty list." }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-8 text-center">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
    </div>
  );
}

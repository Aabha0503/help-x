import { RefreshCw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-rose-400/25 bg-rose-500/10 p-5 text-sm text-rose-100" role="alert">
      <p className="font-semibold">Unable to load backend data</p>
      <p className="mt-2 text-rose-100/75">{message}</p>
      {onRetry && (
        <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-rose-300/30 px-3 py-2 font-medium hover:bg-rose-400/10" onClick={onRetry} type="button">
          <RefreshCw size={16} />
          Retry
        </button>
      )}
    </div>
  );
}

import { X } from "lucide-react";

export default function NotificationCenter({ notifications = [], onDismiss }) {
  return (
    <div className="fixed right-4 top-20 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3" aria-live="polite">
      {notifications.map((notification) => (
        <div key={notification.id} className="rounded-lg border border-cyan-300/20 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{notification.title}</p>
              <p className="mt-1 leading-5 text-slate-300">{notification.message}</p>
            </div>
            <button className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white" onClick={() => onDismiss(notification.id)} aria-label="Dismiss notification">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

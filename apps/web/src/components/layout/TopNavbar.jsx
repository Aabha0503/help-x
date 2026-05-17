import { Bell, Menu, Search, ShieldCheck } from "lucide-react";

export default function TopNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-300 lg:hidden" aria-label="Open navigation" onClick={onMenuClick} type="button">
            <Menu size={20} />
          </button>
          <div className="hidden min-w-0 max-w-md flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-400 md:flex">
            <Search size={17} />
            <span className="text-sm">Search incidents, vehicles, responders</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200 sm:flex">
            <ShieldCheck size={16} />
            System Online
          </div>
          <button className="relative grid h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-300 hover:bg-white/5" aria-label="Notifications" type="button">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-400" />
          </button>
          <div className="h-10 w-10 rounded-md bg-gradient-to-br from-cyan-300 to-emerald-300" aria-label="Operator profile" />
        </div>
      </div>
    </header>
  );
}

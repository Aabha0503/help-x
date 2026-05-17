import { NavLink } from "react-router-dom";
import { Activity, Ambulance, Car, Hospital, LayoutDashboard, MapPinned, RadioTower, ShieldAlert } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Active Alerts", href: "/alerts", icon: ShieldAlert },
  { label: "Vehicles", href: "/vehicles", icon: Car },
  { label: "GPS Tracking", href: "/gps", icon: MapPinned },
  { label: "Hospitals", href: "/hospitals", icon: Hospital },
  { label: "Police Dispatch", href: "/police", icon: RadioTower }
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-slate-950/95 px-4 py-5 backdrop-blur lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20">
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-wide text-white">Help-X</p>
          <p className="text-xs text-slate-400">AI Emergency Response</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-400/12 text-cyan-200 ring-1 ring-cyan-400/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-rose-400/20 bg-rose-500/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-100">
          <Ambulance size={17} />
          Emergency Mode
        </div>
        <p className="text-xs leading-5 text-rose-100/70">Live monitoring, responder dispatch, and alert escalation are active.</p>
      </div>
    </aside>
  );
}

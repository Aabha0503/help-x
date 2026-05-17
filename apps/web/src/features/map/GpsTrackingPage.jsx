import { Crosshair, MapPinned, Navigation } from "lucide-react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { vehicles } from "../../data/mockData.js";

export default function GpsTrackingPage() {
  return (
    <div>
      <PageHeader eyebrow="Location Intelligence" title="GPS Tracking" description="Live vehicle locations, emergency route context, and responder proximity map placeholder." />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.14),transparent_24%)]" />
          <div className="absolute left-[42%] top-[34%] flex items-center gap-2 rounded-md border border-rose-300/30 bg-rose-500/20 px-3 py-2 text-sm text-rose-100 shadow-xl"><Crosshair size={16} />Active crash HX-2048</div>
          <div className="absolute left-[65%] top-[62%] flex items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-500/15 px-3 py-2 text-sm text-cyan-100"><Navigation size={16} />Ambulance ETA 5m</div>
          <div className="absolute bottom-4 left-4 rounded-md border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur"><div className="flex items-center gap-2 text-sm font-medium"><MapPinned size={17} className="text-cyan-300" />Map provider placeholder</div><p className="mt-1 text-xs text-slate-400">Connect Google Maps, Mapbox, or OpenStreetMap here.</p></div>
        </section>
        <aside className="space-y-3">
          {vehicles.map((vehicle) => <div key={vehicle.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-4"><div className="flex items-center justify-between"><p className="font-medium text-white">{vehicle.plate}</p><StatusBadge tone={vehicle.status === "Emergency" ? "critical" : "active"}>{vehicle.status}</StatusBadge></div><p className="mt-2 text-sm text-slate-400">{vehicle.location} • {vehicle.speed} km/h</p></div>)}
        </aside>
      </div>
    </div>
  );
}

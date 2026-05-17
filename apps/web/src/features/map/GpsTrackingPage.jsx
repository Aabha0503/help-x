import { useState } from "react";
import InteractiveMapPlaceholder from "../../components/map/InteractiveMapPlaceholder.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { vehicles } from "../../data/mockData.js";

export default function GpsTrackingPage() {
  const [selectedLayer, setSelectedLayer] = useState("Traffic");

  return (
    <div>
      <PageHeader eyebrow="Location Intelligence" title="GPS Tracking" description="Live vehicle locations, emergency route context, and responder proximity map placeholder." />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <InteractiveMapPlaceholder selectedLayer={selectedLayer} onSelectLayer={setSelectedLayer} />
        <aside className="space-y-3">
          {vehicles.map((vehicle) => (
            <button key={vehicle.id} className="w-full rounded-lg border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-cyan-300/30 hover:bg-white/[0.055]" type="button">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{vehicle.plate}</p>
                <StatusBadge tone={vehicle.status === "Emergency" ? "critical" : "active"} pulse={vehicle.status === "Emergency"}>{vehicle.status}</StatusBadge>
              </div>
              <p className="mt-2 text-sm text-slate-400">{vehicle.location} - {vehicle.speed} km/h</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-300" style={{ width: `${Math.max(12, vehicle.battery)}%` }} />
              </div>
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}

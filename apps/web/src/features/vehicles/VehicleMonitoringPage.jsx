import { BatteryCharging, Gauge, RadioTower } from "lucide-react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { vehicles } from "../../data/mockData.js";

export default function VehicleMonitoringPage() {
  return (
    <div>
      <PageHeader eyebrow="Fleet Telemetry" title="Vehicle Monitoring" description="Monitor IoT device health, speed, battery, GSM/LTE signal, and emergency state for registered vehicles." />
      <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
        <div className="grid grid-cols-6 border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span className="col-span-2">Vehicle</span><span>Speed</span><span>Battery</span><span>Signal</span><span>Status</span>
        </div>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="grid grid-cols-6 items-center border-b border-white/10 px-4 py-4 text-sm last:border-0">
            <div className="col-span-2"><p className="font-medium text-white">{vehicle.plate}</p><p className="text-slate-400">{vehicle.driver} • {vehicle.id}</p></div>
            <div className="flex items-center gap-2 text-slate-300"><Gauge size={16} className="text-cyan-300" />{vehicle.speed} km/h</div>
            <div className="flex items-center gap-2 text-slate-300"><BatteryCharging size={16} className="text-emerald-300" />{vehicle.battery}%</div>
            <div className="flex items-center gap-2 text-slate-300"><RadioTower size={16} className="text-amber-300" />{vehicle.signal}</div>
            <StatusBadge tone={vehicle.status === "Emergency" ? "critical" : vehicle.status === "Watch" ? "high" : "active"} pulse={vehicle.status === "Emergency"}>{vehicle.status}</StatusBadge>
          </div>
        ))}
      </section>
    </div>
  );
}

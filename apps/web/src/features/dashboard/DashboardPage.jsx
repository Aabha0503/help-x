import { Ambulance, BrainCircuit, Car, ShieldAlert } from "lucide-react";
import AlertCard from "../../components/common/AlertCard.jsx";
import EmergencyCountdown from "../../components/common/EmergencyCountdown.jsx";
import MetricCard from "../../components/common/MetricCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { emergencyAlerts } from "../../data/mockData.js";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader eyebrow="Live Operations" title="Emergency Response Dashboard" description="AI-verified accident alerts, vehicle telemetry, GPS location, and responder coordination in one command view." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active emergencies" value="07" change="3 critical requiring action" icon={ShieldAlert} tone="rose" />
        <MetricCard label="Vehicles online" value="1,284" change="98.2% device heartbeat rate" icon={Car} tone="cyan" />
        <MetricCard label="AI verification" value="91%" change="Average confidence today" icon={BrainCircuit} tone="emerald" />
        <MetricCard label="Responder ETA" value="6m" change="Median first response" icon={Ambulance} tone="amber" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-white">Real-time alert stream</h2><StatusBadge tone="critical" pulse>Live</StatusBadge></div>
          {emergencyAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)}
        </section>
        <aside className="space-y-5">
          <EmergencyCountdown seconds={18} />
          <section className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <h2 className="mb-4 text-lg font-semibold text-white">Response pipeline</h2>
            {['Sensor impact detected', 'AI verification complete', 'Mobile countdown active', 'Hospital notification pending', 'Police dispatch ready'].map((item, index) => <div key={item} className="flex items-center gap-3 border-b border-white/10 py-3 last:border-0"><span className="grid h-7 w-7 place-items-center rounded-md bg-cyan-300/10 text-xs text-cyan-200">{index + 1}</span><span className="text-sm text-slate-300">{item}</span></div>)}
          </section>
        </aside>
      </div>
    </div>
  );
}

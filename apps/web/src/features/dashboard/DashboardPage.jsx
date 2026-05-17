import { Ambulance, BrainCircuit, Car, Clock3, ShieldAlert } from "lucide-react";
import AIConfidenceRing from "../../components/common/AIConfidenceRing.jsx";
import AlertCard from "../../components/common/AlertCard.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import EmergencyCountdown from "../../components/common/EmergencyCountdown.jsx";
import ErrorState from "../../components/common/ErrorState.jsx";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.jsx";
import MetricCard from "../../components/common/MetricCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import useLiveAlerts from "../../hooks/useLiveAlerts.js";

export default function DashboardPage() {
  const { alerts, latestAlert, analytics, isLoading, error, isEmpty, retry } = useLiveAlerts();

  return (
    <div>
      <PageHeader eyebrow="Live Operations" title="Emergency Response Dashboard" description="AI-verified accident alerts, vehicle telemetry, GPS location, and responder coordination in one command view." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Active emergencies" value={String(analytics.activeEmergencies).padStart(2, "0")} change={`${analytics.critical} critical requiring action`} icon={ShieldAlert} tone="rose" />
        <MetricCard label="Vehicles online" value="1,284" change="98.2% device heartbeat rate" icon={Car} tone="cyan" />
        <MetricCard label="AI verification" value={`${analytics.averageConfidence}%`} change="Average confidence in live stream" icon={BrainCircuit} tone="emerald" />
        <MetricCard label="Responder ETA" value="6m" change="Median first response" icon={Ambulance} tone="amber" />
        <MetricCard label="Countdowns" value={analytics.countdownActive ? "Active" : "Clear"} change="Mobile cancellation windows" icon={Clock3} tone="rose" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Real-time alert stream</h2>
            <div className="flex items-center gap-2">
              {latestAlert && <span className="text-xs text-slate-400">Latest: {latestAlert.id}</span>}
              <StatusBadge tone="critical" pulse>Live simulation</StatusBadge>
            </div>
          </div>
          {isLoading && <LoadingSkeleton rows={3} />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {isEmpty && <EmptyState title="No active alerts" message="MongoDB returned no emergency alerts yet." />}
          {!isLoading && !error && alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)}
        </section>

        <aside className="space-y-5">
          <EmergencyCountdown initialSeconds={30} />
          <AIConfidenceRing value={analytics.averageConfidence} />
          <section className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <h2 className="mb-4 text-lg font-semibold text-white">Response pipeline</h2>
            {["Sensor impact detected", "AI verification complete", "Mobile countdown active", "Hospital notification pending", "Police dispatch ready"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 border-b border-white/10 py-3 last:border-0">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-cyan-300/10 text-xs text-cyan-200">{index + 1}</span>
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
}

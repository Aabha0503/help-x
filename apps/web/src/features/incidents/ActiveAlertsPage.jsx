import AIConfidenceRing from "../../components/common/AIConfidenceRing.jsx";
import AlertCard from "../../components/common/AlertCard.jsx";
import EmergencyCountdown from "../../components/common/EmergencyCountdown.jsx";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import useLiveAlerts from "../../hooks/useLiveAlerts.js";

export default function ActiveAlertsPage() {
  const { alerts, analytics, isLoading } = useLiveAlerts();

  return (
    <div>
      <PageHeader eyebrow="Incident Control" title="Active Emergency Alerts" description="Review live accident candidates, AI severity, cancellation windows, and dispatch state." />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-4">{isLoading ? <LoadingSkeleton rows={3} /> : alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)}</section>
        <aside className="space-y-5">
          <EmergencyCountdown initialSeconds={30} />
          <AIConfidenceRing value={analytics.averageConfidence} label="Live alert confidence" size={104} />
          <section className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <h2 className="mb-4 text-lg font-semibold text-white">Escalation rules</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-3"><span>AI confidence above 85%</span><StatusBadge tone="active">Enabled</StatusBadge></div>
              <div className="flex items-center justify-between gap-3"><span>30 sec cancel timeout</span><StatusBadge tone="info">Active</StatusBadge></div>
              <div className="flex items-center justify-between gap-3"><span>Auto police dispatch</span><StatusBadge tone="high">Guarded</StatusBadge></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

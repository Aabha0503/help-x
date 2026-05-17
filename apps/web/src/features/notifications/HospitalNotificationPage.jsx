import { Ambulance, Bed, Send } from "lucide-react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { hospitals } from "../../data/mockData.js";

export default function HospitalNotificationPage() {
  return (
    <div>
      <PageHeader eyebrow="Medical Response" title="Hospital Notification Panel" description="Coordinate trauma care availability, ambulance requests, and delivery status for verified emergencies." action={<button className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">Notify nearest hospital</button>} />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="space-y-4">
          {hospitals.map((hospital) => (
            <article key={hospital.name} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div><h2 className="text-lg font-semibold text-white">{hospital.name}</h2><p className="mt-1 text-sm text-slate-400">{hospital.distance} away • ambulance ETA {hospital.eta}</p></div>
                <StatusBadge tone={hospital.status === "Accepted" ? "active" : hospital.status === "Pending" ? "high" : "info"} pulse={hospital.status === "Pending"}>{hospital.status}</StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-white/10 bg-slate-950/50 p-3"><Bed className="mb-2 text-cyan-300" size={18} /><p className="text-sm text-slate-300">{hospital.capacity}</p></div>
                <div className="rounded-md border border-white/10 bg-slate-950/50 p-3"><Ambulance className="mb-2 text-emerald-300" size={18} /><p className="text-sm text-slate-300">Trauma route ready</p></div>
                <div className="rounded-md border border-white/10 bg-slate-950/50 p-3"><Send className="mb-2 text-amber-300" size={18} /><p className="text-sm text-slate-300">Alert webhook queued</p></div>
              </div>
            </article>
          ))}
        </section>
        <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <h2 className="text-lg font-semibold text-white">Notification payload</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-md bg-slate-950/60 p-3"><span className="text-slate-500">Incident</span><p>HX-2048 • Critical</p></div>
            <div className="rounded-md bg-slate-950/60 p-3"><span className="text-slate-500">Location</span><p>Ring Road, New Delhi</p></div>
            <div className="rounded-md bg-slate-950/60 p-3"><span className="text-slate-500">Medical info</span><p>Blood group O+, no known allergies</p></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

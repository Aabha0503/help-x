import { Radio, Route, ShieldAlert } from "lucide-react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { policeUnits } from "../../data/mockData.js";

export default function PoliceDispatchPage() {
  return (
    <div>
      <PageHeader eyebrow="Public Safety" title="Police Dispatch Panel" description="Assign nearby police units, share incident coordinates, and track dispatch acknowledgement in real time." action={<button className="rounded-md bg-rose-300 px-4 py-2 text-sm font-semibold text-slate-950">Escalate dispatch</button>} />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="space-y-4">
          {policeUnits.map((unit) => (
            <article key={unit.unit} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3"><div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-400/10 text-blue-200"><Radio size={20} /></div><div><h2 className="text-lg font-semibold text-white">{unit.unit}</h2><p className="mt-1 text-sm text-slate-400">{unit.station}</p></div></div>
                <StatusBadge tone="info" pulse={unit.status === "Dispatched"}>{unit.status}</StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300"><Route size={17} className="text-cyan-300" />ETA {unit.eta}</div>
                <div className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300"><ShieldAlert size={17} className="text-rose-300" />Accident HX-2048</div>
              </div>
            </article>
          ))}
        </section>
        <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <h2 className="text-lg font-semibold text-white">Dispatch checklist</h2>
          {['Incident coordinates shared', 'Traffic control requested', 'Hospital route protected', 'Operator acknowledgement pending'].map((item, index) => <div key={item} className="flex items-center gap-3 border-b border-white/10 py-4 last:border-0"><span className="grid h-7 w-7 place-items-center rounded-md bg-blue-300/10 text-xs text-blue-200">{index + 1}</span><span className="text-sm text-slate-300">{item}</span></div>)}
        </aside>
      </div>
    </div>
  );
}

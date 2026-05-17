import { Crosshair, MapPinned, Navigation, Route } from "lucide-react";
import StatusBadge from "../common/StatusBadge.jsx";

const layers = ["Traffic", "Hospitals", "Police", "Vehicles"];

export default function InteractiveMapPlaceholder({ selectedLayer, onSelectLayer }) {
  return (
    <section className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-slate-900 sm:min-h-[560px]" aria-label="Interactive GPS map placeholder">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.14),transparent_24%)]" />

      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        {layers.map((layer) => (
          <button
            key={layer}
            className={`rounded-md border px-3 py-2 text-xs font-medium transition ${
              selectedLayer === layer ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-slate-950/70 text-slate-300 hover:bg-white/10"
            }`}
            onClick={() => onSelectLayer(layer)}
            type="button"
          >
            {layer}
          </button>
        ))}
      </div>

      <div className="absolute left-[38%] top-[34%] max-w-[220px] rounded-md border border-rose-300/30 bg-rose-500/20 px-3 py-2 text-sm text-rose-100 shadow-xl">
        <div className="flex items-center gap-2"><Crosshair size={16} />Active crash HX-2048</div>
        <p className="mt-1 text-xs text-rose-100/75">AI confidence 94%</p>
      </div>
      <div className="absolute left-[63%] top-[62%] rounded-md border border-cyan-300/30 bg-cyan-500/15 px-3 py-2 text-sm text-cyan-100">
        <div className="flex items-center gap-2"><Navigation size={16} />Ambulance ETA 5m</div>
      </div>
      <div className="absolute left-[18%] top-[64%] rounded-md border border-emerald-300/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-100">
        <div className="flex items-center gap-2"><Route size={16} />Police route active</div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-slate-950/85 px-4 py-3 backdrop-blur sm:right-auto sm:max-w-md">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-white"><MapPinned size={17} className="text-cyan-300" />Map provider placeholder</div>
            <p className="mt-1 text-xs text-slate-400">Selected layer: {selectedLayer}. Connect Google Maps, Mapbox, or OpenStreetMap here.</p>
          </div>
          <StatusBadge tone="info" pulse>Live GPS</StatusBadge>
        </div>
      </div>
    </section>
  );
}

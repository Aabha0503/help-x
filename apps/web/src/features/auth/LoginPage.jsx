import { Activity, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1fr_480px]">
      <section className="relative hidden overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_55%,rgba(16,185,129,0.15),transparent_30%),#020617] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-300 text-slate-950"><Activity size={26} /></div>
          <div><p className="text-xl font-semibold">Help-X</p><p className="text-sm text-slate-300">AI Emergency Response</p></div>
        </div>
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Command Center</p>
          <h1 className="text-5xl font-semibold leading-tight">Accident intelligence for faster emergency decisions.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">Monitor sensor-triggered incidents, verify AI confidence, coordinate hospitals, and dispatch police from a single operations dashboard.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
          {['Sensor telemetry', 'AI verification', 'Responder dispatch'].map((item) => <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">{item}</div>)}
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="mb-3 grid h-12 w-12 place-items-center rounded-lg bg-cyan-300 text-slate-950"><Activity size={26} /></div>
            <h1 className="text-3xl font-semibold">Help-X</h1>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="text-cyan-300" />
              <div><h2 className="text-xl font-semibold">Operator Login</h2><p className="text-sm text-slate-400">Secure emergency dashboard access</p></div>
            </div>
            <form className="space-y-4">
              <label className="block"><span className="mb-2 block text-sm text-slate-300">Email</span><div className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900 px-3 py-3"><Mail size={17} className="text-slate-500" /><input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600" placeholder="operator@help-x.ai" /></div></label>
              <label className="block"><span className="mb-2 block text-sm text-slate-300">Password</span><div className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900 px-3 py-3"><Lock size={17} className="text-slate-500" /><input type="password" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600" placeholder="••••••••" /></div></label>
              <button type="button" className="w-full rounded-md bg-cyan-300 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Sign in</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

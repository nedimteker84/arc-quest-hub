function ProjectOwnership() {
  return (
    <section className="mt-10 rounded-3xl border border-cyan-500/20 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-white">Project Ownership</h2>

      <p className="mt-2 text-slate-400">
        Arc Quest Hub is independently designed, developed and maintained by
        Nedim Teker. The live app, source code and smart contract are publicly
        verifiable.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Developer</p>
          <p className="mt-1 font-semibold">Nedim Teker</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Project Version</p>
          <p className="mt-1 font-semibold">Arc Quest Hub MVP v1</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Smart Contract</p>
          <a
            href="https://testnet.arcscan.app/address/0x4A37492539270A97c44F90DFc889EA742DF68497"
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-cyan-400 hover:underline"
          >
            0x4A37492539270A97c44F90DFc889EA742DF68497
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">GitHub Repository</p>
          <a
            href="https://github.com/nedimteker84/arc-quest-hub"
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-cyan-400 hover:underline"
          >
            github.com/nedimteker84/arc-quest-hub
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Live Application</p>
          <a
            href="https://arc-quest-hub.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-cyan-400 hover:underline"
          >
            arc-quest-hub.vercel.app
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Network</p>
          <p className="mt-1 font-semibold">Arc Testnet</p>
        </div>
      </div>
    </section>
  )
}

export default ProjectOwnership
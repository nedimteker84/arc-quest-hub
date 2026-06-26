function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8 text-center">
      <p className="text-sm text-slate-400">
        Arc Quest Hub MVP
      </p>

      <p className="mt-2 text-xs text-slate-500">
        Built for Arc Testnet builders.
      </p>

      <div className="mt-4 flex justify-center gap-6">
        <a
          href="https://github.com/nedimteker84/arc-quest-hub"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:text-cyan-300"
        >
          GitHub
        </a>

        <a
          href="https://arc-quest-hub.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Live App
        </a>
      </div>
    </footer>
  )
}

export default Footer
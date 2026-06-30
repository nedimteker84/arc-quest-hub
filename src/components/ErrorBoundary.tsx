import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application Error:", error)
    console.error(errorInfo)
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
          <div className="w-full max-w-2xl rounded-3xl border border-red-500/20 bg-slate-900 p-10 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
              Arc Quest Hub
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Something went wrong
            </h1>

            <p className="mt-5 leading-7 text-slate-400">
              The application encountered an unexpected error.
              No wallet data or onchain assets were modified.
            </p>

            {this.state.error && (
              <pre className="mt-6 overflow-auto rounded-xl bg-black/40 p-4 text-sm text-red-300">
                {this.state.error.message}
              </pre>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={this.reset}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="rounded-xl border border-white/10 px-6 py-3 font-bold transition hover:bg-white/10"
              >
                Reload
              </button>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
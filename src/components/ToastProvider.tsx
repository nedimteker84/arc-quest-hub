import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type ToastType = "success" | "error" | "info" | "warning"

type Toast = {
  id: number
  type: ToastType
  message: string
}

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now()

    setToasts((current) => [
      ...current,
      {
        id,
        type,
        message,
      },
    ])

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3500)
  }, [])

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed right-5 top-5 z-50 flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              "rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur",
              toast.type === "success"
                ? "border-emerald-400/30 bg-emerald-950/90 text-emerald-200"
                : "",
              toast.type === "error"
                ? "border-red-400/30 bg-red-950/90 text-red-200"
                : "",
              toast.type === "warning"
                ? "border-yellow-400/30 bg-yellow-950/90 text-yellow-200"
                : "",
              toast.type === "info"
                ? "border-cyan-400/30 bg-slate-950/90 text-cyan-200"
                : "",
            ].join(" ")}
          >
            <p className="text-sm font-bold">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.")
  }

  return context
}
import { Toast } from 'radix-ui'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext } from './ToastContext'
import {
  DEFAULT_TOAST_DURATION,
  type OpenToastOptions,
  type ToastType,
  type UseToastReturn,
} from './types'

type ToastState = {
  isOpen: boolean
  message: string
  type: ToastType
  duration: number
}

const initialState: ToastState = {
  isOpen: false,
  message: '',
  type: 'info',
  duration: DEFAULT_TOAST_DURATION,
}

type ToastProviderProps = {
  children: ReactNode
}

function getToastClassName(type: ToastType) {
  return `toast-root toast-root--${type}`
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState>(initialState)

  const close = useCallback(() => {
    setToast((current) => ({ ...current, isOpen: false }))
  }, [])

  const open = useCallback((options: OpenToastOptions) => {
    setToast({
      isOpen: true,
      message: options.message,
      type: options.type ?? 'info',
      duration: options.duration ?? DEFAULT_TOAST_DURATION,
    })
  }, [])

  const value = useMemo<UseToastReturn>(
    () => ({
      isOpen: toast.isOpen,
      message: toast.message,
      type: toast.type,
      duration: toast.duration,
      open,
      close,
    }),
    [toast, open, close],
  )

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider duration={toast.duration} swipeDirection="right">
        {children}
        <Toast.Root
          open={toast.isOpen}
          onOpenChange={(open) => {
            if (!open) close()
          }}
          duration={toast.duration}
          type="foreground"
          className={getToastClassName(toast.type)}
        >
          <Toast.Description className="toast-description">
            {toast.message}
          </Toast.Description>
          <Toast.Close className="toast-close" aria-label="Close">
            ×
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

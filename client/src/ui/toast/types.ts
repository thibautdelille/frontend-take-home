export type ToastType = 'success' | 'error' | 'info'

export type OpenToastOptions = {
  message: string
  type?: ToastType
  duration?: number
}

export type UseToastReturn = {
  isOpen: boolean
  message: string
  type: ToastType
  duration: number
  open: (options: OpenToastOptions) => void
  close: () => void
}

export const DEFAULT_TOAST_DURATION = 5000

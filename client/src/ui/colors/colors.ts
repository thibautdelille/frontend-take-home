export const textToneClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  placeholder: 'text-placeholder',
  disabled: 'text-disabled',
} as const

export type TextTone = keyof typeof textToneClasses

export const surfaceClasses = {
  surface: 'bg-surface',
  subtle: 'bg-subtle',
  accent: 'bg-accent',
} as const

export const borderClasses = {
  default: 'border-default',
  input: 'border-input',
} as const

/** @deprecated Use textToneClasses */
export const textColorClasses = textToneClasses

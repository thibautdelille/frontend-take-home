/**
 * Tailwind class names matching Figma text styles.
 * md = 14px (Text/2), sm = 12px (Text/1)
 */
export const typographyClasses = {
  mdBold: 'text-2-bold',
  mdNormal: 'text-2-normal',
  smBold: 'text-1-bold',
  smNormal: 'text-1-normal',
} as const

export const textColorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  placeholder: 'text-placeholder',
  disabled: 'text-disabled',
} as const

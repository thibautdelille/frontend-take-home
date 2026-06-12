/**
 * Radix Themes spacing scale for Box, Flex, Grid, etc.
 * Values map to pt, py, px, gap, m props — e.g. pt={spacing[7]}.
 *
 * @see https://www.radix-ui.com/themes/docs/theme/spacing
 */
export const spacing = {
  /** 4px */
  1: '1',
  /** 8px — Figma space/2 */
  2: '2',
  /** 12px — Figma space/3 */
  3: '3',
  /** 16px — Figma space/4 */
  4: '4',
  /** 24px — Figma space/5 */
  5: '5',
  /** 32px — Figma space/6 */
  6: '6',
  /** 40px — Figma space/7 */
  7: '7',
  /** 48px */
  8: '8',
  /** 64px */
  9: '9',
} as const

export type Spacing = keyof typeof spacing

/** Figma page container width */
export const containerWidth = '850px'

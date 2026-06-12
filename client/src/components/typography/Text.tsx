import { Text as RadixText, type TextProps as RadixTextProps } from '@radix-ui/themes'
import type { ReactNode } from 'react'

type TextSize = 'md' | 'sm'
type TextWeight = 'normal' | 'bold'

export type TextProps = {
  size?: TextSize
  weight?: TextWeight
  children?: ReactNode
  className?: string
  color?: RadixTextProps['color']
  as?: 'span' | 'div' | 'label' | 'p'
  asChild?: boolean
  trim?: RadixTextProps['trim']
  wrap?: RadixTextProps['wrap']
  highContrast?: RadixTextProps['highContrast']
}

const radixSize: Record<TextSize, '1' | '2'> = {
  md: '2',
  sm: '1',
}

const radixWeight: Record<TextWeight, 'regular' | 'medium'> = {
  normal: 'regular',
  bold: 'medium',
}

export function Text({
  size = 'md',
  weight = 'normal',
  children,
  ...props
}: TextProps) {
  return (
    <RadixText size={radixSize[size]} weight={radixWeight[weight]} {...props}>
      {children}
    </RadixText>
  )
}

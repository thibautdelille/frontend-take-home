import { Text as RadixText, type TextProps as RadixTextProps } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { textToneClasses, type TextTone } from '../../styles/colors'

type TextSize = 'md' | 'sm'
type TextWeight = 'normal' | 'bold'

export type TextProps = {
  size?: TextSize
  weight?: TextWeight
  tone?: TextTone
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

function mergeClassNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ') || undefined
}

export function Text({
  size = 'md',
  weight = 'normal',
  tone = 'primary',
  as = 'p',
  className,
  color,
  children,
  ...props
}: TextProps) {
  const toneClassName = color ? undefined : textToneClasses[tone]

  return (
    <RadixText
      as={as}
      size={radixSize[size]}
      weight={radixWeight[weight]}
      className={mergeClassNames(toneClassName, className)}
      color={color}
      {...props}
    >
      {children}
    </RadixText>
  )
}

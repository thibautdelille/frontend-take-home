import {
  Button as RadixButton,
  type ButtonProps as RadixButtonProps,
} from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { Icon, type IconName } from '../icons'
import { Text } from '../typography'
import type { TextTone } from '../colors/colors'

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'danger'
export type ButtonSize = 'md' | 'sm'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  children?: ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  asChild?: boolean
}

const radixVariant: Record<ButtonVariant, NonNullable<RadixButtonProps['variant']>> = {
  primary: 'solid',
  secondary: 'outline',
  subtle: 'soft',
  danger: 'outline',
}

const radixColor: Record<ButtonVariant, RadixButtonProps['color'] | undefined> = {
  primary: 'purple',
  secondary: 'gray',
  subtle: 'gray',
  danger: 'red',
}

const radixTextColor: Record<ButtonVariant, TextTone | undefined> = {
  primary: 'inverse',
  secondary: 'primary',
  subtle: 'disabled',
  danger: 'danger',
}

const radixSize: Record<ButtonSize, NonNullable<RadixButtonProps['size']>> = {
  md: '2',
  sm: '1',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  disabled,
  loading,
  type = 'button',
  onClick,
  asChild,
}: ButtonProps) {
  return (
    <RadixButton
      variant={radixVariant[variant]}
      color={radixColor[variant]}
      size={radixSize[size]}
      className={className}
      disabled={disabled}
      loading={loading}
      type={type}
      onClick={onClick}
      asChild={asChild}
    >
      {icon && <Icon name={icon} />}
      <Text as="span" size="md" weight="bold" tone={radixTextColor[variant]}>{children}</Text>
    </RadixButton>
  )
}

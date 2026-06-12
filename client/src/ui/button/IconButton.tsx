import { IconButton as RadixIconButton } from '@radix-ui/themes'
import { Icon, type IconName } from '../icons'

export type IconButtonProps = {
  icon: IconName
  /** Accessible name for icon-only controls. */
  label: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  asChild?: boolean
}

export function IconButton({
  icon,
  label,
  className,
  disabled,
  onClick,
  asChild,
}: IconButtonProps) {
  return (
    <RadixIconButton
      variant="ghost"
      color="gray"
      radius="full"
      size="1"
      aria-label={label}
      className={className}
      disabled={disabled}
      onClick={onClick}
      asChild={asChild}
    >
      <Icon name={icon} />
    </RadixIconButton>
  )
}

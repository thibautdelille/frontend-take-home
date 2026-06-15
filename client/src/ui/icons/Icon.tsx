import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import { icons, type IconName } from './icons'

export type IconProps = {
  name: IconName
  size?: number
  className?: string
  /** Provide a label for icon-only controls; omit when paired with visible text. */
  label?: string
}

export function Icon({ name, size = 16, className, label }: IconProps) {
  const Component = icons[name]

  if (label) {
    return (
      <AccessibleIcon.Root label={label}>
        <Component width={size} height={size} className={className} />
      </AccessibleIcon.Root>
    )
  }

  return <Component width={size} height={size} className={className} aria-hidden />
}

import { TextField } from '@radix-ui/themes'
import type { ChangeEvent } from 'react'
import { Icon } from '../icons'

export type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchField({
  value,
  onChange,
  placeholder = 'Search by name...',
  className,
}: SearchFieldProps) {
  return (
    <TextField.Root
      size="2"
      variant="surface"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
    >
      <TextField.Slot>
        <Icon name="magnifyingGlass" />
      </TextField.Slot>
    </TextField.Root>
  )
}

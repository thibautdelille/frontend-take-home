import {
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons'

export const icons = {
  plus: PlusIcon,
  dotsHorizontal: DotsHorizontalIcon,
  magnifyingGlass: MagnifyingGlassIcon,
} as const

export type IconName = keyof typeof icons

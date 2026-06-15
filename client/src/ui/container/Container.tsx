import { Flex, type FlexProps } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { containerWidth, spacing } from '../layout/spacing'

export type ContainerProps = Omit<FlexProps, 'direction' | 'width' | 'maxWidth'> & {
  children?: ReactNode
}

export function Container({
  children,
  className,
  pt = spacing[7],
  ...props
}: ContainerProps) {
  return (
    <Flex
      direction="column"
      align="stretch"
      width="100%"
      maxWidth={containerWidth}
      pt={pt}
      className={className}
      {...props}
    >
      {children}
    </Flex>
  )
}

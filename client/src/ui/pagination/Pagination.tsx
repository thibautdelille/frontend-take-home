import { Flex } from '@radix-ui/themes'
import { Button } from '../button'
import { spacing } from '../layout/spacing'

export type PaginationProps = {
  hasPrevious: boolean
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
  isLoading?: boolean
}

export function Pagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  isLoading = false,
}: PaginationProps) {
  const isNextDisabled = !hasNext || isLoading;
  const isPreviousDisabled = !hasPrevious || isLoading;
  return (
    <nav aria-label="Pagination">
      <Flex align="center" gap={spacing[2]} justify="end">
        <Button
          variant={isPreviousDisabled ? 'subtle' : 'secondary'}
          size="sm"
          disabled={isPreviousDisabled}
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          variant={isNextDisabled ? 'subtle' : 'secondary'}
          size="sm"
          disabled={!hasNext || isLoading}
          onClick={onNext}
        >
          Next
        </Button>
      </Flex>
    </nav>
  )
}

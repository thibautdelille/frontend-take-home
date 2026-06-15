const tableDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function formatTableDate(value: string) {
  return tableDateFormatter.format(new Date(value))
}

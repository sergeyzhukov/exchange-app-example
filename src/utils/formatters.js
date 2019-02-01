const formatter = new Intl.NumberFormat(undefined, { style: 'decimal', minimumFractionDigits: 2 })

// eslint-disable-next-line import/prefer-default-export
export function formatCurrency(amount) {
  return formatter.format(amount)
}

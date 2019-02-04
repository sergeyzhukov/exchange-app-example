import Numeral from 'numeral'

// eslint-disable-next-line import/prefer-default-export
export function formatCurrency(amount) {
  return Numeral(amount).format('0,0.00')
}

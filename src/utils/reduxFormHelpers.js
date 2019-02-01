export const validationRequired = value => (value ? undefined : 'This field is required')

export const validationMoreThan0 = value => (parseFloat(value) > 0 ? undefined : 'Amount should be more than 0')

export const normalizeCurrency = (value) => {
  const math = value.replace(/[^\d,.]/g, '')
    .replace(',', '.')
    .match(/(?=.*\d)(\d{0,})?(\.?\d{0,2})?/)

  if (!math) {
    return ''
  }

  return math[0]
}

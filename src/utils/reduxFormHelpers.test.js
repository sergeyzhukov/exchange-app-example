import {
  validationRequired,
  validationMoreThan0,
  normalizeCurrency,
} from './reduxFormHelpers'

test('validationRequred test', () => {
  expect(validationRequired('test')).toBeUndefined()
  expect(validationRequired('')).toEqual('This field is required')
})

test('validationMoreThan0 test', () => {
  expect(validationMoreThan0(3)).toBeUndefined()
  expect(validationMoreThan0(0)).toEqual('Amount should be more than 0')
})

test('normalizeCurrency test', () => {
  expect(normalizeCurrency('43.333')).toEqual('43.33')
  expect(normalizeCurrency('43.13')).toEqual('43.13')
  expect(normalizeCurrency('0.13')).toEqual('0.13')
  expect(normalizeCurrency('0')).toEqual('0')
  expect(normalizeCurrency('43.33.322')).toEqual('43.33')
  expect(normalizeCurrency('43,33')).toEqual('43.33')
  expect(normalizeCurrency('test')).toEqual('')
})

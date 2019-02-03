import { createSelector } from 'reselect'

// eslint-disable-next-line import/prefer-default-export
export const getExchangeRates = createSelector(
  state => state.rates,
  rates => rates
)

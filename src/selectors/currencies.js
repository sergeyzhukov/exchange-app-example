import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import Schemas from '../middleware/schemas'

export const createCurrenciesListSelector = createSelector(
  state => state.currencies,
  ({ isFetching, isError, error, result, entities }) => ({
    isFetching,
    isError,
    error,
    currencies: Object.values(denormalize(result, Schemas.CURRENCY_ARRAY, entities)),
  })
)

export const getDefaultCurrencyCode = createSelector(
  state => state.currencies,
  ({ defaultCode }) => defaultCode
)

export const getCurrenciesDictionarySelector = createSelector(
  state => state.currencies,
  ({ isFetching, isError, error, entities }) => ({
    isFetching,
    isError,
    error,
    currencies: entities.currency,
  })
)

export const getCurrencyByCodeSelector = codeSelector => createSelector(
  codeSelector,
  state => state.currencies,
  (code, { entities }) => denormalize(code, Schemas.CURRENCY, entities)
)

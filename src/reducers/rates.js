import { reduce } from 'lodash'
import ActionTypes from '../middleware/actionTypes'

const initialState = {}

/* eslint import/prefer-default-export: 0 */
export function rates(state = initialState, action) {
  const { type, payload = {}, meta } = action

  switch (type) {
    case ActionTypes.LOAD_EXCHANGE_RATES_SUCCESS: {
      const { code } = meta
      const exchangeRates = reduce(payload, (acc, v) => {
        const key = `${code}/${v.code}`
        acc[key] = v.rate
        const inverseKey = `${v.code}/${code}`
        acc[inverseKey] = v.inverseRate
        return acc
      }, {})

      return exchangeRates
    }
    default:
      break
  }

  return state
}

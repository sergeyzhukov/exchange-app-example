import { RSAA } from 'redux-api-middleware'
import ActionTypes from '../middleware/actionTypes'

// eslint-disable-next-line import/prefer-default-export
export function loadExchangeRates(code) {
  if (!code) {
    throw new Error('called loadExchangeRates without code')
  }

  return {
    [RSAA]: {
      endpoint: `https://www.floatrates.com/daily/${code}.json`,
      method: 'GET',
      types: [
        ActionTypes.LOAD_EXCHANGE_RATES_REQUEST,
        {
          type: ActionTypes.LOAD_EXCHANGE_RATES_SUCCESS,
          meta: { code },
        },
        ActionTypes.LOAD_EXCHANGE_RATES_FAILURE,
      ],
    },
  }
}

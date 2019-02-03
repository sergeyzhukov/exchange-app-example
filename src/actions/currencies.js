import { RSAA } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import ActionTypes from '../middleware/actionTypes'
import Schemas from '../middleware/schemas'

export function loadCurrencySymbols() {
  return {
    [RSAA]: {
      endpoint: 'https://www.localeplanet.com/api/auto/currencymap.json?name=y',
      method: 'GET',
      headers: { 'Accept-Language': 'en-US' },
      types: [
        ActionTypes.LOAD_CURRENCY_SYMBOLS_REQUEST,
        {
          type: ActionTypes.LOAD_CURRENCY_SYMBOLS_SUCCESS,
          payload: (action, state, res) => res.json().then(
            json => normalize(json, Schemas.CURRENCY_ARRAY)
          ),
        },
        ActionTypes.LOAD_CURRENCY_SYMBOLS_SUCCESS,
      ],
    },
  }
}

export function setDefaultCurrency(code) {
  return {
    type: ActionTypes.SET_DEFAULT_CURRENCY,
    payload: { code },
  }
}

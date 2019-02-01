import { RSAA } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import ActionTypes from '../middleware/actionTypes'
import Schemas from '../middleware/schemas'

export function loadCurrencySymbols() {
  return {
    [RSAA]: {
      endpoint: 'https://www.localeplanet.com/api/auto/currencymap.json',
      method: 'GET',
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

export function loadCurrencyNames() {
  return {
    [RSAA]: {
      endpoint: 'http://data.fixer.io/api/symbols?access_key=3e061f2ed43be15a5b7baf056474d605',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        ActionTypes.LOAD_CURRENCY_NAMES_REQUEST,
        ActionTypes.LOAD_CURRENCY_NAMES_SUCCESS,
        ActionTypes.LOAD_CURRENCY_NAMES_FAILURE,
      ],
    },
  }
}

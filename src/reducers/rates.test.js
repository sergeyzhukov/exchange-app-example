import { rates } from '.'
import ActionTypes from '../middleware/actionTypes'

const ACTION = {
  type: ActionTypes.LOAD_EXCHANGE_RATES_SUCCESS,
  meta: {
    code: 'USD',
  },
  payload: {
    RUB: {
      code: 'RUB',
      rate: 1,
      inverseRate: 2,
    },
  },
}

describe('rates reducer', () => {
  it('should return the initial state', () => {
    expect(rates(undefined, {})).toEqual({})
  })

  it('should LOAD_EXCHANGE_RATES_SUCCESS', () => {
    expect(rates(undefined, ACTION)).toEqual({
      'USD/RUB': 1,
      'RUB/USD': 2,
    })
  })
})

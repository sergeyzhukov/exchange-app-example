import uuid from 'uuid/v4'
import ActionTypes from '../middleware/actionTypes'

const initialState = []

/* eslint import/prefer-default-export: 0 */
export function transactions(state = initialState, action) {
  const { type, payload = {} } = action

  switch (type) {
    case ActionTypes.ACCOUNT_RECEIVE_MONEY: {
      const newTransaction = {
        uuid: uuid(),
        account: payload.code,
        symbol: payload.symbol,
        amount: payload.amount,
        operation: 'receive',
        timestamp: Date.now(),
      }
      return [
        ...state,
        newTransaction,
      ]
    }
    case ActionTypes.ACCOUNT_WiTHDRAW_MONEY: {
      const newTransaction = {
        uuid: uuid(),
        account: payload.code,
        symbol: payload.symbol,
        amount: payload.amount,
        operation: 'withdrawal',
        timestamp: Date.now(),
      }
      return [
        ...state,
        newTransaction,
      ]
    }
    default:
      break
  }

  return state
}

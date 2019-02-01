import ActionTypes from '../middleware/actionTypes'

const initialState = {}

/* eslint import/prefer-default-export: 0 */
export function accounts(state = initialState, action) {
  const { type, payload = {} } = action

  switch (type) {
    case ActionTypes.ACCOUNT_ADD:
      return {
        ...state,
        [payload.code]: {
          code: payload.code,
          nativeSymbol: payload.nativeSymbol,
          balance: 0,
        },
      }
    case ActionTypes.ACCOUNT_RECEIVE_MONEY: {
      const account = state[payload.code]
      account.balance += payload.amount
      return {
        ...state,
        [payload.code]: account,
      }
    }
    default:
      break
  }

  return state
}

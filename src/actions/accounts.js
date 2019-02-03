import ActionTypes from '../middleware/actionTypes'

export function addAccount(code, nativeSymbol) {
  return {
    type: ActionTypes.ACCOUNT_ADD,
    payload: { code, nativeSymbol },
  }
}

export function receiveFundsToAccount(code, amount, symbol) {
  return {
    type: ActionTypes.ACCOUNT_RECEIVE_MONEY,
    payload: { code, amount, symbol },
  }
}

export function withdrawalFundsFromAccount(code, amount, symbol) {
  return {
    type: ActionTypes.ACCOUNT_WiTHDRAW_MONEY,
    payload: { code, amount, symbol },
  }
}

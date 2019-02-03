import ActionTypes from '../middleware/actionTypes'

const initialState = {
  entities: {},
  result: [],
  isFetching: false,
  isError: false,
  error: undefined,
  defaultCode: undefined,
}

/* eslint import/prefer-default-export: 0 */
export function currencies(state = initialState, action) {
  const { type, payload = {} } = action

  switch (type) {
    case ActionTypes.LOAD_CURRENCY_SYMBOLS_SUCCESS:
      return {
        entities: payload.entities,
        result: payload.result,
        isFetching: false,
        isError: false,
        error: undefined,
        defaultCode: state.defaultCode,
      }
    case ActionTypes.LOAD_CURRENCY_SYMBOLS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.LOAD_CURRENCY_SYMBOLS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: payload.error,
      }
    case ActionTypes.SET_DEFAULT_CURRENCY:
      return {
        ...state,
        defaultCode: payload.code,
      }
    default:
      break
  }

  return state
}

import ActionTypes from '../middleware/actionTypes'

const initialState = {
  entities: {},
  result: [],
  isFetching: false,
  isError: false,
  error: undefined,
}

/* eslint import/prefer-default-export: 0 */
export function currencies(state = initialState, action) {
  const { type, payload = {} } = action

  console.log(action)

  switch (type) {
    case ActionTypes.LOAD_CURRENCY_SYMBOLS_SUCCESS:
    // console.log(payload.entities)
      return {
        entities: payload.entities,
        result: payload.result,
        isFetching: false,
        isError: false,
        error: undefined,
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
    case ActionTypes.LOAD_CURRENCY_NAMES_SUCCESS: {
      const entities = state.entities.currency
      const keys = Object.keys(payload.symbols)
      const newEntities = keys.reduce((acc, v) => {
        if (entities[v]) {
          acc[v] = {
            ...entities[v],
            name: payload.symbols[v],
          }
          return acc
        }
        return acc
      }, {})

      return {
        entities: { currency: newEntities },
        result: Object.keys(newEntities),
        isFetching: false,
        isError: false,
        error: undefined,
      }
    }
    default:
      break
  }

  return state
}

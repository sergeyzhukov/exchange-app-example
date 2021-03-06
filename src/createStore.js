import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { autoRehydrate, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { reducer as formReducer } from 'redux-form'
import * as reducers from './reducers'

export default () => {
  const store = createStore(
    combineReducers({ form: formReducer, ...reducers }),
    compose(applyMiddleware(apiMiddleware), autoRehydrate())
  )
  persistStore(store, { storage: AsyncStorage, blacklist: ['form'] })
  return store
}

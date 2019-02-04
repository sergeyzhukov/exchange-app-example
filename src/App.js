import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './createStore'
import createRootNavigationStack from './RootNavigationStack'

const store = createStore()
const RootStack = createRootNavigationStack()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}

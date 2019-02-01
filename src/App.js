/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

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

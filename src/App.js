/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import DashboardScreen from './screens/DashboardScreen'

const RootStack = createAppContainer(createBottomTabNavigator({
  Dashboard: DashboardScreen,
}))

export default class App extends Component {
  render() {
    return (
      <RootStack />
    )
  }
}

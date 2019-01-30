/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation'
import DashboardScreen from './screens/DashboardScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import ReceiveScreen from './screens/ReceiveScreen'
import CurrencyScreen from './screens/CurrencyScreen'

const TransactionsStack = createStackNavigator({
  Transactions: TransactionsScreen,
})

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  Currency: CurrencyScreen,
  Receive: ReceiveScreen,
})

DashboardStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}


const RootStack = createAppContainer(createBottomTabNavigator({
  Dashboard: DashboardStack,
  Exchange: TransactionsStack,
  Transactions: TransactionsStack,
}))

export default class App extends Component {
  render() {
    return (
      <RootStack />
    )
  }
}

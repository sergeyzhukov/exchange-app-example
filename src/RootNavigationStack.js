import React from 'react'
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Entypo'
import DashboardScreen from './screens/DashboardScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import ReceiveScreen from './screens/ReceiveScreen'
import WithdrawScreen from './screens/WithdrawScreen'
import CurrencyScreen from './screens/CurrencyScreen'
import AddCurrencyScreen from './screens/AddCurrencyScreen'

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  Currency: CurrencyScreen,
})

const AddCurrencyStack = createStackNavigator({ AddCurrencyScreen })
const ReceiveStack = createStackNavigator({ ReceiveScreen })
const WithdrawStack = createStackNavigator({ WithdrawScreen })

AddCurrencyStack.navigationOptions = {
  gesturesEnabled: false,
}

const DashboardTabStack = createStackNavigator({
  Dashboard: DashboardStack,
  AddCurrency: AddCurrencyStack,
  Receive: ReceiveStack,
  Withdraw: WithdrawStack,
}, { mode: 'modal', headerMode: 'none' })

DashboardTabStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0 || navigation.state.routes[0].index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Accounts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="briefcase" size={22} color={tintColor} />
    ),
  }
}

const TransactionsStack = createStackNavigator({
  Transactions: TransactionsScreen,
})

TransactionsStack.navigationOptions = {
  tabBarLabel: 'Transactions',
  headerTintColor: '#4072B8',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={22} color={tintColor} />
  ),
}

export default () => createAppContainer(createBottomTabNavigator(
  { Dashboard: DashboardTabStack, Transactions: TransactionsStack },
  {
    tabBarOptions: {
      activeTintColor: '#4072B8',
    },
  }
))

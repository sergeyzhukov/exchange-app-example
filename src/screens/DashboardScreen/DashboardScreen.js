import React, { Component } from 'react'
import {
  View, StyleSheet, SafeAreaView, StatusBar, Text, FlatList, TouchableOpacity,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'


import DashboardListItem from '../../components/DashboardListItem'

const TICKERS = [
  {
    type: 'currency',
    base: 'USD',
    amount: 303.43,
  },
  {
    type: 'currency',
    base: 'EUR',
    amount: 119.33,
  },
  {
    type: 'currency',
    base: 'CHF',
    amount: 4053.11,
  },
  {
    type: 'add_more',
  },
]

export default class DashboardScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Dashboard',
    header: null,
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#4072B8',
    },
  }

  handleTabFocus = () => {
    StatusBar.setBarStyle('light-content')
  }

  handleBlur = () => {
    StatusBar.setBarStyle('dark-content')
  }

  keyExtractor = item => `${item.type}_${item.base}`

  renderItem = ({ item }) => {
    switch (item.type) {
      case 'currency': {
        const { base, amount } = item
        return (
          <DashboardListItem
            base={base}
            amount={amount}
            onPress={this.handleItemPress(base)}
          />
        )
      }
      case 'add_more':
        return (
          <TouchableOpacity style={styles.addMoreContainer}>
            <Text>Add currency</Text>
          </TouchableOpacity>
        )
      default:
        return null
    }
  }

  handleItemPress = base => () => {
    this.props.navigation.navigate('Currency')
  }

  renderTableHeader = () => (
    <View style={styles.topContainer}>
      <Text style={styles.topTotal}>Total balance</Text>
      <Text style={styles.topTotalValue}>32 USD</Text>
    </View>
  )

  renderSeparator = () => <View style={styles.separator} />

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigationEvents onWillFocus={this.handleTabFocus} onWillBlur={this.handleBlur} />
        {this.renderTableHeader()}
        <View style={styles.innerContainer}>
          <FlatList
            data={TICKERS}
            style={styles.table}
            renderItem={this.renderItem}
            han
            keyExtractor={this.keyExtractor}

            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4072B8',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  table: {
    flex: 1,
  },
  addMoreContainer: {
    height: 54,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: '#C8C7CC',
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
  topContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#4072B8',
  },
  topTotal: {
    color: 'white',
    fontSize: 12,
  },
  topTotalValue: {
    fontWeight: '300',
    fontSize: 32,
    letterSpacing: -1.0,
    color: 'white',
  },
})

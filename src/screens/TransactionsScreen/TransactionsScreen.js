import React, { Component } from 'react'
import {
  View, StyleSheet, SafeAreaView, StatusBar, Text, FlatList,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'

const TICKERS = [
  {
    base: 'USD',
    amount: 303.43,
  },
  {
    base: 'EUR',
    amount: 119.33,
  },
  {
    base: 'CHF',
    amount: 4053.11,
  },
]

export default class TransactionsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Transactions',
  }

  handleTabFocus = () => {
    StatusBar.setBarStyle('dark-content')
  }

  renderItem = ({ item }) => {
    const { base, amount } = item
    return <View />
  }

  renderSeparator = () => <View style={styles.separator} />

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onWillFocus={this.handleTabFocus} />
        <View style={styles.innerContainer}>
          <FlatList
            data={[]}
            style={styles.table}
            renderItem={this.renderItem}
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
  separator: {
    backgroundColor: '#C8C7CC',
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
  topContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#4072B8',
  },
  topTotal: {
    color: 'white',
    fontSize: 12,
  },
  topTotalValue: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
})

import React, { Component } from 'react'
import {
  View, StyleSheet, Text, FlatList,
} from 'react-native'
import ActionButton from '../../components/ActionButton'
import TransactionListItem from '../../components/TransactionListItem'

const TRANSACTIONS = [
  {
    id: 1,
    title: 'ePayments card load',
    timestamp: 1929393,
    amount: 1300,
  },
  {
    id: 2,
    title: 'ePayments card load',
    timestamp: 1929393,
    amount: 1300,
  },
  {
    id: 3,
    title: 'ePayments card load',
    timestamp: 1929393,
    amount: 1300,
  },
]

export default class CurrencyScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    headerStyle: {
      backgroundColor: '#4072B8',
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    title: 'USD',
  }

  keyExtractor = item => item.id.toString()

  renderItem = ({ item }) => {
    const { title, amount } = item
    return <TransactionListItem title={title} amount={amount} />
  }

  handleActionButton = type => () => {
    this.props.navigation.navigate(type)
  }

  renderTableHeader = () => (
    <View style={styles.topContainer}>
      <Text style={styles.topTotalValue}>32 USD</Text>
      <View style={styles.actionsContainer}>
        <ActionButton title="WITHDRAWAL" />
        <ActionButton title="EXCHANGE" />
        <ActionButton title="RECEIVE" onPress={this.handleActionButton('Receive')} />
      </View>
    </View>
  )

  renderSeparator = () => <View style={styles.separator} />

  render() {
    return (
      <FlatList
        data={TRANSACTIONS}
        style={styles.table}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={this.renderTableHeader}
        ItemSeparatorComponent={this.renderSeparator}
      />
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
  actionsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  separator: {
    backgroundColor: '#C8C7CC',
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
  topContainer: {
    paddingVertical: 16,
    backgroundColor: '#4072B8',
  },
  topTotalValue: {
    fontWeight: '300',
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
  },
})

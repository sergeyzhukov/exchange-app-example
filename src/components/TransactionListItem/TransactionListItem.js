import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import transactionStatuses from '../../constants/transactionStatuses'
import { formatCurrency } from '../../utils/formatters'

export default ({ transaction, onPress, showAccount }) => {
  const { operation, amount, timestamp, symbol, account } = transaction
  const status = transactionStatuses[operation]
  const date = new Date(timestamp).toLocaleTimeString()

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.icon} />
      <View style={styles.operationContainer}>
        <Text style={styles.status}>{showAccount ? `(${account}) ` : ''}{status.description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.amount}>{status.increase ? '+' : '-'}{formatCurrency(amount)}{symbol}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#efefef',
  },
  operationContainer: {
    flex: 1,
  },
  status: {
    fontSize: 14,
    color: 'black',
    letterSpacing: -0.2,
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    color: '#999999',
  },
  amount: {
    fontSize: 17,
    // fontWeight: '500',
    color: 'black',
  },
})

import React, { Component } from 'react'
import {
  View, StyleSheet, Text, SectionList, StatusBar,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ActionButton from '../../components/ActionButton'
import TransactionListItem from '../../components/TransactionListItem'
import TransactionSectionHeader from '../../components/TransactionSectionHeader'
import SeparatorView from '../../components/SeparatorView'
import {
  getCurrencyByCodeSelector,
  getTransactionsByAccountListSelector,
  getGroupedTransactionsListSelector,
  getAccountByCodeSelector,
} from '../../selectors'
import { formatCurrency } from '../../utils/formatters'

class CurrencyScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    headerStyle: {
      // backgroundColor: '#4072B8',
      borderBottomWidth: 0,
    },
    headerTransparent: true,
    headerTintColor: '#fff',
  }

  keyExtractor = item => item.uuid

  handleActionButton = type => () => {
    const { navigation } = this.props

    navigation.navigate(type, {
      code: navigation.getParam('code'),
    })
  }

  handleFocus = () => {
    StatusBar.setBarStyle('light-content')
  }

  renderHeader = () => {
    const { account, currency } = this.props

    return (
      <View style={styles.topContainer}>
        <Text style={styles.topTotal}>{currency.name}</Text>
        <Text style={styles.topTotalValue}>{formatCurrency(account.balance)} {currency.symbol_native}</Text>
        <View style={styles.actionsContainer}>
          <ActionButton title="WITHDRAWAL" iconName="arrow-with-circle-up" />
          <ActionButton title="EXCHANGE" iconName="swap" />
          <ActionButton
            title="RECEIVE"
            iconName="arrow-with-circle-down"
            onPress={this.handleActionButton('Receive')}
          />
        </View>
      </View>
    )
  }

  renderItem = ({ item }) => <TransactionListItem transaction={item} />

  renderSectionHeader = ({ section: { title } }) => (
    <TransactionSectionHeader title={title} />
  )

  renderSeparator = () => <SeparatorView />

  render() {
    const { transactions } = this.props

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.handleFocus} />
        {this.renderHeader()}
        <SectionList
          sections={transactions}
          style={styles.table}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const codeSelector = (state, props) => props.navigation.getParam('code')
const transactionsSelector = getTransactionsByAccountListSelector(codeSelector)

const mapStateToProps = createSelector(
  getCurrencyByCodeSelector(codeSelector),
  getGroupedTransactionsListSelector(transactionsSelector),
  getAccountByCodeSelector(codeSelector),
  (currency, transactions, account) => ({ currency, transactions, account })
)

export default connect(mapStateToProps, null)(CurrencyScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4072B8',
    flex: 1,
  },
  table: {
    flex: 1,
    backgroundColor: 'white',
  },
  actionsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  topContainer: {
    paddingVertical: 16,
    paddingTop: 36,
    marginBottom: 4,
    backgroundColor: '#4072B8',
  },
  topTotal: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  topTotalValue: {
    fontWeight: '300',
    fontSize: 32,
    letterSpacing: -1.0,
    color: 'white',
    textAlign: 'center',
  },
})
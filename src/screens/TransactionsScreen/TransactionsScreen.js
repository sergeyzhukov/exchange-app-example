import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, StatusBar, SectionList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { createSelector } from 'reselect'
import TransactionListItem from '../../components/TransactionListItem'
import SeparatorView from '../../components/SeparatorView'
import TransactionSectionHeader from '../../components/TransactionSectionHeader'
import {
  getGroupedTransactionsListSelector,
  getTransactionsListSelector,
} from '../../selectors'
import Colors from '../../utils/colors'

class TransactionsScreen extends Component {
  static navigationOptions = {
    title: 'Transactions',
  }

  keyExtractor = item => item.uuid

  handleTabFocus = () => {
    StatusBar.setBarStyle('dark-content')
  }

  renderSectionHeader = ({ section: { title } }) => (
    <TransactionSectionHeader title={title} />
  )

  renderItem = ({ item }) => <TransactionListItem transaction={item} showAccount />

  renderSeparator = () => <SeparatorView />

  render() {
    const { transactions } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onWillFocus={this.handleTabFocus} />
        <SectionList
          sections={transactions}
          keyExtractor={this.keyExtractor}
          style={styles.table}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={this.renderSeparator}
        />

      </SafeAreaView>
    )
  }
}

const mapStateToProps = createSelector(
  getGroupedTransactionsListSelector(getTransactionsListSelector),
  transactions => ({ transactions })
)

export default connect(mapStateToProps, null)(TransactionsScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BRAND,
    flex: 1,
  },
  table: {
    backgroundColor: 'white',
    flex: 1,
  },
})

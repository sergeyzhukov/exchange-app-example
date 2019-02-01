import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { NavigationEvents } from 'react-navigation'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { loadCurrencyNames, loadCurrencySymbols } from '../../actions'
import DashboardListItem from '../../components/DashboardListItem'
import SeparatorView from '../../components/SeparatorView'
import { accountsListSelector, getCurrenciesDictionarySelector } from '../../selectors'

class DashboardScreen extends Component {
  static navigationOptions = {
    headerBackTitle: null,
    headerTransparent: true,
    headerStyle: {
      borderBottomWidth: 0,
    },
  }

  componentDidMount() {
    this.props.loadCurrencySymbols().then(() => {
      this.props.loadCurrencyNames()
    })
  }

  handleTabFocus = () => {
    StatusBar.setBarStyle('light-content')
  }

  handleBlur = () => {
    StatusBar.setBarStyle('dark-content')
  }

  keyExtractor = item => `${item.type}_${item.code}`

  handleAddCurrency = () => {
    this.props.navigation.navigate('AddCurrency')
  }

  handleItemPress = base => () => {
    this.props.navigation.navigate('Currency', {
      code: base,
    })
  }

  renderHeader = () => (
    <View style={styles.topContainer}>
      <Text style={styles.topTotal}>Total balance</Text>
      <Text style={styles.topTotalValue}>32 USD</Text>
    </View>
  )

  renderSeparator = () => <SeparatorView />

  renderItem = ({ item }) => {
    const { currencies } = this.props
    const { code, balance, nativeSymbol } = item
    return (
      <DashboardListItem
        code={code}
        balance={balance}
        name={currencies[code].name}
        nativeSymbol={nativeSymbol}
        onPress={this.handleItemPress(code)}
      />
    )
  }

  renderAddButton = () => (
    <TouchableOpacity style={styles.addButton} onPress={this.handleAddCurrency}>
      <Icon name="plus" size={28} color="white" />
    </TouchableOpacity>
  )

  render() {
    const { accounts } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigationEvents onWillFocus={this.handleTabFocus} onWillBlur={this.handleBlur} />
        {this.renderHeader()}
        <FlatList
          data={accounts}
          style={styles.table}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {this.renderAddButton()}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = createSelector(
  accountsListSelector,
  getCurrenciesDictionarySelector,
  ({ accounts }, { currencies }) => ({ accounts, currencies })
)

export default connect(
  mapStateToProps,
  { loadCurrencyNames, loadCurrencySymbols }
)(DashboardScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4072B8',
    flex: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4072B8',
    borderRadius: 24,
    position: 'absolute',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    right: 16,
    bottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    flex: 1,
    backgroundColor: 'white',
  },
  addMoreContainer: {
    height: 54,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
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

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { createCurrenciesListSelector } from '../../selectors/currencies'
import { addAccount } from '../../actions'
import CloseModalButton from '../../components/CloseModalButton'
import SeparatorView from '../../components/SeparatorView'

const ITEM_HEIGHT = 44

class AddCurrencyScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Transactions',
    title: 'Add currency',
    gesturesEnabled: false,
    headerLeft: (<CloseModalButton onPress={() => navigation.dismiss()} />),
  })

  keyExtractor = item => item.code

  getItemLayout = (data, index) => (
    { length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + StyleSheet.hairlineWidth) * index, index }
  )

  handleCurrencyPress = ({ code, symbol_native: native }) => async () => {
    await this.props.addAccount(code, native)
    this.props.navigation.dismiss()
  }

  renderItem = ({ item }) => {
    const { code, name, symbol_native: native } = item

    return (
      <TouchableOpacity
        style={styles.currencyRowContainer}
        onPress={this.handleCurrencyPress(item)}
      >
        <View>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.name}>{name} ({native})</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator = () => <SeparatorView />

  render() {
    const { currencies } = this.props

    return (
      <FlatList
        data={currencies}
        style={styles.table}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        getItemLayout={this.getItemLayout}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
}

const mapStateToProps = createSelector(
  createCurrenciesListSelector,
  ({ currencies }) => ({
    currencies,
  })
)

export default connect(mapStateToProps, { addAccount })(AddCurrencyScreen)

const styles = StyleSheet.create({
  table: {
    flex: 1,
  },
  currencyRowContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  code: {
    color: 'black',
    fontWeight: '500',
  },
  name: {
    fontSize: 12,
    color: '#747474',
  },
})

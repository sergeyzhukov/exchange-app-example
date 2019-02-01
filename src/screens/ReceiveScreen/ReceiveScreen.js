import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, TextInput } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import BlueActionButton from '../../components/BlueActionButton'
import CloseModalButton from '../../components/CloseModalButton'
import { receiveFundsToAccount } from '../../actions'
import { getCurrencyByCodeSelector } from '../../selectors'

class ReceiveScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Transactions',
    title: 'Receive',
    headerTintColor: '#4072B8',
    headerTitleStyle: { color: 'black' },
    headerLeft: (<CloseModalButton onPress={() => navigation.dismiss()} />),
  })

  state = {
    amount: undefined,
  }

  handleTabFocus = () => {
    StatusBar.setBarStyle('dark-content')
  }

  handleTextChange = (text) => {
    this.setState({ amount: text })
  }

  handleFocus = () => {
    StatusBar.setBarStyle('dark-content')
  }

  handleBlur = () => {
    StatusBar.setBarStyle('light-content')
  }

  handleReceivePress = async () => {
    const code = this.props.navigation.getParam('code')
    await this.props.receiveFundsToAccount(code, Number(this.state.amount))
    this.props.navigation.goBack()
  }

  render() {
    const { amount } = this.state
    const { currency } = this.props

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.handleFocus} onWillBlur={this.handleBlur} />
        <TextInput
          keyboardType="decimal-pad"
          placeholder={`Enter amount of ${currency.symbol_native} to receive`}
          style={styles.input}
          autoFocus
          onChangeText={this.handleTextChange}
          value={amount}
        />
        <BlueActionButton
          title="Receive"
          style={styles.receiveButton}
          onPress={this.handleReceivePress}
        />
      </View>
    )
  }
}

const codeSelector = (state, props) => props.navigation.getParam('code')

const mapStateToProps = createSelector(
  getCurrencyByCodeSelector(codeSelector),
  currency => ({ currency })
)

export default connect(mapStateToProps, { receiveFundsToAccount })(ReceiveScreen)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  input: {
    height: 44,
    fontSize: 17,
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  receiveButton: {
    marginTop: 48,
  },
})

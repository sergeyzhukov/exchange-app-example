import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import BlueActionButton from '../../components/BlueActionButton'
import CloseModalButton from '../../components/CloseModalButton'
import MaterialFormTextInput from '../../components/MaterialFormTextInput'
import { receiveFundsToAccount } from '../../actions'
import { getCurrencyByCodeSelector } from '../../selectors'
import { validationRequired, validationMoreThan0, normalizeCurrency } from '../../utils/reduxFormHelpers'

class ReceiveScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Transactions',
    title: 'Receive',
    headerLeft: (<CloseModalButton onPress={() => navigation.dismiss()} />),
  })

  handleFocus = () => {
    StatusBar.setBarStyle('dark-content')
  }

  handleBlur = () => {
    StatusBar.setBarStyle('light-content')
  }

  handleReceivePress = async (params) => {
    const code = this.props.navigation.getParam('code')
    await this.props.receiveFundsToAccount(code, Number(params.amount))
    this.props.navigation.dismiss()
  }

  render() {
    const { currency, handleSubmit } = this.props

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.handleFocus} onWillBlur={this.handleBlur} />
        <Field
          name="amount"
          component={MaterialFormTextInput}
          keyboardType="decimal-pad"
          placeholder={`Enter amount of ${currency.symbol_native} to receive`}
          normalize={normalizeCurrency}
          validate={[validationRequired, validationMoreThan0]}
          title="Amount"
          autoFocus
        />
        <BlueActionButton
          title="Receive"
          style={styles.receiveButton}
          onPress={handleSubmit(this.handleReceivePress)}
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

const Screen = connect(mapStateToProps, { receiveFundsToAccount })(ReceiveScreen)
export default reduxForm({ form: 'receive' })(Screen)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  receiveButton: {
    marginTop: 48,
  },
})

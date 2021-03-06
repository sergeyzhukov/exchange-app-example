import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import TouchID from 'react-native-touch-id'
import {
  reduxForm,
  Field,
  SubmissionError,
  getFormValues,
  getFormSubmitErrors,
  isValid,
} from 'redux-form'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import get from 'lodash/get'
import BlueActionButton from '../../components/BlueActionButton'
import CloseModalButton from '../../components/CloseModalButton'
import { loadExchangeRates, exchangeFunds } from '../../actions'
import {
  accountsListSelector,
  getCurrenciesDictionarySelector,
  getExchangeRates,
  getAccountByCodeSelector,
} from '../../selectors'
import { formatCurrency } from '../../utils/formatters'
import {
  validationRequired,
  validationMoreThan0,
  normalizeCurrency,
} from '../../utils/reduxFormHelpers'
import Colors from '../../utils/colors'

const deviceWidth = Dimensions.get('window').width
const FORM_NAME = 'exchange'

class ExchangeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Exchange',
    headerLeft: (<CloseModalButton onPress={() => navigation.dismiss()} />),
  })

  state = {
    currentAccountIndex: 0,
  }

  componentWillMount() {
    this.props.loadExchangeRates(this.props.navigation.getParam('code'))
  }

  handleFocus = () => {
    StatusBar.setBarStyle('dark-content')
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF')
    }
  }

  handleExchangePress = async (params) => {
    const { amount } = params
    const { currentAccount } = this.props

    if (amount > currentAccount.balance) {
      throw new SubmissionError({ amount: 'Insufficient funds' })
    }

    try {
      await TouchID.isSupported()
      const authentificated = await TouchID.authenticate(
        `to perform exchange of ${amount} ${currentAccount.code}`,
        { passcodeFallback: false }
      )
      if (authentificated) {
        this.performExchangeForCurrentAccount(amount)
      }
    } catch (error) {
      if (error.details === 'Not supported.' || error.name === 'RCTTouchIDNotSupported') {
        this.performExchangeForCurrentAccount(amount)
      }
    }
  }

  handleScrollDrag = (event) => {
    const { currentAccountIndex } = this.state

    const xOffset = event.nativeEvent.contentOffset.x
    const page = Math.round(xOffset / deviceWidth)

    if (page !== currentAccountIndex) {
      this.setState({ currentAccountIndex: page })
    }
  }

  performExchangeForCurrentAccount = async (amount) => {
    const { currentAccountIndex } = this.state
    const { currentAccount, accounts, rates } = this.props
    const selectedAccount = accounts[currentAccountIndex]
    const rateKey = `${currentAccount.code}/${selectedAccount.code}`

    await this.props.exchangeFunds(
      currentAccount.code,
      selectedAccount.code,
      Number(amount),
      rates[rateKey]
    )
    this.props.navigation.dismiss()
  }

  renderPageIndicators = () => {
    const { accounts } = this.props
    const { currentAccountIndex } = this.state

    return (
      <View style={styles.pageIndicatorsContainer}>
        {accounts.map((account, index) => (
          <View
            key={`page_${account.code}`}
            style={[
              styles.pageIndicator,
              (currentAccountIndex === index) && styles.pageIndicatorActive,
            ]}
          />
        ))}
      </View>
    )
  }

  renderAccountsToExchange = () => {
    const { accounts, rates, currentAccount, amount } = this.props

    return (
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={this.handleScrollDrag}
        showsHorizontalScrollIndicator={false}
      >
        {accounts.map(account => (
          <View style={styles.exchangeContainer} key={account.code}>
            <View style={styles.codeContainer}>
              <Text style={styles.code}>{account.code}</Text>
              <Text style={styles.balance}>
                Balance: {formatCurrency(account.balance)} {account.nativeSymbol}
              </Text>
            </View>
            <Text style={styles.input}>
              {formatCurrency(rates[`${currentAccount.code}/${account.code}`] * amount)}
            </Text>
          </View>
        ))}
      </ScrollView>
    )
  }

  renderAmountInput = ({ input: { onChange, ...restInput } }) => (
    <TextInput
      style={styles.input}
      keyboardType="decimal-pad"
      onChangeText={onChange}
      autoFocus
      placeholder="0"
      {...restInput}
    />
  )

  render() {
    const { handleSubmit, rates, currentAccount, accounts, errors, isFormValid } = this.props
    const { currentAccountIndex } = this.state

    const selectedAccount = accounts[currentAccountIndex]
    const rateKey = `${currentAccount.code}/${selectedAccount.code}`

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.handleFocus} />
        <View style={styles.exchangeContainer}>
          <View style={styles.codeContainer}>
            <Text style={styles.code}>{currentAccount.code}</Text>
            <Text style={styles.balance}>
              Balance: {formatCurrency(currentAccount.balance)} {currentAccount.nativeSymbol}
            </Text>
            {errors && errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
          </View>
          <Field
            name="amount"
            component={this.renderAmountInput}
            normalize={normalizeCurrency}
            validate={[validationRequired, validationMoreThan0]}
          />
        </View>
        <View style={styles.rateContainer}>
          <Text style={styles.rate}>
            1 {currentAccount.nativeSymbol} = {formatCurrency(rates[rateKey])}
            {selectedAccount.nativeSymbol}
          </Text>
        </View>
        <View>
          {this.renderAccountsToExchange()}
        </View>
        {accounts.length > 1 && this.renderPageIndicators()}
        <BlueActionButton
          title="Exchange"
          disabled={!isFormValid}
          style={styles.receiveButton}
          onPress={handleSubmit(this.handleExchangePress)}
        />
      </View>
    )
  }
}

const codeSelector = (state, props) => props.navigation.getParam('code')

const mapStateToProps = createSelector(
  codeSelector,
  accountsListSelector,
  getAccountByCodeSelector(codeSelector),
  getCurrenciesDictionarySelector,
  getExchangeRates,
  getFormValues(FORM_NAME),
  isValid(FORM_NAME),
  getFormSubmitErrors(FORM_NAME),
  (code, { accounts }, currentAccount, { currencies }, rates, values, isFormValid, errors) => ({
    accounts: accounts.filter(account => account.code !== code),
    currentAccount,
    currencies,
    rates,
    isFormValid,
    amount: parseFloat(get(values, 'amount', 0)),
    errors,
  })
)

const Screen = connect(mapStateToProps, { loadExchangeRates, exchangeFunds })(ExchangeScreen)
export default reduxForm({ form: FORM_NAME })(Screen)

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flex: 1,
  },
  code: {
    fontWeight: '300',
    fontSize: 32,
    color: '#000000',
  },
  error: {
    fontSize: 13,
    color: 'red',
    marginTop: 4,
  },
  receiveButton: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  input: {
    justifyContent: 'flex-end',
    fontSize: 32,
    flex: 1,
    textAlign: 'right',
  },
  exchangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: deviceWidth,
  },
  rateContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  rate: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    color: '#000000',
    fontSize: 12,
  },
  balance: {
    color: '#747474',
    fontSize: 12,
  },
  pageIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: Colors.BRAND,
    opacity: 0.2,
  },
  pageIndicatorActive: {
    backgroundColor: Colors.BRAND,
    opacity: 1.0,
  },
  pageIndicatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
})

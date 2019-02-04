import React from 'react'
import renderer from 'react-test-renderer'
import TransactionListItem from './TransactionListItem'

const WITHDRAW_TRANSACTION = {
  operation: 'withdrawal',
  amount: 33,
  timestamp: 1,
  symbol: '$',
  account: 'USD',
}

const RECEIVE_TRANSACTION = {
  operation: 'receive',
  amount: 33,
  timestamp: 1,
  symbol: '$',
  account: 'USD',
}

test('render <TransactionListItem /> with receive tx', () => {
  const component = <TransactionListItem transaction={RECEIVE_TRANSACTION} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render <TransactionListItem /> with withdraw tx', () => {
  const component = <TransactionListItem transaction={WITHDRAW_TRANSACTION} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render <TransactionListItem /> with withdraw tx and showAccount', () => {
  const component = <TransactionListItem transaction={WITHDRAW_TRANSACTION} showAccount />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

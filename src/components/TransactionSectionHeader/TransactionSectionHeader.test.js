import React from 'react'
import renderer from 'react-test-renderer'
import TransactionSectionHeader from './TransactionSectionHeader'

test('renders correctly', () => {
  const component = <TransactionSectionHeader />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

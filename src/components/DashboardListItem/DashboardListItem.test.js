import React from 'react'
import renderer from 'react-test-renderer'
import DashboardListItem from './DashboardListItem'

test('renders correctly', () => {
  const component = <DashboardListItem />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import renderer from 'react-test-renderer'
import BlueActionButton from './BlueActionButton'

test('renders correctly', () => {
  const component = <BlueActionButton />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly width disabled', () => {
  const component = <BlueActionButton disabled />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

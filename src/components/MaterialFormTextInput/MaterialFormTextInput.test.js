import React from 'react'
import renderer from 'react-test-renderer'
import MaterialFormTextInput from './MaterialFormTextInput'

test('render <MaterialFormTextInput />', () => {
  const input = { value: '' }
  const meta = { touched: false }

  const component = <MaterialFormTextInput input={input} meta={meta} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render <MaterialFormTextInput /> with some input ', () => {
  const input = { value: 'test' }
  const meta = { touched: true }

  const component = <MaterialFormTextInput input={input} meta={meta} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render <MaterialFormTextInput /> with error', () => {
  const input = { value: 'test' }
  const meta = { touched: true, error: 'Error' }

  const component = <MaterialFormTextInput input={input} meta={meta} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import { test } from 'ava'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Formate from '../../src'

test('it can render a simple form', (t) => {
  const onChange = sinon.spy()

  function TestForm ({ Field, Form, formData, method }) {
    return (
      <Form method={method}>
        <Field component='input' onChange={onChange} value='xy' />
      </Form>
    )
  }
  const DecoratedTestForm = Formate(TestForm)
  const form = mount(<DecoratedTestForm method='post' />)
  const input = form.find('input')

  t.deepEqual(form.props(), {
    method: 'post'
  })

  t.deepEqual(input.props(), {
    onChange,
    value: 'xy'
  })
})

import React, { PropTypes } from 'react'

function createDecoratedFormFieldComponent (decorateField) {
  // Functional stateless component
  function DecoratedFormField ({ component, ...props }) {
    const decorated = decorateField({ component, props, statics: {} })
    const DecoratedFieldComponent = Object.assign(decorated.component, decorated.statics)

    return <DecoratedFieldComponent {...decorated.props} />
  }

  DecoratedFormField.propTypes = {
    component: PropTypes.func.isRequired
  }

  return DecoratedFormField
}

export { createDecoratedFormFieldComponent }

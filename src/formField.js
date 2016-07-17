import React, { PropTypes } from 'react'

function createDecoratedFormFieldComponent (decorateField) {
  // Functional stateless component
  function DecoratedFormField ({ component, ...props }) {
    const decorated = decorateField({ component, props, statics: {} })
    const DecoratedFieldComponent = decorated.component

    Object.keys(decorated.statics).forEach((staticPropName) => {
      DecoratedFieldComponent[ staticPropName ] = decorated.statics[ staticPropName ]
    })

    return <DecoratedFieldComponent {...decorated.props} />
  }

  DecoratedFormField.propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]).isRequired
  }

  return DecoratedFormField
}

export { createDecoratedFormFieldComponent }

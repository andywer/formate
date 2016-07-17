import React from 'react'

function createDecoratedFormComponent (decorateForm) {
  // Functional stateless component
  function DecoratedForm (props) {
    const decorated = decorateForm({ component: 'form', props, statics: {} })
    const DecoratedFormComponent = decorated.component

    Object.keys(decorated.statics).forEach((staticPropName) => {
      DecoratedFormComponent[ staticPropName ] = decorated.statics[ staticPropName ]
    })

    return <DecoratedFormComponent {...decorated.props} />
  }

  return DecoratedForm
}

export { createDecoratedFormComponent }

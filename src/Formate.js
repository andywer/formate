import React from 'react'
import { applyMiddlewares } from './applyMiddlewares'
import { createDecoratedFormFieldComponent } from './formField'
import { dedup } from './util'

function Formate (FormComponent, middlewares = []) {
  return class FormateForm extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        additional: {},
        formData: {}
      }

      const initial = {
        decorateField: ({ component, props, statics }) => ({ component, props, statics }),
        formProps: props,
        getFormData: () => this.state.formData,
        setFormData: (formDataUpdate) => this.setFormData(formDataUpdate),
        getStateData: () => this.state.additional,
        setStateData: (additionalState) => this.state.setAdditionalState(additionalState)
      }

      const enhanced = applyMiddlewares(initial, dedup(middlewares))
      const { decorateField, formProps, getFormData, setFormData } = enhanced

      const Field = createDecoratedFormFieldComponent(decorateField)
      Object.assign(this, { Field, formProps, getFormData, setFormData })
    }

    render () {
      const { formData } = this.state
      const { Field, decorateField, formProps, setFormData } = this

      return <FormComponent {...formProps} {...{ Field, formData, setFormData }} />
    }

    /**
     * Merges the given formDataUpdate shallowly into existing form data.
     */
    setFormData (formDataUpdate) {
      this.setState({
        formData: Object.assign(this.state.formData, formDataUpdate)
      })
    }

    /**
     * Merges the given additionalState shallowly into existing additional state data.
     */
    setAdditionalState (additionalState) {
      this.setState({
        additional: Object.assign(this.state.additional, additionalState)
      })
    }
  }
}

export default Formate

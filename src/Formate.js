import React from 'react'
import { applyMiddlewares } from './applyMiddlewares'
import { createDecoratedFormComponent } from './form'
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
        decorateForm: ({ component, props, statics }) => ({ component, props, statics }),
        userFormProps: props,
        getFormData: () => this.state.formData,
        setFormData: (formDataUpdate) => this.setFormData(formDataUpdate),
        getStateData: () => this.state.additional,
        setStateData: (additionalState) => this.state.setAdditionalState(additionalState)
      }

      const enhanced = applyMiddlewares(initial, dedup(middlewares))
      const { decorateField, decorateForm, userFormProps, getFormData, setFormData } = enhanced

      const Field = createDecoratedFormFieldComponent(decorateField)
      const Form = createDecoratedFormComponent(decorateForm)

      Object.assign(this, { Field, Form, userFormProps, getFormData, setFormData })
    }

    render () {
      const { formData } = this.state
      const { Field, Form, decorateField, userFormProps, setFormData } = this

      return <FormComponent {...userFormProps} {...{ Field, Form, formData, setFormData }} />
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

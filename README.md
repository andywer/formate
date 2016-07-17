# formate

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Modular form handling for React.js made easy.


## Usage

```js
import React, { PropTypes } from 'react'
import Formate from 'formate'

const propTypes = {
  Field: PropTypes.object.isRequired
}

function MyForm ({ Field, formData, setFormData }) {
  return (
    <form>
      {/* Rather low-level API; `component='input'` might be used as default if no `component` prop is provided */}
      <Field component='input' name='firstName' />
      {/* A middleware may provide shortcuts to frequently used form field components */}
      <Field.input name='lastName' />

      {/* Manual usage; not recommended, since form field cannot be decorated by middleware */}
      <input name='title' value={formData.title} onChange={(evt) => setFormData('title', evt.target.value)} />
    </form>
  )
}

MyForm.propTypes = propTypes

export default Formate(MyForm)

// - or -
// export default Formate(MyForm, middlewares)

// - or (to pre-configure middlewares) -
// import { preset } from 'formate'
// const formate = preset(middlewares)
// export default formate(MyForm, evenMoreMiddlewares)
```


## Installation

```sh
npm install --save formate
# or --save-dev, depending on your frontend dependency philosophy
```


## How to write a middleware

```js
function myMiddleware (api, hook) {
  // This hook adds a new prop to every form field: 'isEmpty' (boolean)
  hook('formfield', ({ component, props, statics }) => {
    const newProps = { ...props, isEmpty: isFieldEmpty(props.name) }
    return { component, props: newProps, statics }
  })

  // This hook adds a new prop to the form field: 'containsEmptyFields' (boolean)
  hook('form.props', (props) => {
    const formNames = Object.keys(api.getFormData())
    const containsEmptyFields = formNames.findIndex((formName) => isFieldEmpty(formName)) > -1
    return { ...props, containsEmptyFields }
  })

  function isFieldEmpty (name) {
    return api.getFormData()[ formName ] !== ''
  }
}

// Usage:
export default formate(MyForm, [ myMiddleware ])
```


Use the `api` object (first parameter of your middleware) to get/set additional data:

- `formProps`: Object containing the form's props. Use `form.props` hook to alter those props.
- `getFormData`/`setFormData`: Get/set form data (The form fields' value).
- `getStateData`/`setStateData`: Use these methods to get/set additional stateful data on the form (like errors or such).

Hooks you can use:

- `form.props`: Method `(props: object) => props: object`. Use it to change the form element's props.
- `formfield`: Method `({ component: class|function, props: object, statics: object }) => ({ component: class|function, props: object, statics: object })`. Use it to change form field props or statics on the form field class. Or return another component that decorates the form field component.
- `getFormData`, `setFormData`: Override the existing implementations by using these hooks.
- `getStateData`/`setStateData`: Override the existing implementations by using these hooks.


## Credits

The initial idea for this package grew out of enduring brain-storming with
[jhohlfeld](https://github.com/jhohlfeld) who also wrote the initial prototype!

Another influence was [react-reformed](https://github.com/davezuko/react-reformed)
which showed a better way of storing/managing form data as the initial draft by
decorating the whole form and storing form data in the decorating component's state.


## License

MIT. See [LICENSE](./LICENSE) for details.

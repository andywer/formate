# formate [Concept/Draft]

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Modular form handling for React.js made easy. A lot of cool features loosely coupled
via middleware concept.


## Usage

```js
import React, { PropTypes } from 'react'
import Formate from 'formate'

const propTypes = {
  Field: PropTypes.object.isRequired
}

function MyForm ({ Field, Form, formData, setFormData }) {
  return (
    <Form>
      {/* A middleware may provide default getter/setter based on `name` prop */}
      <Field component='input' name='firstName' />
      {/* A middleware may provide shortcuts to frequently used form field components */}
      <Field.input name='lastName' />

      {/* A default submit button could also be provided by a middleware: <Form.SubmitButton /> */}
      <button type='submit'>Submit</button>
    </Form>
  )
}

MyForm.propTypes = propTypes

export default Formate(MyForm, [ middleware1, middleware2 ])

// - or -
// export default Formate(MyForm, middlewares)

// - or (to pre-configure middlewares) -

// import { createPreset } from 'formate'
// const preset1 = createPreset(middlewares)
// const preset2 = preset1.concat(moreMiddlewares)
// export default preset2(MyForm, optionallyEvenMoreMiddlewares)
```

Formate just provides the basic API and middleware API. Middlewares provide all
the fancy functionality like validation, error handling, automatic default
getters/setters and so on.


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
    // returning just `{ props: newProps }` would work, too
  })

  // This hook adds a new prop to the form component (MyForm or similar): 'containsEmptyFields' (boolean)
  hook('userform.props', (props) => {
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

- `userFormProps`: Object containing the user form's props. Use `props` hook to alter those props.
- `getFormData`/`setFormData`: Get/set form data (The form fields' value).
- `getStateData`/`setStateData`: Use these methods to get/set additional stateful data on the form (like errors or such).

Hooks you can use:

- `userform.props`: Method `(props: object) => props: object`. Use it to change the user form element's props.
- `form`: Method `({ component: class|function, props: object, statics: object }) => ({ component: class|function, props: object, statics: object })`. Use it to change form props or statics on the form class. Or return another component that decorates the form component.
- `formfield`: Method `({ component: class|function, props: object, statics: object }) => ({ component: class|function, props: object, statics: object })`. Works like `form`, but for the form field.
- `getFormData`, `setFormData`: Override the existing implementations by using these hooks.
- `getStateData`/`setStateData`: Override the existing implementations by using these hooks.

The `form` and `formfield` hooks are run on `render()`. This gives you the ability to set props / decorate the components according to current form data (use `api.getFormdata()`), but make sure
that they are fast and pure (don't call setters).


## Low level vs. nice by middleware

```js
import React, { PropTypes } from 'react'
import Formate from 'formate'

const propTypes = {
  Field: PropTypes.object.isRequired
}

function MyForm ({ Field, Form, formData, setFormData }) {
  return (
    <Form>
      {/* Rather low-level API; `component='input'` might be used as default if no `component` prop is provided */}
      <Field component='input' name='firstName' />
      {/* A middleware may provide shortcuts to frequently used form field components */}
      <Field.input name='lastName' />

      {/* Manual usage; not recommended, since form field cannot be decorated by middleware */}
      <input name='title' value={formData.title} onChange={(evt) => setFormData('title', evt.target.value)} />
    </Form>
  )
}

MyForm.propTypes = propTypes

export default Formate(MyForm)
```


## Credits

The initial idea for this package grew out of enduring brain-storming with
[jhohlfeld](https://github.com/jhohlfeld) who also wrote the initial prototype!

Another influence was [react-reformed](https://github.com/davezuko/react-reformed)
which showed a better way of storing/managing form data as the initial draft by
decorating the whole form and storing form data in the decorating component's state.


## License

MIT. See [LICENSE](./LICENSE) for details.

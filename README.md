# formate

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

      {/* Manual usage */}
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


## Credits

The initial idea for this package grew out of enduring brain-storming with
[jhohlfeld](https://github.com/jhohlfeld) who also wrote the initial prototype!

Another influence was [react-reformed](https://github.com/davezuko/react-reformed)
which showed a better way of storing/managing form data as the initial draft by
decorating the whole form and storing form data in the decorating component's state.


## License

MIT. See [LICENSE](./LICENSE) for details.

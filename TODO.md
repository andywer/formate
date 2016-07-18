# TODOs

- Middlewares:
  - Form field getter/setter based on field name
  - event.preventDefault() on submit
  - Register form field component shortcuts on `Field`: `Field.input`, `Field.DatePicker`, ...
  - Form field validation
  - Error handling / displaying

- Maybe: Rename `hook` => `provide` in middlewares
- Idea: Maybe the lib can be made framework-agnostic, with some React-bindings on top of it


```js
import Formate from 'formate'

const myForm = Formate(document.querySelector('form.my-form'), [ middleware ])

myForm.initFormFields()

// - or manually -

for (formField of myForm.querySelectorAll('input, select')) {
  myForm.formField(formField, {
    onChange (event) {
      myForm.setFormData('name', event.target.value)
    },
    getValue () {
      return myForm.formData.name
    }
  })
}
```

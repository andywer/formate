/**
 * @param {object} api    Object of functions and properties which represent the middleware API.
 *                        This API object is altered by the middlewares.
 *                        { decorateField, decorateForm, userFormProps, getFormData, setFormData, getStateData, setStateData }
 * @param {function[]} middlewares
 */
function applyMiddlewares (api, middlewares) {
  middlewares.forEach((middleware) => {
    api = applyMiddleware(middleware, api)
  })
  return api
}

function applyMiddleware (middleware, api) {
  function hook (name, method) {
    method.displayName = `${getDisplayName(method)} (Middleware ${getDisplayName(middleware)})`
    api = hookOntoApi(api, name, method)
  }

  middleware(api, hook)
  return api
}

function hookOntoApi (api, name, method) {
  switch (name) {
    case 'userform.props':
      return {
        ...api,
        userFormProps: method(api.userFormProps)
      }

    case 'form':
      return {
        ...api,
        decorateForm () {
          return {
            ...api.decorateForm(params),
            ...method(params)
          }
        }
      }

    case 'formfield':
      return {
        ...api,
        decorateField () {
          return {
            ...api.decorateField(params),
            ...method(params)
          }
        }
      }

    case 'getFormData':
    case 'setFormData':
    case 'getStateData':
    case 'setStateData':
      return {
        ...api,
        [ name ]: method
      }
    default:
      throw new Error('Error in Formate middleware: The hook does not exist: ' + name)
  }
}

function getDisplayName (method) {
  return method.displayName || method.name
}

export { applyMiddlewares }

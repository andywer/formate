/**
 * Usage:
 * const preset1 = createPreset([ middleware1, middleware2 ])
 * const preset2 = preset1.concat([ middleware3 ])
 *
 * // decoration works the same as if you were using Formate itself instead of the preset
 * export default preset2(MyFormComponent, [ anotherMiddleware ])
 */
function createPreset (middlewares) {
  function preset (Component, _middlewares = []) {
    return Formate(Component, middlewares.concat(_middlewares))
  }

  preset.concat = function concat (_middlewares) {
    return createPreset(middlewares.concat(_middlewares))
  }

  return preset
}

export { createPreset }

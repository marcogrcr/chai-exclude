module.exports = (chai, utils) => {
  const Assertion = chai.Assertion

  /**
   * Remove specified properties from an object and return a new object.
   *
   * @param  {Object} obj    The object to remove keys
   * @param  {Array}  props  Array of keys to remove
   * @return {Object}
   */
  function removeKeys (obj, props) {
    const res = {}
    const keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val = obj[key]

      if (props.indexOf(key) === -1) {
        res[key] = val
      }
    }

    return res
  }

  Assertion.addMethod('excluding', function (props) {
    utils.expectTypes(this, ['object'])

    // If exclude parameter(s) are not provided
    if (!props) {
      return this
    }

    if (typeof props === 'string') {
      props = [props]
    }

    this._obj = removeKeys(this._obj, props)

    return this
  })
}
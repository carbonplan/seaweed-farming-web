import ndarray from 'ndarray'

/**
 * Mutates a given object by adding `value` to array at nested location specified by `keys`
 * @param {obj} Object of any structure
 * @param {Array<string>} keys describing nested location where value should be set
 * @param {any} value to be added to array at location specified by keys
 * @returns reference to updated obj
 */
const setObjectValues = (obj, keys, value) => {
  let ref = obj
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      if (!ref[key]) {
        ref[key] = []
      }
    } else {
      if (!ref[key]) {
        ref[key] = {}
      }
    }
    ref = ref[key]
  })

  ref.push(value)
  return obj
}

class DataArray {
  constructor(data, dimensions, coordinates, shape) {
    this.dimensions = dimensions
    this.coordinates = coordinates
    this.ndim = dimensions.length
    this.shape = shape
    this.data = ndarray(data, shape)
  }

  select(selector) {
    let keys = [[]]
    let indexes = [[]]
    this.dimensions.forEach((dimension, dimensionIdx) => {
      const dimensionCoordinates = this.coordinates[dimension]
      const selectorValue = selector[dimension]

      let dimensionKeys
      if (!dimensionCoordinates || dimensionCoordinates.length === []) {
        dimensionKeys = Array(this.shape[dimensionIdx])
          .fill(null)
          .map((el, i) => [null, i])
      } else if (Array.isArray(selectorValue)) {
        dimensionKeys = selectorValue.map((el) => [
          el,
          dimensionCoordinates.indexOf(el),
        ])
      } else {
        dimensionKeys = [[null, dimensionCoordinates.indexOf(selectorValue)]]
      }

      const updatedKeys = []
      const updatedIndexes = []
      dimensionKeys.forEach(([coordinate, i]) => {
        keys.forEach((prevKeys, j) => {
          if (coordinate) {
            updatedKeys.push([...prevKeys, coordinate])
          } else {
            updatedKeys.push(prevKeys)
          }

          const prevIndexes = indexes[j]
          updatedIndexes.push([...prevIndexes, i])
        })
      })

      keys = updatedKeys
      indexes = updatedIndexes
    })

    const valuesToSet = keys.map((key, i) => ({
      keys: key,
      value: this.data.get(...indexes[i]),
    }))

    if (valuesToSet[0].keys.length > 0) {
      const result = {}
      valuesToSet.forEach(({ keys, value }) => {
        setObjectValues(result, keys, value)
      })
      return result
    } else {
      return valuesToSet.map(({ value }) => value)
    }
  }
}

export default DataArray

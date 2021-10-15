import { useState, useEffect, useMemo } from 'react'
import zarr from 'zarr-js'

import DataArray from './data-array'

const pyramid =
  'https://storage.googleapis.com/carbonplan-research/macroalgae/data/processed/zarr-pyramid-0.4'

const useTileData = (dimensions) => {
  const [data, setData] = useState()
  const [coordinates, setCoordinates] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    zarr().load(pyramid + '/0/all_variables', (e, d) => {
      if (e) setError(e)
      setData(d)
    })
    zarr().load(pyramid + '/0/variable', (e, d) => {
      if (e) setError(e)
      setCoordinates(d)
    })
  }, [])

  const value = useMemo(() => {
    if (data && coordinates) {
      const { data: rawData, shape } = data

      const res = new DataArray(
        rawData,
        dimensions,
        { variable: coordinates.data },
        shape
      )

      return res
    }
  }, [data, coordinates, error])

  return { error, data: value }
}

export default useTileData

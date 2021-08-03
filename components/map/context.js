import { createContext, useContext, useMemo, useState } from 'react'

const initialParameters = {
  operatingCost: 63000,
  transportationCost: 0.11,
  capitalCost: 170000,
  harvestCost: 124000,
  lineCost: 0.06,
  depthCostFactor: 2,
  cheapDepth: 10,
  priceyDepth: 100,
}

const initialLayers = {
  COST: true,
  GROWTH: false,
  D2PORT: false,
  DEPTH: false,
}
const initialColorRange = { min: 0, max: 40000 }

const MapContext = createContext({
  map: null,
  setMap: () => {},
  options: null,
})

export const useMapContext = () => {
  return useContext(MapContext)
}

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null)

  const [parameters, setParameters] = useState(initialParameters)
  const [layers, setLayers] = useState(initialLayers)
  const [colorRange, setColorRange] = useState(initialColorRange)
  const [inverted, setInverted] = useState(false)

  const options = useMemo(
    () => ({
      colorRange,
      setColorRange,
      inverted,
      setInverted,
      layers,
      setLayers,
      parameters,
      setParameters,
    }),
    [parameters, layers, colorRange, inverted]
  )

  const handleSet = (value) => {
    // when a previous map is being replaced, `remove` it to free up browser resources
    if (map) {
      map.remove()
    }

    setMap(value)
  }

  return (
    <MapContext.Provider value={{ map, setMap: handleSet, options }}>
      {children}
    </MapContext.Provider>
  )
}

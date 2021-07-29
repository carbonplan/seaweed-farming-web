import { createContext, useContext, useState } from 'react'

const Map = createContext({ map: null, setMap: () => {} })

export const useMap = () => {
  return useContext(Map)
}

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null)

  const handleSet = (value) => {
    // when a previous map is being replaced, `remove` it to free up browser resources
    if (map) {
      map.remove()
    }

    setMap(value)
  }

  return (
    <Map.Provider value={{ map, setMap: handleSet }}>{children}</Map.Provider>
  )
}

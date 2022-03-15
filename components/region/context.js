import { createContext, useContext, useState } from 'react'

const RegionContext = createContext(null)

export const RegionProvider = ({ children }) => {
  const [regionData, setRegionData] = useState(null)
  const [showRegionPicker, setShowRegionPicker] = useState(false)

  return (
    <RegionContext.Provider
      value={{
        regionData,
        setRegionData,
        showRegionPicker,
        setShowRegionPicker,
      }}
    >
      {children}
    </RegionContext.Provider>
  )
}

export const useRegionContext = () => {
  const { regionData, setRegionData, showRegionPicker, setShowRegionPicker } =
    useContext(RegionContext)

  return {
    regionData,
    setRegionData,
    showRegionPicker,
    setShowRegionPicker,
  }
}

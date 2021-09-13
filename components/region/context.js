import { createContext, useContext, useState } from 'react'

const RegionDataContext = createContext(null)

export const RegionDataProvider = ({ children }) => {
  const [regionData, setRegionData] = useState(null)

  return (
    <RegionDataContext.Provider
      value={{
        regionData,
        setRegionData,
      }}
    >
      {children}
    </RegionDataContext.Provider>
  )
}

export const useRegionData = () => {
  const { regionData, setRegionData } = useContext(RegionDataContext)

  return {
    regionData,
    setRegionData,
  }
}

import { createContext, useContext, useMemo, useState } from 'react'
import { useTileData } from '../utils'

const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const { data } = useTileData()

  const globalData = useMemo(() => {
    if (!data) {
      return { loading: true }
    } else {
      const value = data.select({
        variable: [
          'harv_preferred',
          'nharv_preferred',
          'harv_sargassum',
          'nharv_sargassum',
          'harv_eucheuma',
          'nharv_eucheuma',
          'harv_macrocystis',
          'nharv_macrocystis',
          'harv_porphyra',
          'nharv_porphyra',
          // 'harv_saccharina',
          // 'nharv_saccharina',
          'elevation',
          'd2p',
          'wave_height',
          'fseq',
          'd2sink',
          // 'mask',
        ],
      })

      // match format returned by setRegionData
      return { loading: false, value: { all_variables: value } }
    }
  }, [data])

  return (
    <GlobalContext.Provider
      value={{
        globalData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const { globalData } = useContext(GlobalContext)

  return {
    globalData,
  }
}

import { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import '@carbonplan/maps/mapbox.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { RegionDataProvider } from '../components/region'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <RegionDataProvider>
        <Component {...pageProps} />
      </RegionDataProvider>
    </ThemeProvider>
  )
}

export default App

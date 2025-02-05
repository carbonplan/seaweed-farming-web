import React from 'react'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'theme-ui'
import '@carbonplan/maps/mapbox.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { RegionProvider } from '../components/region'
import { ParameterProvider } from '../components/parameters'
import { LayersProvider } from '../components/layers'

const App = ({ Component, pageProps }) => {
  return (
    <PlausibleProvider domain='carbonplan.org'>
      <ThemeProvider theme={theme}>
        <LayersProvider>
          <ParameterProvider>
            <RegionProvider>
              <Component {...pageProps} />
            </RegionProvider>
          </ParameterProvider>
        </LayersProvider>
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default App

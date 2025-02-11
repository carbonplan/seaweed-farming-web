import React from 'react'
import Script from 'next/script'
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
    <ThemeProvider theme={theme}>
      {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
        <Script
          data-domain='carbonplan.org'
          data-api='https://carbonplan.org/proxy/api/event'
          src='https://carbonplan.org/js/script.file-downloads.outbound-links.js'
        />
      )}
      <LayersProvider>
        <ParameterProvider>
          <RegionProvider>
            <Component {...pageProps} />
          </RegionProvider>
        </ParameterProvider>
      </LayersProvider>
    </ThemeProvider>
  )
}

export default App

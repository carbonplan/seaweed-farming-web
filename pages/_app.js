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

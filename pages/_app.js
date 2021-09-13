import { ThemeProvider } from 'theme-ui'
import '@carbonplan/maps/mapbox.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { RegionProvider } from '../components/region'
import { ParameterProvider } from '../components/parameters'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ParameterProvider>
        <RegionProvider>
          <Component {...pageProps} />
        </RegionProvider>
      </ParameterProvider>
    </ThemeProvider>
  )
}

export default App

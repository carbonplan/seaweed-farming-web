import { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import { SessionProvider } from '../lib/session'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'

const App = ({ Component, pageProps }) => {
  const [session, setSession] = useState({ token: null, username: null })
  return (
    <SessionProvider session={session} setSession={setSession}>
      <ThemeProvider theme={theme}>
        <MDXProvider>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default App

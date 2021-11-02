import { Box, Container, IconButton } from 'theme-ui'
import {
  Logo,
  Meta,
  Guide,
  Header as HeaderComponent,
  Settings,
} from '@carbonplan/components'

const Header = ({ expanded, setExpanded, headerMode }) => {
  if (!['pure', 'expander', 'sparse'].includes(headerMode)) {
    throw new Error(
      `Unexpected headerMode: ${headerMode}. Must be one of 'pure', 'expander', 'sparse'.`
    )
  }

  return (
    <>
      <Meta />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        {headerMode !== 'sparse' && (
          <Box
            as='header'
            sx={
              headerMode === 'expander'
                ? {
                    width: '100%',
                    borderStyle: 'solid',
                    borderColor: 'muted',
                    borderWidth: '0px',
                    borderBottomWidth: '1px',
                    position: 'sticky',
                    top: 0,
                    bg: 'background',
                    height: '56px',
                    zIndex: 2000,
                  }
                : {}
            }
          >
            <Container>
              <HeaderComponent
                dimmer={'none'}
                settings={{
                  value: expanded,
                  onClick: () => setExpanded((prev) => !prev),
                }}
              />
            </Container>
          </Box>
        )}
        {headerMode === 'sparse' && (
          <>
            <Logo sx={{ float: 'left', m: [3] }} />
            <Settings
              sx={{ float: 'right', m: [3] }}
              onClick={() => setExpanded((prev) => !prev)}
              value={expanded}
            />
          </>
        )}
      </Box>
    </>
  )
}

export default Header

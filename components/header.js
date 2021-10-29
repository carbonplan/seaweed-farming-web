import { Box, Container, IconButton } from 'theme-ui'
import {
  Logo,
  Meta,
  Guide,
  Header as HeaderComponent,
} from '@carbonplan/components'
import { Settings, X } from '@carbonplan/icons'

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
                  expanded,
                  onClick: () => setExpanded((prev) => !prev),
                }}
              />
            </Container>
          </Box>
        )}
        {headerMode === 'sparse' && (
          <>
            <Logo sx={{ float: 'left', m: [3] }} />
            <IconButton
              onClick={() => setExpanded((prev) => !prev)}
              sx={{ cursor: 'pointer', float: 'right', m: [3], strokeWidth: 2 }}
            >
              {expanded ? <X /> : <Settings />}
            </IconButton>
          </>
        )}
      </Box>
    </>
  )
}

export default Header

import { Box, Container } from 'theme-ui'
import {
  Logo,
  Dimmer,
  Meta,
  Guide,
  Header as HeaderComponent,
  Settings,
} from '@carbonplan/components'

const Header = ({ expanded, setExpanded, embedded }) => {
  return (
    <>
      <Meta
        title='Seaweed farming – CarbonPlan'
        description='An interactive map explorer for estimating the costs and climate benefits of seaweed farming for carbon removal and biomass products.'
        card='https://images.carbonplan.org/social/seaweed-farming.png'
      />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 5000,
        }}
      >
        {embedded ? (
          <>
            <Logo sx={{ float: 'left', m: [3] }} />
            <Settings
              sx={{ float: 'right', m: [3], pointerEvents: 'all' }}
              onClick={() => setExpanded((prev) => !prev)}
              value={expanded}
            />
          </>
        ) : (
          <Box
            as='header'
            sx={{
              width: '100%',
              borderWidth: 0,
              borderStyle: ['solid', 'solid', 'none', 'none'],
              borderColor: ['muted', 'muted', 'unset', 'unset'],
              borderBottomWidth: ['1px', '1px', 'unset', 'unset'],
              bg: ['background', 'background', 'unset', 'unset'],
              position: 'sticky',
              top: 0,
              height: '56px',
              zIndex: 2000,
            }}
          >
            <Container>
              <HeaderComponent
                menuItems={[
                  <Dimmer
                    key='dimmer'
                    sx={{
                      color: 'primary',
                      mt: '-2px',
                      display: ['block', 'block', 'none', 'none'],
                    }}
                  />,
                  <Settings
                    key='settings'
                    sx={{
                      mr: ['2px'],
                      display: ['inherit', 'inherit', 'none', 'none'],
                    }}
                    value={expanded}
                    onClick={() => setExpanded((prev) => !prev)}
                  />,
                ]}
              />
            </Container>
          </Box>
        )}
      </Box>
    </>
  )
}

export default Header

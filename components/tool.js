import { Box, Container } from 'theme-ui'
import { Group, Link } from '@carbonplan/components'
import { useState } from 'react'

import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import { LayerSwitcher } from '../components/layers'
import ControlPanelDivider from '../components/control-panel-divider'
import Parameters from '../components/parameters'
import Statistics from '../components/statistics'
import Header from './header'
import About from './about'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
  label: {
    fontFamily: 'faux',
    letterSpacing: 'smallcaps',
    fontSize: [2, 2, 2, 3],
    mb: [2],
  },
}

const Tool = ({ headerMode }) => {
  const [expanded, setExpanded] = useState(false)

  if (!['pure', 'expander', 'sparse'].includes(headerMode)) {
    throw new Error(
      `Unexpected headerMode: ${headerMode}. Must be one of 'pure', 'expander', 'sparse'.`
    )
  }

  return (
    <>
      <Header
        expanded={expanded}
        setExpanded={setExpanded}
        headerMode={headerMode}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          left: 0,
          overflow: 'clip',
        }}
      >
        <Map expanded={expanded}>
          <Container>
            <ControlPanel
              title='Mapping macroalgae'
              description={
                <Box>
                  Read the{' '}
                  <Link
                    href='#'
                    sx={{ pointerEvents: expanded ? 'none' : 'all' }}
                  >
                    preprint
                  </Link>
                  . Explore the{' '}
                  <Link
                    onClick={() => setExpanded(true)}
                    sx={{ pointerEvents: expanded ? 'none' : 'all' }}
                  >
                    map
                  </Link>
                  . Built in collaboration with UCI, NCAR, and S3.
                </Box>
              }
              expanded={expanded}
              setExpanded={setExpanded}
              headerMode={headerMode}
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  This is an interactive tool for exploring the costs of growing
                  macroalgae alongside its potential climate benefits. Read the{' '}
                  <Link href='#'>preprint</Link> or check out the{' '}
                  <Link href='#'>Jupyter notebooks</Link> for more details.
                </Box>

                <ControlPanelDivider />

                <LayerSwitcher sx={sx} />

                <ControlPanelDivider />

                <Parameters sx={sx} />

                {headerMode === 'pure' && <ControlPanelDivider />}

                {headerMode === 'pure' && <Statistics sx={sx} />}

                <ControlPanelDivider sx={{ mb: [4, 4, -4, -4] }} />

                <About sx={sx} />

                <ControlPanelDivider sx={{ mb: [4, 4, -4, -4] }} />
              </Group>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool

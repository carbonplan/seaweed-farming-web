import { Box, Container } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { useState } from 'react'

import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import { GrowthParameters, LayerSwitcher } from '../components/layers'
import ControlPanelDivider from '../components/control-panel-divider'
import Section from '../components/section'
import Parameters from '../components/parameters'
import Statistics from '../components/statistics'
import Header from './header'

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
        }}
      >
        <Map>
          <Container>
            <ControlPanel
              title='Mapping macroalgae'
              expanded={expanded}
              setExpanded={setExpanded}
              headerMode={headerMode}
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  This is an interactive web tool for mapping the potential of
                  carbon removal with macroalgae.
                </Box>

                <ControlPanelDivider />

                <LayerSwitcher sx={sx} />

                <ControlPanelDivider />

                <Section sx={sx.heading} label='Parameters'>
                  <Group spacing={4}>
                    <GrowthParameters sx={sx} />

                    <Parameters sx={sx} />
                  </Group>
                </Section>

                {headerMode === 'pure' && <ControlPanelDivider />}

                {headerMode === 'pure' && <Statistics sx={sx} />}

                <ControlPanelDivider sx={{ mb: [-4] }} />
              </Group>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool

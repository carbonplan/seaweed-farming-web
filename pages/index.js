import { Box, Container } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { Group, Meta, Guide, Header } from '@carbonplan/components'
import { useState } from 'react'

import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import { GrowthParameters, LayerSwitcher } from '../components/layers'
import ControlPanelDivider from '../components/control-panel-divider'
import Section from '../components/section'
import Parameters from '../components/parameters'
import Statistics from '../components/statistics'

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

const Index = () => {
  const [expanded, setExpanded] = useState(false)
  const index = useBreakpointIndex({ defaultIndex: 2 })
  const isNarrow = index < 2

  return (
    <>
      <Meta />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        <Box
          as='header'
          sx={
            isNarrow
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
            <Header
              dimmer={'none'}
              settings={{
                expanded,
                onClick: () => setExpanded((prev) => !prev),
              }}
            />
          </Container>
        </Box>
      </Box>
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

                {!isNarrow && <ControlPanelDivider />}

                {!isNarrow && <Statistics sx={sx} />}

                <ControlPanelDivider sx={{ mb: [-4] }} />
              </Group>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Index

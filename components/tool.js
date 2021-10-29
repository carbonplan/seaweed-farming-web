import { Box, Container, IconButton } from 'theme-ui'
import { Group, Logo, Meta, Guide, Header } from '@carbonplan/components'
import { Settings } from '@carbonplan/icons'
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

const Tool = ({ header, controlPanelMode }) => {
  const [expanded, setExpanded] = useState(false)

  if (!['header', 'settings', 'side'].includes(controlPanelMode)) {
    throw new Error(
      `Unexpected controlPanelMode: ${controlPanelMode}. Must be one of header, settings, side.`
    )
  }

  return (
    <>
      <Meta />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        {header && (
          <Box
            as='header'
            sx={
              controlPanelMode === 'header'
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
        )}
        {controlPanelMode === 'settings' && (
          <>
            <Logo sx={{ float: 'left', m: [3] }} />
            <IconButton
              onClick={() => setExpanded((prev) => !prev)}
              sx={{ cursor: 'pointer', float: 'right', m: [3], strokeWidth: 2 }}
            >
              <Settings />
            </IconButton>
          </>
        )}
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
              mode={controlPanelMode}
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

                {controlPanelMode === 'side' && <ControlPanelDivider />}

                {controlPanelMode === 'side' && <Statistics sx={sx} />}

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

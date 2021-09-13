import { useState } from 'react'
import { Box, Container } from 'theme-ui'
import { Group, Meta, Guide, Header } from '@carbonplan/components'
import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import LayerSwitcher from '../components/layer-switcher'
import Parameters from '../components/parameters'
import { RegionDataDisplay, useRegionData } from '../components/region'
import ControlPanelDivider from '../components/control-panel-divider'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    mb: [1, 1, 1, 2],
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
}

const parameterMapping = {
  cost: [
    'capex',
    'capex',
    'lineCost',
    'opex',
    'labor',
    'harvestCost',
    'depthFactor',
    'waveFactor',
    'insurance',
    'license',
  ],
}

const Index = () => {
  const [layer, setLayer] = useState('cost')
  const { regionData } = useRegionData()
  const applicableParameters = parameterMapping[layer] || []

  return (
    <>
      <Meta />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        <Container>
          <Header dimmer={'none'} />
        </Container>
      </Box>
      <Container>
        <ControlPanel title='Mapping macroalgae'>
          <Group>
            <Box sx={sx.description}>
              This is an interactive web tool for mapping the potential of
              carbon removal with macroalgae.
            </Box>

            <ControlPanelDivider />

            <LayerSwitcher setLayer={setLayer} sx={sx} />

            <ControlPanelDivider />

            <Parameters applicableParameters={applicableParameters} sx={sx} />

            {regionData && <ControlPanelDivider />}

            <RegionDataDisplay sx={sx} />
          </Group>
        </ControlPanel>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          left: 0,
        }}
      >
        <Map layer={layer} />
      </Box>
    </>
  )
}

export default Index

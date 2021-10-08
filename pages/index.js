import { Box, Container } from 'theme-ui'
import { Group, Meta, Guide, Header } from '@carbonplan/components'
import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import { LayerSwitcher } from '../components/layers'
import { RegionDataDisplay } from '../components/region'
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

const Index = () => {
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
            <ControlPanel title='Mapping macroalgae'>
              <Group>
                <Box sx={sx.description}>
                  This is an interactive web tool for mapping the potential of
                  carbon removal with macroalgae.
                </Box>

                <ControlPanelDivider />

                <LayerSwitcher sx={sx} />

                <ControlPanelDivider />

                <RegionDataDisplay sx={sx} />
              </Group>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Index

import { Box, Container, Divider } from 'theme-ui'
import { useState } from 'react'
import { Group, Link } from '@carbonplan/components'

import Map from '../components/map'
import { LayerSwitcher } from '../components/layers'
import Parameters from '../components/parameters'
import Header from './header'
import About from './about'
import Title from './title'
import ControlPanel from './control-panel'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    mb: [3],
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

const Tool = ({ embedded = false }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Header
        expanded={expanded}
        setExpanded={setExpanded}
        embedded={embedded}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          left: 0,
          overflow: 'clip',
          // Safari-specific overflow style
          '@media not all and (min-resolution:.001dpcm)': {
            '@supports (-webkit-appearance:none) and (stroke-color:transparent)':
              {
                overflow: 'hidden',
              },
          },
        }}
      >
        <Map expanded={expanded}>
          <Container>
            <ControlPanel
              expanded={expanded}
              embedded={embedded}
              setExpanded={setExpanded}
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  This is an interactive tool for exploring the potential
                  climate benefits and costs of growing seaweed. Read the{' '}
                  <Link href='https://doi.org/10.1038/s41477-022-01305-9'>
                    paper
                  </Link>{' '}
                  or our{' '}
                  <Link href='/research/seaweed-farming-explainer'>
                    explainer article
                  </Link>{' '}
                  for more details about the model.
                </Box>

                <LayerSwitcher sx={sx} />

                <Divider sx={{ my: 4 }} />

                <Parameters sx={sx} />

                <Divider sx={{ my: 4 }} />

                <About sx={sx} />
              </Group>
            </ControlPanel>

            {!embedded && (
              <Title expanded={expanded} setExpanded={setExpanded} />
            )}
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool

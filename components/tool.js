import { Box, Container, Divider } from 'theme-ui'
import { useState } from 'react'
import { Column, Group, Link, Row } from '@carbonplan/components'
import { SidePanel, SidePanelFooter } from '@carbonplan/layouts'

import Map from '../components/map'
import { LayerSwitcher } from '../components/layers'
import Parameters from '../components/parameters'
import Statistics from '../components/statistics'
import Header from './header'
import About from './about'
import Title from './title'
import { useRegionContext } from './region'

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

const Wrapper = ({ expanded, setExpanded, children, embedded }) => {
  const { setShowRegionPicker } = useRegionContext()

  if (embedded) {
    return (
      <Box
        sx={{
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'all' : 'none',
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          minWidth: '0px',
          maxHeight: '100vh',
          width: '100vw',
          overflowX: 'hidden',
          overflowY: 'scroll',
          backgroundColor: 'background',
          zIndex: 4000,
          pt: ['56px'],
          transition: 'opacity 0.25s',
        }}
      >
        <Container>
          <Row>
            <Column start={[1]} width={[12]}>
              <Divider />

              <Box
                sx={{
                  display: expanded ? 'inherit' : 'none',
                  mt: [4],
                }}
              >
                {expanded && children}
              </Box>
            </Column>
          </Row>
        </Container>
      </Box>
    )
  } else {
    return (
      <>
        <Box sx={{ display: ['none', 'none', 'inherit', 'inherit'] }}>
          <SidePanel
            expanded={expanded}
            setExpanded={setExpanded}
            tooltip='Show controls'
            side='left'
            width={3}
            onClose={() => setShowRegionPicker(false)}
            footer={
              <SidePanelFooter>
                <Statistics sx={sx} />
              </SidePanelFooter>
            }
          >
            {children}
          </SidePanel>
        </Box>

        <Box
          sx={{
            display: ['inherit', 'inherit', 'none', 'none'],
            overflowX: 'hidden',
            overflowY: 'scroll',
            height: 'calc(100%)',
            position: 'fixed',
            width: 'calc(100vw)',
            top: '0px',
            mt: ['56px'],
            pb: '56px',
            pt: [5],
            bg: 'background',
            zIndex: 1100,
            borderStyle: 'solid',
            borderColor: 'muted',
            borderWidth: '0px',
            borderBottomWidth: '1px',
            transition: 'transform 0.15s',
            ml: [-3, -4, -5, -6],
            pl: [3, 4, 5, 6],
            pr: [3, 4, 5, 6],
            transform: expanded ? 'translateY(0)' : 'translateY(-100%)',
          }}
        >
          <Row>
            <Column start={[1, 1, 1, 1]} width={[6, 8, 10, 10]}>
              {children}
            </Column>
          </Row>
        </Box>
      </>
    )
  }
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
        }}
      >
        <Map expanded={expanded}>
          <Container>
            <Wrapper
              expanded={expanded}
              embedded={embedded}
              setExpanded={setExpanded}
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  This is an interactive tool for exploring the costs of growing
                  macroalgae alongside its potential climate benefits. Read the{' '}
                  <Link href='#'>preprint</Link> or check out the{' '}
                  <Link href='#'>Jupyter notebooks</Link> for more details.
                </Box>

                <LayerSwitcher sx={sx} />

                <Divider sx={{ my: 4 }} />

                <Parameters sx={sx} />

                <Divider sx={{ my: 4 }} />

                <About sx={sx} />
              </Group>
            </Wrapper>

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

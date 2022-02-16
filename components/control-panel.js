import { Box, Container, Divider } from 'theme-ui'
import { Column, Row } from '@carbonplan/components'
import { SidePanel, SidePanelFooter } from '@carbonplan/layouts'

import Statistics from '../components/statistics'
import { useRegionContext } from './region'
import { useBreakpointIndex } from '@theme-ui/match-media'

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

const ControlPanel = ({ expanded, setExpanded, children, embedded }) => {
  const { setShowRegionPicker } = useRegionContext()
  const index = useBreakpointIndex()

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
  } else if (index < 2) {
    return (
      <Box
        sx={{
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
    )
  } else {
    return (
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
    )
  }
}

export default ControlPanel

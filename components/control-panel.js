import { useCallback, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

import { useRegionContext } from './region'

const ControlPanel = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false)
  const { regionData } = useRegionContext()

  const handleToggleExpanded = useCallback(() => {
    // Always allow opening of panel
    if (!expanded) {
      setExpanded(true)
    } else {
      // Otherwise, when expanded=true...
      if (regionData) {
        // do nothing when there is active regionData.
        return
      } else {
        // allow panel to be closed otherwise.
        setExpanded(false)
      }
    }
  }, [expanded, regionData])

  useEffect(() => {
    // Automatically expand panel when regionData is activated
    if (!expanded && regionData) {
      setExpanded(true)
    }
  }, [regionData])

  return (
    <Row>
      <Column width={3} start={1}>
        <Box
          sx={{
            position: 'absolute',
            left: '0px',
            right: [
              'calc(3 * 100vw / 6 - 12px)',
              'calc(5 * 100vw / 8 - 18px)',
              'calc(9 * 100vw / 12 - 24px)',
              'calc(9 * 100vw / 12 - 36px)',
            ],
            zIndex: 1000,
            transition: 'transform 0.2s',
            transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          <Box
            as='button'
            onClick={handleToggleExpanded}
            sx={{
              fontFamily: 'inherit',
              fontSize: '100%',
              lineHeight: 1.15,
              color: 'text',
              bg: 'background',
              m: 0,
              pb: [1],
              pt: ['2px'],
              px: [2],
              position: 'absolute',
              right: '-53px',
              bottom: '50px',
              transform: 'rotate(-90deg)',
              cursor: 'pointer',
              border: 'none',
              borderRight: ({ colors }) => `1px solid ${colors.muted}`,
              borderBottom: ({ colors }) => `1px solid ${colors.muted}`,
              borderLeft: ({ colors }) => `1px solid ${colors.muted}`,
            }}
          >
            Controls
          </Box>
          <Box
            sx={{
              px: [4, 5, 5, 6],
              height: '56px',
              bg: 'background',
              borderRight: ({ colors }) =>
                `${expanded ? 1 : 0}px solid ${colors.muted}`,
              borderBottom: ({ colors }) =>
                `${expanded ? 1 : 0}px solid ${colors.muted}`,
              transition: 'border 0.2s',
            }}
          />
          <Box
            sx={{
              px: [4, 5, 5, 6],
              pb: [5],
              pt: [5],
              pointerEvents: 'all',
              bg: 'background',
              overflowY: 'scroll',
              maxHeight: 'calc(100vh - 56px)',
              minHeight: 'calc(100vh - 56px)',
              transition: 'border 0.2s',
              borderRight: ({ colors }) =>
                `${expanded ? 1 : 0}px solid ${colors.muted}`,
            }}
          >
            <Box
              sx={{
                transition: 'opacity 0.2s',
                opacity: expanded ? 1 : 0,
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Column>
      <Column start={[3, 5, 8, 8]} width={3}>
        <Box
          sx={{
            mt: [8],
            opacity: expanded ? 0 : 1,
            transition: 'opacity 0.3s',
            position: 'relative',
            display: 'block',
            zIndex: 1001,
            fontSize: [6, 7, 8, 9],
            letterSpacing: 'heading',
            fontFamily: 'heading',
            lineHeight: 'heading',
            pointerEvents: 'none',
          }}
        >
          {title}
        </Box>
      </Column>
    </Row>
  )
}

export default ControlPanel

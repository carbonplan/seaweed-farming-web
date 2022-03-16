import { useRef } from 'react'

import { Box } from 'theme-ui'
import { Column, Link, Row } from '@carbonplan/components'

const Title = ({ expanded, setExpanded }) => {
  const hasExpanded = useRef(false)

  hasExpanded.current ||= expanded

  return (
    <Box
      sx={{
        display: [
          hasExpanded.current ? 'none' : 'inherit',
          hasExpanded.current ? 'none' : 'inherit',
          'inherit',
          'inherit',
        ],
      }}
    >
      <Row>
        <Column start={[1, 2, 7, 7]} width={[5, 5, 5, 5]}>
          <Box
            sx={{
              mt: [9],
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s',
              position: 'relative',
              display: 'block',
              zIndex: 1001,
              fontSize: [6, 7, 7, 8],
              letterSpacing: 'heading',
              fontFamily: 'heading',
              lineHeight: 'heading',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            Mapping seaweed farming potential
          </Box>
          <Box
            sx={{
              mt: [3],
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s',
              position: 'relative',
              display: 'block',
              zIndex: 1001,
              fontSize: [2, 3, 3, 4],
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            Read the{' '}
            <Link
              href='https://doi.org/10.31223/X5PG9V'
              sx={{ pointerEvents: expanded ? 'none' : 'all' }}
            >
              preprint
            </Link>{' '}
            and{' '}
            <Link
              href='research/seaweed-farming-explainer'
              sx={{ pointerEvents: expanded ? 'none' : 'all' }}
            >
              explainer
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
        </Column>
      </Row>
    </Box>
  )
}

export default Title

import { useCallback } from 'react'
import { Box, Container, useThemeUI } from 'theme-ui'
import { Column, Row, getScrollbarWidth } from '@carbonplan/components'
import { rgba } from 'polished'

const Toolbar = ({ children }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  return (
    <Box
      sx={{
        maxWidth: '1920px',
        margin: 'auto',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          py: [4],
          backgroundColor: rgba(colors.background, 0.75),
          borderWidth: '0px',
          position: 'relative',
          maxHeight: 'calc(100vh - 56px)',
          overflow: 'scroll',
          maxWidth: [
            0,
            'calc(3 * 100vw / 8 + 18px)',
            'calc(3 * 100vw / 12 + 24px)',
            'min(calc(3 * 100vw / 12 + 36px), 516px)',
          ],
        }}
      >
        <Container>
          <Row columns={[3]}>
            <Column start={[1]} width={[3]}>
              {children}
            </Column>
          </Row>
        </Container>
      </Box>
    </Box>
  )
}

export default Toolbar

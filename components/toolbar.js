import { Box, Container } from 'theme-ui'

const Toolbar = ({ children }) => {
  return (
    <Box
      sx={{
        py: [4],
        borderStyle: 'solid',
        borderWidth: '0px',
        borderRightWidth: '1px',
        borderColor: 'muted',
        maxWidth: [
          0,
          'calc(3 * 100vw / 8 + 18px)',
          'calc(3 * 100vw / 12 + 24px)',
          'calc(3 * 100vw / 12 + 36px)',
        ],
      }}
    >
      <Container>{children}</Container>
    </Box>
  )
}

export default Toolbar

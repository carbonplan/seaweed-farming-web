import { Box, Container } from 'theme-ui'

const Toolbar = ({ children }) => {
  return (
    <Box
      sx={{
        py: [4],
        borderStyle: 'solid',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderColor: 'muted',
      }}
    >
      <Container>{children}</Container>
    </Box>
  )
}

export default Toolbar

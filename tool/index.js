import { Box, Styled, Link } from 'theme-ui'
import { default as NextLink } from 'next/link'
import Tool from '../components/tool'

const Index = () => {
  const meta = {
    id: 'tool-title',
    title: 'Tool title',
    color: 'blue',
    summary: 'Summary of tool.',
  }

  const title = <Styled.h1>{meta.title}</Styled.h1>

  const description = (
    <Box sx={{ maxWidth: '700px', mb: [0, 0, 4] }}>
      <Styled.p>Description of the tool.</Styled.p>
    </Box>
  )

  return (
    <Tool meta={meta} title={title} description={description}>
      This is a tool.
    </Tool>
  )
}

export default Index

import { Box, Flex } from 'theme-ui'
import { Group } from '@carbonplan/components'

const sx = {
  fontFamily: 'mono',
  fontSize: ['9px', 0, 0, 1],
  letterSpacing: 'smallcaps',
  textTransform: 'uppercase',
}
const Legend = ({ colormap, label, labels }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: [4],
      }}
    >
      {label && <Box sx={sx}>{label}</Box>}

      <Flex sx={{ flexDirection: 'column', gap: 0 }}>
        {colormap.map((d, i) => (
          <Group direction='horizontal' spacing='sm' key={labels[i]}>
            <Box
              sx={{
                backgroundColor: `rgb(${d})`,
                border: ({ colors }) => `solid 1px ${colors.hinted}`,
                height: '10px',
                width: '10px',
              }}
            />
            <Box sx={sx}>{labels[i]}</Box>
          </Group>
        ))}
      </Flex>
    </Flex>
  )
}

export default Legend

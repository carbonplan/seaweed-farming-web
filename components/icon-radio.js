import { Box, IconButton, Label } from 'theme-ui'

const IconRadio = ({ onClick, checked, label, sx, Icon }) => {
  return (
    <Label sx={{ alignItems: 'center', gap: [2] }}>
      <IconButton
        aria-label={label}
        onClick={onClick}
        sx={{ ...sx, cursor: 'pointer' }}
      >
        <Icon
          sx={{
            stroke: checked ? 'primary' : 'secondary',
            transition: 'stroke 0.15s',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': { stroke: 'primary' },
            },
          }}
        />
      </IconButton>
      <Box sx={{ height: '100%' }}>{label}</Box>
    </Label>
  )
}

export default IconRadio

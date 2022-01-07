import { Label, Radio as ThemeRadio } from 'theme-ui'

const Radio = ({ name, checked, label, value, onChange, sx }) => {
  return (
    <Label
      sx={{
        '&:hover': { cursor: 'pointer' },
        fontFamily: 'mono',
        letterSpacing: 'mono',
        fontSize: [1, 1, 1, 2],
        textTransform: 'uppercase',
        mt: '3px',
        position: 'relative',
      }}
    >
      <ThemeRadio
        sx={{
          color: 'muted',
          transition: 'color 0.15s',
          mt: ['-3px', '-3px', '-3px', '-1px'],
          'input:hover ~ &': { color: 'primary' },
          'input:focus ~ &': { background: 'none' },
          'input:focus-visible ~ &': {
            outline: 'dashed 1px rgb(110, 110, 110, 0.625)',
            background: 'rgb(110, 110, 110, 0.625)',
          },
          ...sx,
        }}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </Label>
  )
}

export default Radio

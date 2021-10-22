import { Label, Radio as ThemeRadio } from 'theme-ui'

const Radio = ({ name, checked, label, value, onChange, sx }) => {
  return (
    <Label sx={{ '&:hover': { cursor: 'pointer' } }}>
      <ThemeRadio
        sx={{
          color: 'muted',
          transition: 'color 0.15s',
          'input:hover ~ &': { color: 'primary' },
          'input:focus ~ &': { background: 'none' },
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

import { Label, Radio as ThemeRadio } from 'theme-ui'

const Radio = ({ name, checked, label, value, onChange, sx }) => {
  return (
    <Label>
      <ThemeRadio
        sx={{ 'input:focus ~ &': { background: 'none' }, ...sx }}
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

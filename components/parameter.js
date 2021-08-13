import { useCallback, useState } from 'react'
import { Row, Column, Input } from '@carbonplan/components'

import Slider from './slider'

const formatValue = (value) =>
  Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })

const Parameter = ({ name, value, onChange, range }) => {
  const [renderedValue, setRenderedValue] = useState(() => formatValue(value))

  const handleInternalUpdate = useCallback((e) => {
    const normalizedValue = e.target.value.replace(/[^\.\d,]/g, '')

    setRenderedValue(normalizedValue)
  })

  const handleUpdate = useCallback(
    (v) => {
      const updatedValue = String(v)
      const parsedValue = Number(updatedValue.replace(/,/g, ''))
      const validatedValue = Math.min(
        Math.max(parsedValue, range.min),
        range.max
      )
      const formattedValue = formatValue(validatedValue)

      if (value !== validatedValue) {
        onChange(name, validatedValue)
      }

      if (renderedValue !== formattedValue) {
        setRenderedValue(formattedValue)
      }
    },
    [renderedValue, value, range.min, range.max]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate(renderedValue)
  }

  const handleBlur = useCallback((e) => {
    handleUpdate(e.target.value)
  })

  return (
    <>
      {name}
      <Row columns={3}>
        <Column start={[1]} width={[1]}>
          <form onSubmit={handleSubmit}>
            <Input
              value={renderedValue}
              onChange={handleInternalUpdate}
              onBlur={handleBlur}
            />
          </form>
        </Column>
        <Column start={[2]} width={[2]}>
          <Slider
            color='orange'
            value={value}
            onChange={handleBlur}
            min={range.min}
            max={range.max}
            step={range.step}
          />
        </Column>
      </Row>
    </>
  )
}

export default Parameter

import { useCallback, useMemo, useState } from 'react'
import { Row, Column, Input, Slider } from '@carbonplan/components'
import { Box, useThemeUI } from 'theme-ui'
import { scaleLinear } from 'd3-scale'

const POINTER_WIDTH = 4

const formatValue = (value) =>
  Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })

const Parameter = ({ name, value, onChange, range }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const [renderedValue, setRenderedValue] = useState(() => formatValue(value))

  const x = useMemo(() => {
    return scaleLinear()
      .domain([range.min, range.max])
      .range([0, 100 - POINTER_WIDTH])
  }, [range.min, range.max])

  const handleInternalUpdate = useCallback((e) => {
    const normalizedValue = e.target.value.replace(/[^\.\d,]/g, '')

    setRenderedValue(normalizedValue)
  })

  const handleUpdate = useCallback(() => {
    const parsedValue = Number(renderedValue.replace(/,/g, ''))
    const validatedValue = Math.min(Math.max(parsedValue, range.min), range.max)
    const formattedValue = formatValue(validatedValue)

    if (value !== validatedValue) {
      onChange(name, validatedValue)
    }

    if (renderedValue !== formattedValue) {
      setRenderedValue(formattedValue)
    }
  }, [renderedValue, value, range.min, range.max])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate()
  }

  const pointer = x(value)

  return (
    <>
      {name}
      <Row columns={3}>
        <Column start={[1]} width={[1]}>
          <form onSubmit={handleSubmit}>
            <Input
              value={renderedValue}
              onChange={handleInternalUpdate}
              onBlur={handleUpdate}
            />
          </form>
        </Column>
        <Column start={[2]} width={[2]}>
          <Box
            sx={{
              width: '100%',
              position: 'relative',
            }}
          >
            <Box
              as='svg'
              height='100%'
              viewBox='0 0 100 10'
              width='100%'
              preserveAspectRatio='none'
            >
              <Box
                as='rect'
                sx={{ fill: colors.orange, opacity: 0.2 }}
                x='0'
                y='0'
                width='100'
                height='10'
              />
              <Box
                as='rect'
                sx={{ fill: colors.orange, opacity: 1 }}
                x={String(pointer)}
                y='0'
                width={String(POINTER_WIDTH)}
                height='10'
              />
            </Box>
          </Box>
        </Column>
      </Row>
    </>
  )
}

export default Parameter

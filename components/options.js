import { Row, Column, Slider } from '@carbonplan/components'

const Options = ({ options, onChange }) => {
  const { operatingCost, transportationCost } = options

  return (
    <Row columns={[6]}>
      <Column start={[1]} width={[3]}>
        Operating cost: {operatingCost}
        <Slider
          value={operatingCost}
          min={1}
          max={100}
          step={1}
          onChange={(e) =>
            onChange('operatingCost', parseFloat(e.target.value))
          }
        />
      </Column>
      <Column start={[4]} width={[3]}>
        Transportation cost: {transportationCost}
        <Slider
          value={transportationCost}
          min={0}
          max={10}
          step={1}
          onChange={(e) =>
            onChange('transportationCost', parseFloat(e.target.value))
          }
        />
      </Column>
    </Row>
  )
}

export default Options

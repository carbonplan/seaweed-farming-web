import { Row, Column, Slider } from '@carbonplan/components'

const Options = ({ options, onChange }) => {
  const {
    capitalCost,
    cheapDepth,
    depthCostFactor,
    harvestCost,
    lineCost,
    operatingCost,
    priceyDepth,
    transportationCost,
  } = options

  return (
    <>
      <Row columns={[6]}>
        <Column start={[1]} width={[3]}>
          Operating cost: {operatingCost}
          <Slider
            value={operatingCost}
            min={63000}
            max={69000}
            step={1000}
            onChange={(e) =>
              onChange('operatingCost', parseFloat(e.target.value))
            }
          />
        </Column>
        <Column start={[4]} width={[3]}>
          Transportation cost: {transportationCost}
          <Slider
            value={transportationCost}
            min={0.11}
            max={0.34}
            step={0.01}
            onChange={(e) =>
              onChange('transportationCost', parseFloat(e.target.value))
            }
          />
        </Column>
      </Row>
      <Row columns={[6]}>
        <Column start={[1]} width={[3]}>
          Capital cost: {capitalCost}
          <Slider
            value={capitalCost}
            min={170000}
            max={969000}
            step={10000}
            onChange={(e) =>
              onChange('capitalCost', parseFloat(e.target.value))
            }
          />
        </Column>
        <Column start={[4]} width={[3]}>
          Harvest cost: {harvestCost}
          <Slider
            value={harvestCost}
            min={124000}
            max={395000}
            step={10000}
            onChange={(e) =>
              onChange('harvestCost', parseFloat(e.target.value))
            }
          />
        </Column>
      </Row>
      <Row columns={[6]}>
        <Column start={[1]} width={[3]}>
          Line cost: {lineCost}
          <Slider
            value={lineCost}
            min={0.06}
            max={1.45}
            step={0.01}
            onChange={(e) => onChange('lineCost', parseFloat(e.target.value))}
          />
        </Column>
        <Column start={[4]} width={[3]}>
          Depth cost factor: {depthCostFactor}
          <Slider
            value={depthCostFactor}
            min={1}
            max={3}
            step={0.25}
            onChange={(e) =>
              onChange('depthCostFactor', parseFloat(e.target.value))
            }
          />
        </Column>
      </Row>
      <Row columns={[6]}>
        <Column start={[1]} width={[3]}>
          Cheap depth: {cheapDepth}
          <Slider
            value={cheapDepth}
            min={10}
            max={50}
            step={5}
            onChange={(e) => onChange('cheapDepth', parseFloat(e.target.value))}
          />
        </Column>
        <Column start={[4]} width={[3]}>
          Pricey depth: {priceyDepth}
          <Slider
            value={priceyDepth}
            min={100}
            max={300}
            step={25}
            onChange={(e) =>
              onChange('priceyDepth', parseFloat(e.target.value))
            }
          />
        </Column>
      </Row>
    </>
  )
}

export default Options

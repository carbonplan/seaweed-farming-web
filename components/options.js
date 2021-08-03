import { Row, Column, Slider } from '@carbonplan/components'
import { useCallback } from 'react'

import { useMapContext } from './map'

const Options = () => {
  const {
    options: { parameters, setParameters },
  } = useMapContext()

  const handleChange = useCallback((option, value) => {
    setParameters({ ...parameters, [option]: value })
  })

  const {
    capitalCost,
    cheapDepth,
    depthCostFactor,
    harvestCost,
    lineCost,
    operatingCost,
    priceyDepth,
    transportationCost,
  } = parameters

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
              handleChange('operatingCost', parseFloat(e.target.value))
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
              handleChange('transportationCost', parseFloat(e.target.value))
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
              handleChange('capitalCost', parseFloat(e.target.value))
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
              handleChange('harvestCost', parseFloat(e.target.value))
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
            onChange={(e) =>
              handleChange('lineCost', parseFloat(e.target.value))
            }
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
              handleChange('depthCostFactor', parseFloat(e.target.value))
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
            onChange={(e) =>
              handleChange('cheapDepth', parseFloat(e.target.value))
            }
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
              handleChange('priceyDepth', parseFloat(e.target.value))
            }
          />
        </Column>
      </Row>
    </>
  )
}

export default Options

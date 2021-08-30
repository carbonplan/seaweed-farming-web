import { Row, Column } from '@carbonplan/components'
import { useCallback } from 'react'

import Parameter from './parameter'
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
      <Row columns={[3]}>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={operatingCost}
            range={{
              min: 63000,
              max: 69000,
              step: 500,
            }}
            name='operatingCost'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={transportationCost}
            range={{ min: 0.11, max: 0.34, step: 0.01 }}
            name='transportationCost'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={capitalCost}
            range={{ min: 170000, max: 969000, step: 1000 }}
            name='capitalCost'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={harvestCost}
            range={{ min: 124000, max: 395000, step: 1000 }}
            name='harvestCost'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={lineCost}
            range={{ min: 0.06, max: 1.45, step: 0.01 }}
            name='lineCost'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={depthCostFactor}
            range={{ min: 1, max: 3, step: 0.5 }}
            name='depthCostFactor'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={cheapDepth}
            range={{ min: 10, max: 50, step: 5 }}
            name='cheapDepth'
            onChange={handleChange}
          />
        </Column>
        <Column start={[1]} width={[3]}>
          <Parameter
            value={priceyDepth}
            range={{ min: 100, max: 300, step: 10 }}
            name='priceyDepth'
            onChange={handleChange}
          />
        </Column>
      </Row>
    </>
  )
}

export default Options

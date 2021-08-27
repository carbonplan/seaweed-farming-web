import { useMemo } from 'react'
import { useMapContext } from '../context'

const PROPERTY_TRANSFORMATIONS = {
  D2PORT: ['get', 'd2p'],
  GROWTH: ['get', 'Growth2'],
  DEPTH: ['*', -1, ['get', 'elevation']],
}

const usePropertyExpression = () => {
  const {
    options: { layers, parameters },
  } = useMapContext()

  return useMemo(() => {
    if (layers.COST) {
      const depthFactor = [
        'case',
        ['<=', PROPERTY_TRANSFORMATIONS.DEPTH, parameters.cheapDepth],
        1,

        ['<=', parameters.priceyDepth, PROPERTY_TRANSFORMATIONS.DEPTH],
        parameters.depthCostFactor,

        [
          '*',
          parameters.depthCostFactor /
            (parameters.priceyDepth - parameters.cheapDepth),
          ['-', PROPERTY_TRANSFORMATIONS.DEPTH, parameters.cheapDepth],
        ],
      ]
      const capital = [
        '*',
        [
          '+',
          parameters.capitalCost,
          parameters.lineCost * 1000000, // todo: once LINEDENSITY is available: ['*', parameters.linecost, ['get', PROPERTIES.LINEDENSITY]]
        ],
        depthFactor,
      ]
      const operations = parameters.operatingCost
      const harvest = [
        '+',
        [
          '*',
          PROPERTY_TRANSFORMATIONS.D2PORT,
          parameters.transportationCost,
          PROPERTY_TRANSFORMATIONS.GROWTH,
        ],
        parameters.harvestCost * 4, // once NHARV data is available: ['*', parameters.harvestCost, ['get', PROPERTIES.NHARV]]
      ]

      return [
        '/',
        ['+', capital, operations, harvest],
        PROPERTY_TRANSFORMATIONS.GROWTH,
      ]
    } else if (layers.D2PORT) {
      return PROPERTY_TRANSFORMATIONS.D2PORT
    } else if (layers.GROWTH) {
      return PROPERTY_TRANSFORMATIONS.GROWTH
    } else if (layers.DEPTH) {
      return PROPERTY_TRANSFORMATIONS.DEPTH
    }
  }, [layers, parameters])
}

export default usePropertyExpression

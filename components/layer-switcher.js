import { useCallback, useMemo, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'

const initOutputs = {
  cost: true,
  value: false,
}

const initCostInputs = {
  depth: true,
  growth: true,
  harvest: true,
  waveHeight: true,
  lineDensity: true,
}

const initValueOutputs = {}

const emptyUniforms = {
  costLayer: 0,
  valueLayer: 0,
  depthLayer: 0,
  growthLayer: 0,
  harvestLayer: 0,
  waveHeightLayer: 0,
  lineDensityLayer: 0,
}

export const INITIAL_UNIFORMS = {
  ...emptyUniforms,
  costLayer: 1,
}

const LayerSwitcher = ({ setUniforms }) => {
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initCostInputs)

  const handleOutputChange = useCallback((res) => {
    let uniform
    setOutputs(res)
    if (res.cost) {
      uniform = 'costLayer'
      setInputs(initCostInputs)
    } else {
      uniform = 'valueLayer'
      setInputs(initValueOutputs)
    }

    setUniforms({ ...emptyUniforms, [uniform]: 1 })
  })

  const handleInputChange = useCallback((res) => {
    setInputs(res)
    const selected = Object.keys(res).find((key) => res[key])
    const uniform = `${selected}Layer`
    setUniforms({ ...emptyUniforms, [uniform]: 1 })
  })

  return (
    <Group>
      <Filter values={outputs} setValues={handleOutputChange} label='Outputs' />
      <Filter values={inputs} setValues={handleInputChange} label='Inputs' />
    </Group>
  )
}

export default LayerSwitcher

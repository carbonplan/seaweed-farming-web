import { useRegionContext } from './context'
import RecenterButton from './recenter-button'
import RegionPickerButton from './region-picker-button'

export const RegionControls = () => {
  const { showRegionPicker } = useRegionContext()

  return (
    <>
      {showRegionPicker && <RecenterButton />}
      <RegionPickerButton color={showRegionPicker ? 'primary' : 'secondary'} />
    </>
  )
}

export default RegionControls

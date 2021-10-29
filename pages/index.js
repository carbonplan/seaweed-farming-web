import { useBreakpointIndex } from '@theme-ui/match-media'

import Tool from '../components/tool'

const Index = () => {
  const index = useBreakpointIndex({ defaultIndex: 2 })
  const isNarrow = index < 2

  return <Tool header controlPanelMode={isNarrow ? 'header' : 'side'} />
}

export default Index

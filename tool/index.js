import { useState } from 'react'
import { Layout } from '@carbonplan/components'

import Map from '../components/map'

const Index = () => {
  const [map, setMap] = useState(null)

  return (
    <Layout
      description={'Mapping cost of macroalgae CDR.'}
      title='macroalgae / research / carbonplan'
      header={false}
      dimmer={false}
      footer={false}
      metadata={false}
      guide={'teal'}
    >
      <Map onMapReady={setMap} />
    </Layout>
  )
}

export default Index

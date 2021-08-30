import { Layout } from '@carbonplan/components'

import Tool from '../components/tool'

const Index = () => {
  return (
    <Layout
      description='Mapping cost of macroalgae CDR.'
      title='macroalgae / research / carbonplan'
      dimmer='bottom'
      footer={false}
      metadata={false}
      guide='teal'
      container={false}
    >
      <Tool />
    </Layout>
  )
}

export default Index

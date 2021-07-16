import { Layout } from '@carbonplan/components'

import Tool from '../components/tool'

const Index = () => {
  return (
    <Layout
      description='Mapping cost of macroalgae CDR.'
      title='macroalgae / research / carbonplan'
      header={false}
      dimmer={false}
      footer={false}
      metadata={false}
      guide='teal'
    >
      <Tool />
    </Layout>
  )
}

export default Index

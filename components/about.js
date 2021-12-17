import { Box } from 'theme-ui'
import { Group, Link, Logo } from '@carbonplan/components'

import Section from './section'
import { ClimateWorks, NCAR, S3, UCI } from './logos'

const logo = {
  maxHeight: '60px',
  mr: 3,
}
const About = ({ sx }) => {
  return (
    <Section sx={sx.heading} label='About'>
      <Group spacing={2}>
        <Box sx={sx.description}>
          This interactive tool explores the costs of growing macroalgae
          alongside its potential climate benefits over a year-long timescale.
          It was built by a collaborative team including UC Irvine, NCAR, and
          CarbonPlan, with funding from ClimateWorks.
        </Box>
        <Box sx={sx.description}>
          Based on user-specified parameters and a target end use, the map
          visualizes the output of a combined biophysical and technoeconomic
          model. At a high-level, the model parameterizes different lifecycle
          scenarios for growing and utilizing macroalgae for potential climate
          benefits, either growth and sinking for carbon removal, or growth and
          utilization in products. The model is described in detail in{' '}
          <Link href='#'>preprint</Link>. We’ve also provided example{' '}
          <Link href='#'>Jupyter notebooks</Link> that demonstrate exploration
          of the data beyond what is possible in this exploratory web tool. The
          code for the web app itself can be found on{' '}
          <Link href='https://github.com/carbonplan/macroalgae'>GitHub</Link>.
          Thanks to the full team involved in this effort: [NAMES OF ALL
          CONTRIBUTORS].
        </Box>
      </Group>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <UCI sx={logo} />
        <S3 sx={logo} />
        <NCAR sx={logo} />
        <ClimateWorks sx={logo} />
        <Logo sx={logo} />
      </Box>
    </Section>
  )
}

export default About

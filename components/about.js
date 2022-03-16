import { Box } from 'theme-ui'
import { Group, Link, Logo, Row, Column } from '@carbonplan/components'

import { ClimateWorks, NCAR, S3, UCI } from './logos'

const logo = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  mb: 3,
}
const About = ({ sx }) => {
  return (
    <>
      <Box sx={sx.heading}>About</Box>
      <Group spacing={2}>
        <Box sx={sx.description}>
          This interactive tool explores the potential climate benefits and
          costs of growing seaweed over a year-long timescale. It was built by a
          collaborative team including UC Irvine, NCAR, and CarbonPlan, with
          funding from ClimateWorks.
        </Box>
        <Box sx={sx.description}>
          Based on user-specified parameters and a target end use, the map
          visualizes the output of a combined biophysical and technoeconomic
          model. At a high level, the model parameterizes different lifecycle
          scenarios for growing and utilizing seaweed for potential climate
          benefits, either growth and sinking for carbon removal, or growth and
          utilization in products. The model is described in detail in the{' '}
          <Link href='https://doi.org/10.31223/X5PG9V'>preprint</Link> and the{' '}
          <Link href='/research/seaweed-farming-explainer'>
            explainer article
          </Link>
          . The code for the web app itself can be found on{' '}
          <Link href='https://github.com/carbonplan/seaweed-farming-web'>
            GitHub
          </Link>
          . Thanks to the full team involved in this effort: Julianne DeAngelo,
          Steven Davis, Benjamin Saenz, Isabella Arzeno-Soltero, Matthew Long,
          Christina Frieder, Kristen Davis, Kata Martin, Freya Chay, Jeremy
          Freeman, Joe Hamman, Lydia Kapsenberg, and Antonius Gagern.
        </Box>
      </Group>

      <Row
        columns={[2, 3, 2, 2]}
        sx={{
          mt: 3,
        }}
      >
        <Column sx={logo} width={1}>
          <UCI sx={{ width: '100%', maxWidth: '200px' }} />
        </Column>
        <Column sx={logo} width={1}>
          <S3 sx={{ width: '50%', maxWidth: '200px' }} />
        </Column>
        <Column sx={logo} width={1}>
          <ClimateWorks sx={{ width: '100%', maxWidth: '200px', ml: -1 }} />
        </Column>
        <Column sx={logo} width={1}>
          <NCAR sx={{ width: '70%', maxWidth: '150px' }} />
        </Column>
        <Column sx={logo} width={1}>
          <Logo sx={{ width: '100%', maxWidth: '200px', ml: '-2px' }} />
        </Column>
      </Row>
    </>
  )
}

export default About

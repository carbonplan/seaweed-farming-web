import { Box, Text, Grid, Container } from 'theme-ui'
import {
  Layout,
  Row,
  Column,
  Guide,
  Buttons,
  Links,
} from '@carbonplan/components'
import QuickLook from './quick-look'
import Closing from './closing'
import SectionBreak from './section-break'
import { utils } from '@carbonplan/components'

const { formatDate } = utils
const { BackButton } = Buttons
const { InternalLink } = Links

const prefix = 'https://images.carbonplan.org'

const Article = ({ children, meta }) => {
  return (
    <Layout
      card={`${prefix}/social/${meta.card}.png`}
      description={meta.summary + '.'}
      title={meta.title.toLowerCase() + ' / research / carbonplan'}
      links={'local'}
      metadata={'scroll'}
      nav={'research'}
    >
      <Box
        sx={{
          backgroundColor: meta.color,
          height: [
            meta.background ? '150px' : 'auto',
            meta.background ? '200px' : 'auto',
            meta.background ? '275px' : 'auto',
          ],
          position: ['relative', 'relative', 'absolute'],
          backgroundImage: [
            meta.background ? `url(${prefix}/${meta.background}.png)` : 'none',
          ],
          width: ['calc(100vw)'],
          maxWidth: ['calc(100% + 32px)', 'calc(100% + 48px)', '100%', '100%'],
          left: [0],
          ml: [-3, -4, 0],
          backgroundSize: 'cover',
          backgroundPosition: '50% 70%',
          py: [3],
        }}
      >
        <Box
          sx={{
            position: [meta.background ? 'absolute' : 'relative'],
            display: ['none', 'initial', 'initial'],
            bottom: 0,
            pb: [meta.background ? 3 : 0],
            width: '100%',
            color: [meta.invert ? '#1b1e23' : '#ebebec'],
          }}
        >
          <Container>
            <Row>
              <Column start={[1]} width={[6, 1, 1, 1]}>
                <Box
                  sx={{
                    fontFamily: 'mono',
                    letterSpacing: 'mono',
                    textTransform: 'uppercase',
                    fontSize: [1, 1, 2, 3],
                    mt: ['3px'],
                    display: ['none', 'initial', 'none', 'none'],
                  }}
                >
                  ({meta.number})
                </Box>
                <Box
                  sx={{
                    fontFamily: 'mono',
                    letterSpacing: 'mono',
                    textTransform: 'uppercase',
                    fontSize: [1, 1, 2, 3],
                    mt: ['3px'],
                    display: ['none', 'none', 'initial', 'initial'],
                  }}
                >
                  ARTICLE({meta.number})
                </Box>
              </Column>
              <Column start={[1, 2, 3, 3]} width={[6, 5, 6, 6]}>
                <Box sx={{ lineHeight: [1.15, 1.15, 1.35, 1.35] }}>
                  <Text
                    sx={{
                      fontFamily: 'mono',
                      letterSpacing: 'mono',
                      textTransform: 'uppercase',
                      fontSize: [1, 1, 2, 3],
                    }}
                  >
                    by{' '}
                    {meta.authors.map((author, ix) => (
                      <Text
                        key={author}
                        sx={{
                          display: 'inline-block',
                          mr: [2],
                          fontFamily: 'mono',
                          letterSpacing: 'mono',
                          fontSize: [1, 1, 2, 3],
                        }}
                      >
                        {author.replace(/ /g, '\u00a0')}{' '}
                        {ix < meta.authors.length - 1 ? '+' : ''}
                      </Text>
                    ))}
                  </Text>
                </Box>
              </Column>
              <Column start={[1, 7, 10, 10]} width={[6, 2, 2, 2]}>
                <Text
                  sx={{
                    fontFamily: 'mono',
                    letterSpacing: 'mono',
                    textTransform: 'uppercase',
                    fontSize: [1, 1, 2, 3],
                  }}
                >
                  {formatDate(meta.date)}
                </Text>
              </Column>
            </Row>
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          px: [0, 0, 0],
          pt: [0, 0, meta.background ? '275px' : '100px'],
          mb: [8, 8, 9, 10],
        }}
      >
        <Row>
          <Column
            start={[1, 1]}
            width={[2]}
            dr={1}
            sx={{ mb: [-3, '-120px', 0, 0], mt: [3, '91px', '106px', '119px'] }}
          >
            <InternalLink href={'/research'}>
              <BackButton sx={{ ml: ['-2px', '-2px', '-2px', '-2px'] }} />
            </InternalLink>
          </Column>
          <Column
            start={[3, 4, 3, 3]}
            width={[2]}
            sx={{
              display: ['initial', 'none', 'none', 'none'],
            }}
          >
            <Box
              sx={{
                fontFamily: 'mono',
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                fontSize: [1, 1, 1, 2],
                mt: ['21px'],
              }}
            >
              ARTICLE({meta.number})
            </Box>
          </Column>
          <Column
            start={[5, 7, 5, 5]}
            width={[2]}
            sx={{
              display: ['initial', 'none', 'none', 'none'],
            }}
          >
            <Box
              sx={{
                fontFamily: 'mono',
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                fontSize: [1, 1, 1, 2],
                mt: ['21px'],
              }}
            >
              {formatDate(meta.date)}
            </Box>
          </Column>
          <Column start={[1, 2, 3, 3]} width={[6, 6, 6, 6]}>
            <Row
              columns={[6, 6, 6, 6]}
              sx={{ display: ['grid', 'none', 'none', 'none'] }}
            >
              <Column start={[3, 3, 6, 6]} width={[4, 4, 3, 3]}>
                <Box sx={{ lineHeight: [1.4, 1.4, 1.35, 1.35] }}>
                  <Box
                    sx={{
                      fontFamily: 'mono',
                      letterSpacing: 'mono',
                      textTransform: 'uppercase',
                      fontSize: [1, 1, 1, 2],
                      mt: [3, 4, 4, 4],
                      mb: [5, 5, 5, 5],
                    }}
                  >
                    by{' '}
                    {meta.authors.map((author, ix) => (
                      <Text
                        key={author}
                        sx={{
                          display: 'inline-block',
                          mr: [2],
                          fontFamily: 'mono',
                          letterSpacing: 'mono',
                          fontSize: [1, 1, 1, 2],
                        }}
                      >
                        {author.replace(/ /g, '\u00a0')}{' '}
                        {ix < meta.authors.length - 1 ? '+' : ''}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Column>
            </Row>
            <Box as='article'>{children}</Box>
            <SectionBreak />
            <Closing />
          </Column>
          <QuickLook color={meta.color} start={9}>
            {meta.summary}
          </QuickLook>
        </Row>
      </Box>
    </Layout>
  )
}

export default Article

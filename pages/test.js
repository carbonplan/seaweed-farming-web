import { Box, Paragraph } from 'theme-ui'
import { Column, Row, Layout } from '@carbonplan/components'

const Test = () => {
  return (
    <Layout links={'local'} metadata={'scroll'} container={true}>
      <Row>
        <Column start={[1, 2, 4, 4]} width={[6, 6, 6, 6]}>
          <Box as='h1' variant='styles.h1' sx={{ mb: [5, 5, 5, 5] }}>
            Testing
          </Box>
        </Column>
      </Row>
      <Row>
        <Column
          start={[1, 2, 4, 4]}
          width={[6, 6, 6, 6]}
          sx={{ mb: [8, 8, 9, 10] }}
        >
          <Box as='article'>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              morbi tincidunt augue interdum velit euismod in pellentesque
              massa. Volutpat ac tincidunt vitae semper quis lectus nulla.
              Pellentesque diam volutpat commodo sed egestas egestas fringilla.
              Et pharetra pharetra massa massa ultricies mi quis hendrerit
              dolor. Eu feugiat pretium nibh ipsum consequat nisl. Et malesuada
              fames ac turpis egestas integer eget aliquet. Pretium vulputate
              sapien nec sagittis aliquam. Accumsan sit amet nulla facilisi
              morbi tempus iaculis. Posuere urna nec tincidunt praesent semper
              feugiat nibh. Nulla malesuada pellentesque elit eget. Gravida
              neque convallis a cras semper auctor neque vitae tempus. Facilisis
              sed odio morbi quis commodo odio aenean sed adipiscing. Urna et
              pharetra pharetra massa massa ultricies mi. Erat pellentesque
              adipiscing commodo elit at imperdiet dui accumsan. Ac turpis
              egestas sed tempus. Turpis egestas maecenas pharetra convallis
              posuere morbi.
            </Paragraph>

            <Paragraph>
              Bibendum at varius vel pharetra vel turpis nunc eget lorem. Semper
              viverra nam libero justo laoreet sit amet cursus sit. Tellus cras
              adipiscing enim eu. Dignissim convallis aenean et tortor at risus
              viverra adipiscing. Velit egestas dui id ornare arcu odio ut sem.
              Hendrerit gravida rutrum quisque non tellus orci ac auctor. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Diam quam nulla
              porttitor massa id neque aliquam vestibulum. Ultrices eros in
              cursus turpis. Tortor pretium viverra suspendisse potenti nullam
              ac. Accumsan tortor posuere ac ut consequat semper viverra nam
              libero. Integer enim neque volutpat ac tincidunt. Elit ut aliquam
              purus sit amet.
            </Paragraph>

            <Paragraph>
              Auctor urna nunc id cursus metus aliquam. Risus viverra adipiscing
              at in tellus. Purus sit amet volutpat consequat mauris. Quam
              elementum pulvinar etiam non quam lacus. Dui id ornare arcu odio.
              Diam vulputate ut pharetra sit amet aliquam id. Nec ullamcorper
              sit amet risus nullam eget. Aliquam eleifend mi in nulla.
              Consectetur purus ut faucibus pulvinar. Pretium quam vulputate
              dignissim suspendisse in est ante in nibh. Nec nam aliquam sem et
              tortor consequat id porta. Ornare arcu dui vivamus arcu felis.
              Vitae semper quis lectus nulla at volutpat diam ut venenatis.
              Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque
              purus semper. Commodo nulla facilisi nullam vehicula ipsum a arcu
              cursus. Lorem mollis aliquam ut porttitor.
            </Paragraph>

            <Paragraph>
              Accumsan sit amet nulla facilisi morbi tempus iaculis. Volutpat
              blandit aliquam etiam erat velit. Et pharetra pharetra massa massa
              ultricies mi quis. Odio ut enim blandit volutpat maecenas volutpat
              blandit aliquam etiam. Lorem dolor sed viverra ipsum nunc aliquet.
              Integer feugiat scelerisque varius morbi enim nunc. Mattis aliquam
              faucibus purus in massa. Suspendisse ultrices gravida dictum fusce
              ut placerat orci nulla. Morbi tristique senectus et netus et
              malesuada fames ac turpis. Blandit aliquam etiam erat velit
              scelerisque. Sed sed risus pretium quam vulputate. Nulla porttitor
              massa id neque aliquam vestibulum. Justo eget magna fermentum
              iaculis eu non. Purus in massa tempor nec.
            </Paragraph>

            <Paragraph>
              Leo a diam sollicitudin tempor id eu nisl nunc mi. At volutpat
              diam ut venenatis tellus in metus vulputate. Donec enim diam
              vulputate ut pharetra sit amet aliquam. Proin fermentum leo vel
              orci porta non pulvinar. Eget arcu dictum varius duis. Risus
              pretium quam vulputate dignissim suspendisse. Vitae proin sagittis
              nisl rhoncus mattis. At tempor commodo ullamcorper a lacus
              vestibulum sed. Mattis enim ut tellus elementum sagittis vitae et
              leo duis. Suspendisse ultrices gravida dictum fusce ut placerat.
              Tempus urna et pharetra pharetra massa massa ultricies. Nunc
              pulvinar sapien et ligula ullamcorper malesuada proin. Luctus
              venenatis lectus magna fringilla urna porttitor rhoncus dolor. A
              pellentesque sit amet porttitor eget. Lacus vestibulum sed arcu
              non odio euismod lacinia at. Elit pellentesque habitant morbi
              tristique senectus et. Placerat duis ultricies lacus sed turpis
              tincidunt id aliquet risus. Massa eget egestas purus viverra
              accumsan. Sed odio morbi quis commodo odio aenean.
            </Paragraph>
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Test

import Article from '../components/article'
import SectionBreak from '../components/section-break'
import Endnote from '../components/endnote'
import Component from './components/component'

export const meta = {
  id: 'article-title',
  date: '05-16-2021',
  title: 'Article title',
  authors: ['Author 1', 'Author 2'],
  color: 'blue',
  summary: 'Summary of article.',
  quotes: [],
}

# Article title

This is markdown

<Component></Component>

<SectionBreak />

<Endnote label='Credits'>

[Who did what]

Please cite as:

[How to cite]

</Endnote>

<Endnote label='Terms'>

[Funding, involvement, etc.]

</Endnote>

export default ({ children }) => <Article meta={meta}>{children}</Article>

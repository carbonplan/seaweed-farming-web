import { withAuth } from '../lib/auth'
import Index from '../article/index.md'

export default withAuth(Index, ['admin'])

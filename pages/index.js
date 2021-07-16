import { withAuth } from '../lib/auth'
import Index from '../tool'

export default withAuth(Index, ['admin'])

const path = require('path')

const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

module.exports = {
  assetPrefix: isDev ? '' : 'https://seaweed-farming.carbonplan.org',
}

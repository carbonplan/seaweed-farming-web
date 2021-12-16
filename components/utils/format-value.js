import { format } from 'd3-format'

export const formatValue = (value) => {
  if (value === 0) {
    return 0
  } else if (value < 0.0001) {
    return format('.1e')(value)
  } else if (value < 0.01) {
    return format('.2')(value)
  } else if (value < 1) {
    return format('.2f')(value)
  } else if (value < 10) {
    return format('.1f')(value)
  } else if (value < 10000) {
    return format('.0f')(value)
  } else {
    return format('0.2s')(value)
  }
}

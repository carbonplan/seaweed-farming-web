const ParameterWrapper = ({ id, ids, applicableParameters, children }) => {
  const containsId = id && applicableParameters.includes(id)
  const containsIds = ids && applicableParameters.find((el) => ids.includes(el))
  if (containsId || containsIds) {
    return children
  } else {
    return null
  }
}

export default ParameterWrapper

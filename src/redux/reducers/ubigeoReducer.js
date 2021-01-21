const defaultState = {
  ubigeo: [],
  loaded: false
}

const ubigeoReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'UBIGEO_FIND_ALL':
    case 'UBIGEO_FIND_BY':
      return {
        ...state,
        ubigeo: payload,
        loaded: true
      }
    case 'UBIGEO_FIND_BY_SEGMENT':
      return {
        ...state,
        ubigeoSegment: payload
      }
    default:
      return state
  }
}

export default ubigeoReducer

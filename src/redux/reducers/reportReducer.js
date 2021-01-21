const defaultState = {
  report: []
}

const reportReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'MAKE_REPORT':
      return {
        ...state,
        report: payload
      }
    default:
      return state
  }
}

export default reportReducer

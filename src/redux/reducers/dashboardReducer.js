const defaultState = {
  data: undefined
}

const dashboardReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'DASHBOARD_FIND_ALL':
      return {
        ...state,
        data: payload
      }
    default:
      return state
  }
}

export default dashboardReducer

const defaultState = {
  permissions: [],
  loaded: false
}

const permissionReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'PERMISSION_FIND_ALL':
      return {
        ...state,
        permissions: payload,
        loaded: true
      }
    case 'PERMISSION_FIND':
      return {
        ...state,
        profile: payload !== undefined ? state.permissions.find((item) => item.id === payload) : payload
      }
    default:
      return state
  }
}

export default permissionReducer

const defaultState = {
  users: [],
  loaded: false
}

const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'USER_FIND_ALL':
      return {
        ...state,
        users: payload,
        loaded: true
      }
    case 'USER_FIND':
      return {
        ...state,
        user: state.users.find((item) => item.id === payload)
      }
    case 'USER_CREATE':
      return {
        ...state,
        users: [...state.users, payload]
      }
    case 'USER_UPDATE':
      return {
        ...state,
        users: state.users.map((item) => (item.id === payload.id ? (item = payload) : item)),
        user: payload
      }
    case 'USER_UPDATE_PASSWORD':
      return {
        ...state,
        users: state.users.map((item) => (item.id === payload.id ? (item = payload) : item)),
        user: payload
      }
    case 'USER_EDIT_REGIONS':
      return {
        ...state,
        users: state.users.map((item) => (item.id === payload.id ? (item = payload) : item)),
        user: payload
      }
    case 'USER_REMOVE':
      console.log("remove ", state);
      return {
        ...state,
        users: state.users.filter((item) => item.id !== payload.id)
      }
    case 'USER_ACTIVE':
      console.log("active ", state);
      return {
        ...state,
        users: state.users.filter((item) => item.id !== payload.id)
      }
    default:
      return state
  }
}

export default userReducer

const defaultState = {
  profiles: [],
  loaded: false
}

const profileReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'PROFILE_FIND_ALL':
      return {
        ...state,
        profiles: payload,
        loaded: true
      }
    case 'PROFILE_FIND':
      return {
        ...state,
        profile: payload !== undefined ? state.profiles.find((item) => item.id === payload) : payload
      }
    case 'PROFILE_CREATE':
      return {
        ...state,
        profiles: [...state.profiles, payload]
      }
    case 'PROFILE_UPDATE':
      return {
        ...state,
        profiles: state.profiles.map((item) => (item.id === payload.id ? (item = payload) : item)),
        profile: payload
      }
    case 'PROFILE_REMOVE':
      return {
        ...state,
        profiles: state.profiles.filter((item) => item.id !== payload.id)
      }
    default:
      return state
  }
}

export default profileReducer

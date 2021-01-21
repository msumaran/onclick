const defaultState = {
  isLogged: false,
  token: undefined
}

const accountReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'ACCOUNT_LOGIN':
      return {
        ...state,
        isLogged: true,
        token: payload.token
      }
    case 'ACCOUNT_LOGOUT':
      return {
        ...state,
        isLogged: false,
        token: undefined
      }
    case 'ACCOUNT_CHANGE_PASSWORD':
      return {
        ...state,
        isLogged: false,
        token: undefined
      }
    default:
      return state
  }
}

export default accountReducer

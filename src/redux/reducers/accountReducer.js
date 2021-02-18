const defaultState = {
  isLogged: false,
  token: undefined
}

const accountReducer = (state = defaultState, { type, payload }) => {

  const st = Object.assign({}, state)

  switch (type) {
    case 'ACCOUNT_LOGIN':

      st.isLogged =  true
      st.token =  payload.token
      break
    case 'ACCOUNT_LOGOUT':
    case 'ACCOUNT_CHANGE_PASSWORD':

      st.isLogged = false
      st.token = undefined
      break
    default:
      // none
  }

  return st
}

export default accountReducer

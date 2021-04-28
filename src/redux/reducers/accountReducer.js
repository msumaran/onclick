const defaultState = {
  isLogged: false,
  token: undefined,
  permissions: [],
  loaded: false,
}

const accountReducer = (state = defaultState, { type, payload }) => {

  const st = Object.assign({}, state)

  switch (type) {
    case 'ACCOUNT_LOGIN':

      st.isLogged =  true
      st.token =  payload.token
      break
    case 'SET_MY_PERMISSIONS':
      st.permissions = payload
      st.loaded = true
      break
    case 'ACCOUNT_LOGOUT':
    case 'ACCOUNT_CHANGE_PASSWORD':

      st.isLogged = false
      st.token = undefined
      break
    case 'ACCOUNT_RECOVERY':
        st.isLogged = false
        st.token = undefined
        break
    default:
      st.isLogged = false
      st.token = undefined
      // none
  }

  return st
}

export default accountReducer

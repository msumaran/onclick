const defaultState = {
    clients: [],
    loaded: false
  }
  
  const clientReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'CLIENT_FIND_ALL':
        return {
          ...state,
          clients: payload,
          loaded: true
        }
      case 'CLIENT_FIND':
        return {
          ...state,
          client: state.clients.find((item) => item.id === payload)
        }
      case 'CLIENT_CREATE':
        return {
          ...state,
          clients: [...state.clients, payload]
        }
      case 'CLIENT_UPDATE':
        return {
          ...state,
          clients: state.clients.map((item) => (item.id === payload.id ? (item = payload) : item)),
          client: payload
        }
      case 'CLIENT_UPDATE_PASSWORD':
        return {
          ...state,
          clients: state.clients.map((item) => (item.id === payload.id ? (item = payload) : item)),
          client: payload
        }
      case 'CLIENT_EDIT_REGIONS':
        return {
          ...state,
          clients: state.clients.map((item) => (item.id === payload.id ? (item = payload) : item)),
          client: payload
        }
      case 'CLIENT_REMOVE':
        return {
          ...state,
          clients: state.clients.map((item) => {
            if( item.id === payload.id){
              item.isActive = false;
            }
            return item;
          })
        }
      case 'CLIENT_ACTIVE': 

        return {
          ...state,
          clients: state.clients.map((item) => {
            if( item.id === payload.id){
              item.isActive = true;
            }
            return item;
          })
        }
      default:
        return state
    }
  }
  
  export default clientReducer
  
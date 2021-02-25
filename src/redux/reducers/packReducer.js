const defaultState = {
    packs: [],
    loaded: false
  }
  
  const packReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'PACK_FIND_ALL':
        return {
          ...state,
          packs: payload,
          loaded: true
        }
      case 'PACK_FIND':
        return {
          ...state,
          pack: state.packs.find((item) => item.id === payload)
        }
      case 'PACK_CREATE':
        return {
          ...state,
          packs: [...state.packs, payload]
        }
      case 'PACK_UPDATE':
        return {
          ...state,
          packs: state.packs.map((item) => (item.id === payload.id ? (item = payload) : item)),
          pack: payload
        }
      case 'PACK_UPDATE_PASSWORD':
        return {
          ...state,
          packs: state.packs.map((item) => (item.id === payload.id ? (item = payload) : item)),
          pack: payload
        }
      case 'PACK_EDIT_REGIONS':
        return {
          ...state,
          packs: state.packs.map((item) => (item.id === payload.id ? (item = payload) : item)),
          pack: payload
        }
      case 'PACK_REMOVE':
        return {
          ...state,
          packs: state.packs.filter((item) => item.id !== payload.id)
        }
      default:
        return state
    }
  }
  
  export default packReducer
  
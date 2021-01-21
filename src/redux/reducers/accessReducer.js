const defaultState = {
    access: [],
    loaded: false
  }
  
  const accessReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'ACCESS_FIND_ALL':
        return {
          ...state,
          access: payload,
          loaded: true
        }
      default:
        return state
    }
  }
  
  export default accessReducer
  
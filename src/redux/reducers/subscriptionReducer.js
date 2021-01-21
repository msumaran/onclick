const defaultState = {
    subscriptions: [],
    loaded: false
  }
  
  const subscriptionReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'SUBSCRIPTION_FIND_ALL':
        return {
          ...state,
          subscriptions: payload,
          loaded: true
        }
      default:
        return state
    }
  }
  
  export default subscriptionReducer
  
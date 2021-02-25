const defaultState = {
    payments: [],
    loaded: false
  }
  
  const paymentReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'PAYMENT_FIND_ALL':
        return {
          ...state,
          payments: payload,
          loaded: true
        }
      case 'PAYMENT_FIND':
        return {
          ...state,
          payment: state.payments.find((item) => item.id === payload)
        }
      case 'PAYMENT_CREATE':
        return {
          ...state,
          payments: [...state.payments, payload]
        }
      case 'PAYMENT_UPDATE':
        return {
          ...state,
          payments: state.payments.map((item) => (item.id === payload.id ? (item = payload) : item)),
          payment: payload
        }
      case 'PAYMENT_UPDATE_PASSWORD':
        return {
          ...state,
          payments: state.payments.map((item) => (item.id === payload.id ? (item = payload) : item)),
          payment: payload
        }
      case 'PAYMENT_EDIT_REGIONS':
        return {
          ...state,
          payments: state.payments.map((item) => (item.id === payload.id ? (item = payload) : item)),
          payment: payload
        }
      case 'PAYMENT_REMOVE':
        return {
          ...state,
          payments: state.payments.filter((item) => item.id !== payload.id)
        }
      default:
        return state
    }
  }
  
  export default paymentReducer
  
const defaultState = {
  evaluations: [],
  loaded: false
}

const evaluationReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'EVALUATION_FIND_ALL':
      return {
        ...state,
        evaluations: payload,
        loaded: true
      }
    case 'EVALUATION_FIND_BY':
      return {
        ...state,
        evaluations: payload,
        loaded: true
      }
    case 'EVALUATION_FIND':
      return {
        ...state,
        evaluation: payload !== undefined ? state.evaluations.find((item) => item.id === payload) : payload
      }
    case 'EVALUATION_CREATE':
      return {
        ...state,
        evaluations: [...state.evaluations, payload]
      }
    case 'EVALUATION_UPDATE':
      return {
        ...state,
        evaluations: state.evaluations.map((item) =>
          item.id === payload.id ? { ...item, inscription: payload } : item
        ),
        evaluation: payload !== undefined ? state.evaluations.find((item) => item.id === payload.id) : payload
      }
    case 'EVALUATION_CALIFICATION_UPDATE':
      return {
        ...state,
        evaluations: state.evaluations.map((item) => (item.id === payload.id ? payload : item)),
        evaluation: payload !== undefined ? state.evaluations.find((item) => item.id === payload.id) : payload
      }
    case 'EVALUATION_REMOVE':
      return {
        ...state,
        evaluations: state.evaluations.filter((item) => item.id !== payload.id)
      }
    case 'INSCRIPTION_FIND_BY':
      return {
        ...state,
        inscriptions: payload
      }
    case 'INSCRIPTION_FIND_BY_REGIONAL_WINNERS':
      return {
        ...state,
        regionalwinners: payload
      }
    default:
      return state
  }
}

export default evaluationReducer

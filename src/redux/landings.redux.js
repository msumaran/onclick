
export const LANDINGS_SET_RESULT = 'LANDINGS_SET_RESULT'

const initialState = {
    result: [],
}

export const LandingsReducer = (state = initialState, { type, payload }) => {

    const st = Object.assign({}, state)

    if (type === LANDINGS_SET_RESULT) {

        st.result = payload
    }

    return st
}


const initialState = {
    code: {},
    html: '',
    loaded: false,
    saveStatus: ''
}

const landingReducer = (state = initialState, { type, payload }) => {

    const st = Object.assign({}, state)

    switch(type) {
        case 'LANDING_LOAD_FROM_DB':
            st.code = payload.code
            st.html = payload.html
            st.loaded = true
            break
        case 'LANDING_SAVE_TO_DB_START':
            st.saveStatus = 'saving'
            break
        case 'LANDING_SAVE_TO_DB_END':
            st.saveStatus = 'saved'
            break
        case 'LANDING_SAVE_TO_DB_ERROR':
            st.saveStatus = 'error'
            break
    }

    return st
}

export default landingReducer